import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['auth_token'];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }
    try {
      const decoded = this.jwtService.verify(token);
      (request as any).user = decoded;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
}
