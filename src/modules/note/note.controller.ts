import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common'
import { NoteService } from './note.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { ParseUUIDPipe } from '@nestjs/common'
import { HttpCode } from '@nestjs/common'
import { NoteEntity } from './entities/note.entity'

@Controller('/notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto): Promise<NoteEntity> {
    return await this.noteService.create(createNoteDto)
  }

  @Get()
  async findAll(): Promise<NoteEntity[]> {
    return await this.noteService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<NoteEntity> {
    return await this.noteService.findOne(id)
  }

  @Patch(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() data: UpdateNoteDto): Promise<NoteEntity> {
    return await this.noteService.update(id, data)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<undefined> {
    await this.noteService.remove(id)
  }
}