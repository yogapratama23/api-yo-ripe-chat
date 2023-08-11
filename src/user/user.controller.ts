import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { RESPONSE_MESSAGE } from 'src/constants/app.constant';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get()
    async getUsers() {
        try {
            const resp = await this.userService.getUsers();
            return {
                message: RESPONSE_MESSAGE.SUCCESS,
                data: resp,
            };
        } catch (e) {
            throw e;
        }
    }

    @Post()
    async createUser(@Body() body: CreateUserDto) {
        try {
            const resp = await this.userService.createUser(body);
            return {
                message: RESPONSE_MESSAGE.SUCCESS,
                data: resp,
            };
        } catch (e) {
            throw e;
        }
    }

    @Get(':id')
    async findUser(@Param('id') id: string) {
        try {
            const resp = await this.userService.findUser(id);
            return {
                message: RESPONSE_MESSAGE.SUCCESS,
                data: resp,
            };
        } catch (e) {
            throw e;
        }
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() body: CreateUserDto) {
        try {
            const resp = await this.userService.updateUser(id, body);
            return {
                message: RESPONSE_MESSAGE.SUCCESS,
                data: resp,
            };
        } catch (e) {
            throw e;
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        try {
            const resp = await this.userService.deleteUser(id);
            return {
                message: RESPONSE_MESSAGE.SUCCESS,
                data: resp,
            };
        } catch (e) {
            throw e;
        }
    }
}
