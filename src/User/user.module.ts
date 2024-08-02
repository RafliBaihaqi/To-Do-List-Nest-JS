import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { AuthController } from './user.controller';
import { UserSchema } from './Schemas/user.schema';
import { userProviders } from './user.provider';
import { databaseProviders } from 'src/Database/database.provider';
import { DatabaseModule } from 'src/Database/database.modules';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'dxRRZZSqujYkBz3Lin7vyw',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, ...userProviders, ...databaseProviders],
})
export class UserModule {}
