import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'socket.io';
import { RESPONSE_MESSAGE } from 'src/constants/app.constant';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join-chatroom')
  async handleJoinChatRoom(@MessageBody() data: any) {
    try {
      const { room, isNewMember } = await this.chatService.checkChatRoom(data.chatRoom, data.user);

      if (isNewMember) this.server.emit(`${data.chatRoom._id}-newMember`, data.user);

      return {
        message: RESPONSE_MESSAGE.SUCCESS,
        data: room,
      };
    } catch (e) {
      throw e;
    }
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(@MessageBody() data: any) {
    try {
      const resp = await this.chatService.sendMessage(data.chatRoom._id, data.message);

      this.server.emit(`${data.chatRoom._id}-newMessage`, data.message);

      return {
        message: RESPONSE_MESSAGE.SUCCESS,
        resp: resp,
      };
    } catch (e) {
      throw e;
    }
  }

  @SubscribeMessage('leave-chatroom')
  async handleLeaveChatRoom(@MessageBody() data: any) {
    try {
      const resp = await this.chatService.leaveChatRoom(data.chatRoom._id, data.user._id);

      this.server.emit(`${data.chatRoom._id}-leaveChatRoom`, data.user);
      
      return {
        message: RESPONSE_MESSAGE.SUCCESS,
        data: resp,
      };
    } catch (e) {
      throw e;
    }
  }
}
