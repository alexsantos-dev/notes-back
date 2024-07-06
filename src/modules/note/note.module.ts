import { Module } from '@nestjs/common'
import { NoteService } from './note.service'
import { NoteController } from './note.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NoteEntity } from './entities/note.entity'
import { UserEntity } from '../user/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity, UserEntity])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule { }
