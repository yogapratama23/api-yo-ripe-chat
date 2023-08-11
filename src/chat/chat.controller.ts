import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './chat.dto';
import { RESPONSE_MESSAGE } from 'src/constants/app.constant';

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
    ) {}

    @Post()
    async createChatRoom(@Body() body: CreateChatDto) {
        try {
            const resp = await this.chatService.createChatRoom(body);
            return {
                message: RESPONSE_MESSAGE.SUCCESS,
                data: resp,
            };
        } catch (e) {
            throw e;
        }
    }

    @Get(':search')
    async getChatRoom(@Param('search') search: string) {
        try {
            const resp = await this.chatService.findChatRoom(search);
            return {
                message: RESPONSE_MESSAGE.SUCCESS,
                data: resp,
            };
        } catch (e) {
            throw e;
        }
    }
}
