import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/user-login.dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const { userId, token } = await this.authService.login(loginDto);
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      });
      res.status(200).json({ userId });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @Get('validate-token')
  @UseGuards(JwtAuthGuard)
  validateToken(
    @Req() req: Request & { user: { userId: string } },
    @Res() res: Response,
  ) {
    res.status(200).send({ userId: req.user['userId'] });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.cookie('auth_token', '', {
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logout successful' });
  }
}
