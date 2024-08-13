import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('User')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    try {
      const result = await this.userService.register(registerDto);
      const { token } = result;

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      });

      return res
        .status(HttpStatus.OK)
        .json({ message: 'User Registered!', token });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
