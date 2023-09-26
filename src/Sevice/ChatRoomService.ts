import { Observable, Subscriber } from "rxjs";
import { AUTH_DATA_JWT, LOCAL_STORAGE_ITEM_USER } from "../Config/service-config";
import { UserData } from "../Model/Auth/UserData";
import { MessageType } from "../Model/ChatsTypes/MessageType";
import { ChatType } from "../Model/ChatsTypes/ChatType";
import { ClientType } from "../Model/Accounts/ClientType";

export class ChatRoomService {

    private observable:Observable<MessageType[]|string> | null = null;
    private subscriber: Subscriber<MessageType[]|string> | undefined = undefined;
    private clientsObservable:Observable<ClientType[]|string> | null = null;
    private clientsSubscriber: Subscriber<ClientType[]|string> | undefined = undefined;
    
    private urlService:string;
    private urlWebSocket:string;
    private webSocket: WebSocket | undefined;

    constructor(baseUrl:string) {
        this.urlService = `http://${baseUrl}`;
        this.urlWebSocket = `ws://${baseUrl}/contacts/websocket`;
    }


    async getActiveContacts():Promise<string[]>{
       
        const contacts:string[] = await fetch(this.urlService + '/contacts',{
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`}
        }).then(data => data.json());
        return contacts;
    }

    async getAllClients():Promise<ClientType[]>{
       
        const clients:ClientType[] = await fetch(this.urlService + '/allusers',{
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`}
        }).then(data => data.json());
        return clients;
    }


    getMessages(chat:ChatType):Observable<MessageType[]|string> { 

        if (!this.observable) {
            this.observable = new Observable<MessageType[] | string>(subscriber => {
                this.subscriber = subscriber;
                this.sibscriberAllNext(chat);
                this.connectWebSocket();
                
                return () => this.disconectWebSocket();
            })
        }
        return this.observable;
    }

    getClients():Observable<ClientType[]|string> { 

        if (!this.clientsObservable) {
            this.clientsObservable = new Observable<ClientType[] | string>(clientsSubscriber => {
                this.clientsSubscriber = clientsSubscriber;
                this.sibscriberAllClientsNext();
                this.connectWebSocket();
                
                return () => this.disconectWebSocket();
            })
        }
        return this.clientsObservable;
    }

    private sibscriberAllNext(chat:ChatType): void {
        
        this.fetchAllmesseges(chat).then(messages => {
            return this.subscriber?.next(messages!);     
        })
        .catch(error => this.subscriber?.next(error));
    }

    async fetchAllmesseges(chat:ChatType){
        //TODO
        //const messages:MessageType[] = fetch()
    }

    async fetchAllClient(){
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
        
            this.webSocket.onmessage = message => {
                console.log(message.data);
        }
        }  
      return this.webSocket;
    }

    disconectWebSocket(): void {
        this.webSocket?.close();
    }

}