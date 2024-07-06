import { Controller, Get, Post, Patch, Delete, Body, Param, HttpStatus } from '@nestjs/common'
import { NoteService } from './note.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { ParseUUIDPipe } from '@nestjs/common'
import { HttpCode } from '@nestjs/common'
import { NoteEntity } from './entities/note.entity'

@Controller('user/:userId/notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post()
  async create(@Param('userId', new ParseUUIDPipe()) userId: string, @Body() data: CreateNoteDto): Promise<NoteEntity> {
    return await this.noteService.create(userId, data)
  }

  @Get()
  async findAll(@Param('userId', new ParseUUIDPipe()) userId: string): Promise<NoteEntity[]> {
    return await this.noteService.findAll(userId)
  }

  @Get(':noteId')
  async findOne(@Param('userId', new ParseUUIDPipe()) userId: string, @Param('noteId', new ParseUUIDPipe()) noteId: string): Promise<NoteEntity> {
    return await this.noteService.findOne(userId, noteId)
  }

  @Patch(':noteId')
  async update(@Param('userId', new ParseUUIDPipe()) userId: string, @Param('noteId', new ParseUUIDPipe()) noteId: string, @Body() data: UpdateNoteDto): Promise<NoteEntity> {
    return await this.noteService.update(userId, noteId, data)
  }

  @Delete(':noteId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('userId', new ParseUUIDPipe()) userId: string, @Param('noteId', new ParseUUIDPipe()) noteId: string): Promise<undefined> {
    await this.noteService.remove(userId, noteId)
  }
}