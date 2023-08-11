import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel = Model<User>,
    ) {}

    async getUsers() {
        try {
            return await this.userModel.find();
        } catch (e) {
            throw e;
        }
    }

    async createUser(payload: CreateUserDto) {
        try {
            const isExist = await this.userModel.findOne({ username: payload.username });
            if (isExist) return isExist;
            const createdUser = new this.userModel(payload);
            return await createdUser.save();
        } catch (e) {
            throw e;
        }
    }

    async findUser(id: string) {
        try {
         return await this.userModel.findById(id);
        } catch (e) {
            throw e;
        }
    }

    async updateUser(id: string, payload: CreateUserDto) {
        try {
            return await this.userModel.findByIdAndUpdate(id, payload);
        } catch (e) {
            throw e;
        }
    }

    async deleteUser(id: string) {
        try {
            return await this.userModel.findByIdAndDelete(id);
        } catch (e) {
            throw e;
        }
    }
}
