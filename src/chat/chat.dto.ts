import { User } from "src/user/user.schema";

export class CreateChatDto {
    name: string;
    creator: User;
    members: User[] | [];
    messages: any[] | [];
}
