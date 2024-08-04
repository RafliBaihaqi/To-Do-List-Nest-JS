import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { AuthController } from './user.controller';
import { UserSchema } from './Schemas/user.schema';
import { userProviders } from './user.provider';
import { databaseProviders } from '../Database/database.provider';
import { DatabaseModule } from '../Database/database.modules';
import { AuthService } from '../Auth/auth.service';
import { AuthModule } from '../Auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [UserService, ...userProviders, ...databaseProviders, AuthService],
})
export class UserModule {}
