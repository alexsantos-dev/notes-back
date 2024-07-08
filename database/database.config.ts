import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { NoteEntity } from 'src/modules/note/entities/note.entity'
import { UserEntity } from 'src/modules/user/entities/user.entity'
import * as dotenv from 'dotenv'


dotenv.config()
export const dataBaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  entities: [UserEntity, NoteEntity],
  synchronize: true,
}

/* 
host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
*/
