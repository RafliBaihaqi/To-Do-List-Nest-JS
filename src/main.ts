import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
