import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NoteModule } from './modules/note/note.module'
import { NoteEntity } from './modules/note/entities/note.entity'
import { dataBaseConfig } from 'database/database.config'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfig),
    NoteModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
