import { Observable, Subscriber } from "rxjs";
import { AUTH_DATA_JWT, LOCAL_STORAGE_ITEM_USER } from "../Config/service-config";
import { UserData } from "../Model/Auth/UserData";
import { MessageType } from "../Model/ChatsTypes/MessageType";
import { ChatType } from "../Model/ChatsTypes/ChatType";
import { ClientType } from "../Model/Accounts/ClientType";
import { NotificationType } from "../Model/Notification/NotificationType";
import { error } from "console";
import { NewChat } from "../Model/ChatsTypes/NewChat";
import { RemoveChatType } from "../Model/ChatsTypes/RemoveChatType";

class Cach {

    casheChat:ChatType|undefined;

    addToCache(message:MessageType){
    
        this.casheChat?.messages.push(message)
    }

    addAllToCache(messages:MessageType[]){
        messages.forEach(message => this.addToCache(message))
    }

    addChat(chat:ChatType){
      
        this.casheChat = JSON.parse(JSON.stringify(chat));
    }

    getCache():ChatType{
        
        return JSON.parse(JSON.stringify(this.casheChat));
    }

    clearCache(){
        this.casheChat = undefined;
    }

}


export class ChatRoomService {

    private cashMessage = new Cach()

    private observableChat:Observable<ChatType|string> | null = null;
    private chatSubscriber: Subscriber<ChatType|string> | undefined = undefined;
    private clientsObservable:Observable<ClientType[]|string> | null = null;
    private clientsSubscriber: Subscriber<ClientType[]|string> | undefined = undefined;
    private chatsObservable:Observable<ChatType[]|string> | null = null;
    private chatsSubscriber: Subscriber<ChatType[]|string> | undefined = undefined;
    
    private urlService:string;
    private urlWebSocket:string;
    private webSocket: WebSocket | undefined;

    constructor(baseUrl:string) {
        this.urlService = `http://${baseUrl}`;
        this.urlWebSocket = `ws://${baseUrl}/chatroom/websocket`;
    }


    async getActiveContacts():Promise<string[]>{
       
        const contacts:string[] = await fetch(this.urlService + '/contacts',{
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`}
        }).then(data => data.json());
        return contacts;
    }



    async getAllClients():Promise<ClientType[]|string>{
        let clients:ClientType[]|string = []
        try {
            clients = await fetch(this.urlService + '/allusers',{
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`}
            }).then(data => data.json());
        } catch (error: any) {
              clients = error.message
        }
        return clients;
    }

    async createChat(newChat:NewChat):Promise<string|null>{
        
        const response = await fetch(this.urlService + '/chats/create-chat',{
            method:'POST',
            headers: {
                'Content-type':"application/json",
                Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`},
            body:JSON.stringify(newChat)
        })
        const chatId = await response.json();

        return response.ok ? chatId : null
    }

    async removeChat(chat:RemoveChatType){
        const response = await fetch(this.urlService + '/chats/remove-chat',{
            method:'POST',
            headers: {
                'Content-type':"application/json",
                Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`},
            body:JSON.stringify(chat)
        })
        const chatId = await response.json();
        this.cashMessage.clearCache();
        return response.ok ? chatId : null
    }

    async getMyChats():Promise<ChatType[]|string>{
        let chats:ChatType[]|string

        try {
            chats = await fetch(this.urlService + '/chats/mychats',{
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`}
            }).then(data => data.json());
        } catch (error : any) {
            chats = error.message
        }
        return chats;
    }


    getChatById(chatId:string):Observable<ChatType|string> { 

        if (!this.observableChat) {
            this.observableChat = new Observable<ChatType | string>(subscriber => {
                this.chatSubscriber = subscriber;
                this.connectWebSocket();
                this.sibscriberChatByIdNext(chatId);
        
                return () => this.disconectWebSocket();
            })
        } else {
            this.sibscriberChatByIdNext(chatId);
        }
        return this.observableChat;
    }

    private sibscriberChatByIdNext(chatId:string): void {
        
        this.fetchChatById(chatId).then(chat => {               
                this.cashMessage.clearCache();
                chat && this.cashMessage.addChat(chat)
            
             
            return this.chatSubscriber?.next(chat);     
        })
        .catch(error => this.chatSubscriber?.next(error));
    }

    sendMessage(message:MessageType){
        this.webSocket?.send(JSON.stringify(message))
    }

    getClients():Observable<ClientType[]|string> { 

        if (!this.clientsObservable) {
            this.clientsObservable = new Observable<ClientType[] | string>(clientsSubscriber => {   
                this.clientsSubscriber = clientsSubscriber;
                this.connectWebSocket();
                this.sibscriberAllClientsNext();

                return () => this.disconectWebSocket();
            })
        }
        return this.clientsObservable;
    }

    getAllMyChats():Observable<ChatType[]|string> { 

        if (!this.chatsObservable) {
            this.chatsObservable = new Observable<ChatType[] | string>(chatsSubscriber => {
                this.chatsSubscriber = chatsSubscriber;
                this.connectWebSocket();
                this.sibscriberAllChatsNext();
                
                return () => this.disconectWebSocket();
            })
        }
        return this.chatsObservable;
    }

    private sibscriberAllChatsNext() {
        this.getMyChats().then(chats =>{
            return this.chatsSubscriber?.next(chats);
        }).catch(error => this.chatsSubscriber?.next(error))
    }



    async fetchChatById(chatId:string|undefined){
        let chat;
        try {
            if(chatId){
                chat = await fetch(`${this.urlService}/chats/chat/${chatId}`,{
                    method:"GET",
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`}
                }).then(data => data.json());
            }
            
        } catch (error:any) {
            chat = error.message
        } finally {
            return chat
        }
        
    }

    private sibscriberAllClientsNext(): void {
        
        this.getAllClients().then(clients => {
            return this.clientsSubscriber?.next(clients!);     
        })
        .catch(error => this.clientsSubscriber?.next(error));
    }

    connectWebSocket() {
        if (!this.webSocket) {
            this.webSocket = new WebSocket(this.urlWebSocket, localStorage.getItem(AUTH_DATA_JWT) || '');
                console.log(`connect socket ${this.urlWebSocket}`);      
        } 

        this.webSocket.onmessage = message => {
            console.log(message.data);
            const notification:MessageType = JSON.parse(message.data);
            this.getAction(notification)
    } 
      return this.webSocket;
    }

    disconectWebSocket(): void {
        this.shutDownService();
    }

    shutDownService(){
        this.chatsObservable = null;
        this.clientsObservable = null;
        this.observableChat = null;
        this.webSocket?.close();
        this.webSocket = undefined;

    }

    private getAction(message:MessageType){

        switch (message.type) {
            case 'SERVER_CLIENT': {
                this.sibscriberAllClientsNext(); 
            }; break;
            case 'SERVER_CHATS': {
                    this.sibscriberAllChatsNext()
                }; break;
            case 'AUTHENTIFICATION ERROR' : {
                this.clientsSubscriber?.next(message.type)
                this.chatsSubscriber?.next(message.type)
                this.chatSubscriber?.next(message.type)
            };break;
            case "MESSAGES" : {
                if(this.cashMessage.casheChat && this.cashMessage.getCache().idChat == message.chatId){
                    this.cashMessage.addToCache(message);
                    this.chatSubscriber?.next(this.cashMessage.getCache())
                }
            };break;
            
            default:
                break;
        }

    }

}