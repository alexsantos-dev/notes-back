import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule, { cors: true })
  app.enableCors({
    origin: '',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true
  })
  await app.listen(parseInt(process.env.PORT))
}
bootstrap()
