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

export class ChatRoomService {

    private observable:Observable<MessageType[]|string> | null = null;
    private subscriber: Subscriber<MessageType[]|string> | undefined = undefined;
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


    getMessages(chat:ChatType):Observable<MessageType[]|string> { 

        if (!this.observable) {
            this.observable = new Observable<MessageType[] | string>(subscriber => {
                this.subscriber = subscriber;
                this.connectWebSocket();
                this.sibscriberAllMessageNext(chat);
        
                return () => this.disconectWebSocket();
            })
        }
        return this.observable;
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
               this.webSocket && this.sibscriberAllChatsNext();
                
                
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

    private sibscriberAllMessageNext(chat:ChatType): void {
        
        this.fetchAllmesseges(chat).then(messages => {
            return this.subscriber?.next(messages!);     
        })
        .catch(error => this.subscriber?.next(error));
    }

    async fetchAllmesseges(chat:ChatType){
        //TODO
        //const messages:MessageType[] = fetch()
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
            const notification:NotificationType = JSON.parse(message.data);
            this.getAction(notification)
    } 
      return this.webSocket;
    }

    disconectWebSocket(): void {
        this.webSocket?.close();
        this.webSocket = undefined;
    }

    private getAction(message:NotificationType){

        switch (message.textMessage) {
            case 'client': this.sibscriberAllClientsNext(); break;
            case 'chats': this.sibscriberAllChatsNext(); break;
            case 'Authentification error' : {
                this.clientsSubscriber?.next(message.textMessage)
                this.chatsSubscriber?.next(message.textMessage)
            };break;
            case `Accsess dinied` : {
                this.clientsSubscriber?.next(message.textMessage)
                this.chatsSubscriber?.next(message.textMessage)
            };break;
            
            default:
                break;
        }

    }

}