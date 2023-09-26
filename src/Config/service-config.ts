import AuthService from "../Sevice/AuthService"
import { ChatRoomService } from "../Sevice/ChatRoomService";

export const LOCAL_STORAGE_ITEM_USER = 'localUser'
export const AUTH_DATA_JWT = 'auth-data-jwt'

export const authService = new AuthService('http://localhost:3500/chatroom/accounts');
export const chatRoomService = new ChatRoomService('localhost:3500');