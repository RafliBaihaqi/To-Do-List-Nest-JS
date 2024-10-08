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
        secure: true,
        maxAge: 86400000,
        sameSite: 'none',
      });
      res.status(200).json({ userId, token });
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
    const user = req.user;
    if (!user || !user.userId) {
      return res
        .status(401)
        .send({ message: 'Token invalid or user not found' });
    }
    return res.status(200).send({ userId: user.userId });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.cookie('auth_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logout successful' });
  }
}
