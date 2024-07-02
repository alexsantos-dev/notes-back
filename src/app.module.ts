import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NoteModule } from './modules/note/note.module'
import { NoteEntity } from './modules/note/entities/note.entity'
import { dataBaseConfig } from 'database/database.config'

@Module({
  imports: [
    TypeOrmModule.forFeature([NoteEntity]),
    TypeOrmModule.forRoot(dataBaseConfig),
    NoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
