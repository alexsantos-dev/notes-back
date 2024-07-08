import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import { ping } from './ping'

async function bootstrap() {
  dotenv.config()
  await ping()
  const app = await NestFactory.create(AppModule, { cors: true })
  app.enableCors({
    origin: [process.env.FRONT, process.env.LOCAL],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true
  })
  await app.listen(parseInt(process.env.PORT))
}
bootstrap()
