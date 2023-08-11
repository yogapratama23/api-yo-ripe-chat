import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './chat.schema';
import { Model } from 'mongoose';
import { CreateChatDto } from './chat.dto';
import { User } from 'src/user/user.schema';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name) private chatModel = Model<Chat>,
        @InjectModel(User.name) private userModel = Model<User>,
    ) {}

    async createChatRoom(payload: CreateChatDto) {
        try {
            const isExist = await this.chatModel.exists({ username: payload.name });
            if (isExist) throw new HttpException('Chat room already exist!', HttpStatus.UNPROCESSABLE_ENTITY);
            const createdChatRoom = new this.chatModel(payload);
            return await createdChatRoom.save();
        } catch (e) {
            throw e;
        }
    }

    async findChatRoom(search: string) {
        try {
            return await this.chatModel.findOne({ name: search }).populate('creator').exec();
        } catch (e) {
            throw e;
        }
    }

    async checkChatRoom(chatRoom: Chat, user: User) {
        try {
            let isNewMember = false;
            const room = await this.chatModel.findOne({ name: chatRoom.name }).populate([
                {
                    path: 'messages',
                    populate: {
                        path: 'sender',
                        model: 'User'
                    }
                },
                'members',
            ]).exec();
            
            if (room.members.length) {
                const checkUser = room.members.find(o => o.username === user.username);
                if (!checkUser) {
                    room.members.push(user);
                    isNewMember = true;
                }
            } else {
                room.members.push(user);
                isNewMember = true;
            }

            const savedRoom = await room.save();
            return {
                room: savedRoom,
                isNewMember: isNewMember,

            };
        } catch (e) {
            throw e;
        }
    }

    async sendMessage(chatRoomId: string, message: any) {
        try {
            const room = await this.chatModel.findById(chatRoomId);
            const messages = [...room.messages, message];

            return await this.chatModel.findByIdAndUpdate(chatRoomId, {
                messages: messages
            });
        } catch (e) {
            throw e;
        }
    }

    async leaveChatRoom(chatRoomId: string, userId: string) {
        try {
            const room = await this.chatModel.findById(chatRoomId);
            const members = room.members.filter(o => (o._id).toString() !==  userId);

            await this.chatModel.findByIdAndUpdate(chatRoomId, {
                members: members,
            });

            return await this.chatModel.findById(chatRoomId).populate([
                'members',
            ]).exec();
        } catch (e) {
            throw e;
        }
    }
}
