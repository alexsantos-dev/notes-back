import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common'
import { NoteService } from './note.service'
import { CreateModuleDto } from './dto/create-module.dto'
import { UpdateModuleDto } from './dto/update-module.dto'
import { Response } from 'express'
import { HttpStatus } from '@nestjs/common'

@Controller('/notes')
export class NoteController {
  constructor(private readonly noteServices: NoteService) { }

  @Post()
  async create(@Body() noteData: CreateModuleDto, @Res() res: Response) {
    try {
      await this.noteServices.create(noteData)
      return res.status(HttpStatus.OK).json('Note added sucessfully')
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: error.message,
      })
    }
  }

  @Get()
  findAll() {
    return this.noteServices.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteServices.findOne(id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() noteData: UpdateModuleDto, @Res() res: Response) {
    try {
      await this.noteServices.update(id, noteData)
      return res.status(HttpStatus.OK).json({ msg: "Note updated" })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: error.message,
      })
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteServices.remove(id)
  }
}
