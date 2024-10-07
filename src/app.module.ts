import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseProviders } from './Database/database.provider';
import { DatabaseModule } from './Database/database.modules';
import { AuthModule } from './Auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TasksModule } from './Task/task.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    UserModule,
    DatabaseModule,
    AuthModule,
    TasksModule,
  ],
  providers: [...databaseProviders],
})
export class AppModule {}
