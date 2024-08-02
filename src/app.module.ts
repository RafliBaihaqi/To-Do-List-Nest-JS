import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseProviders } from './Database/database.provider';
import { DatabaseModule } from './Database/database.modules';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:root@todolist.lal1uni.mongodb.net/?retryWrites=true&w=majority&appName=ToDoList',
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    UserModule,
    DatabaseModule,
    AuthModule,
  ],
  providers: [...databaseProviders],
})
export class AppModule {}
