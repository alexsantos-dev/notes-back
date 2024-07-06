import { Controller, Get, Post, Patch, Delete, Body, Param, HttpStatus, UseGuards } from '@nestjs/common'
import { NoteService } from './note.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { ParseUUIDPipe } from '@nestjs/common'
import { HttpCode } from '@nestjs/common'
import { NoteEntity } from './entities/note.entity'
import { AuthGuard } from '../auth/auth.guard'

@Controller('user/:userId/notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Param('userId', new ParseUUIDPipe()) userId: string, @Body() data: CreateNoteDto): Promise<NoteEntity> {
    return await this.noteService.create(userId, data)
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Param('userId', new ParseUUIDPipe()) userId: string): Promise<NoteEntity[]> {
    return await this.noteService.findAll(userId)
  }

  @UseGuards(AuthGuard)
  @Get(':noteId')
  async findOne(@Param('userId', new ParseUUIDPipe()) userId: string, @Param('noteId', new ParseUUIDPipe()) noteId: string): Promise<NoteEntity> {
    return await this.noteService.findOne(userId, noteId)
  }

  @UseGuards(AuthGuard)
  @Patch(':noteId')
  async update(@Param('userId', new ParseUUIDPipe()) userId: string, @Param('noteId', new ParseUUIDPipe()) noteId: string, @Body() data: UpdateNoteDto): Promise<NoteEntity> {
    return await this.noteService.update(userId, noteId, data)
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':noteId')
  async remove(@Param('userId', new ParseUUIDPipe()) userId: string, @Param('noteId', new ParseUUIDPipe()) noteId: string): Promise<undefined> {
    await this.noteService.remove(userId, noteId)
  }
}