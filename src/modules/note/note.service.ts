import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { NoteEntity } from './entities/note.entity'
import { validate } from 'class-validator'

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>
  ) { }

  async create(data: CreateNoteDto): Promise<NoteEntity> {
    const newNote = this.noteRepository.create(data)
    try {
      const errors = await validate(newNote)
      if (errors.length > 0) {
        throw new Error('Object data ivalid')
      }
      return await this.noteRepository.save(newNote)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll(): Promise<NoteEntity[]> {
    try {
      const results = await this.noteRepository.find()
      if (results.length === 0) {
        throw new Error('No results found for this operation')
      }
      return results
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async findOne(id: string): Promise<NoteEntity> {
    try {
      return await this.noteRepository.findOneOrFail({ where: { id } })
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async update(id: string, data: UpdateNoteDto): Promise<NoteEntity> {
    try {
      const note = await this.findOne(id)
      if (!note) {
        throw new NotFoundException('Note not found')
      }

      const updatedNote = this.noteRepository.merge(note, data)
      const errors = await validate(updatedNote)
      if (errors.length > 0) {
        throw new Error('Object data ivalid')
      }
      return await this.noteRepository.save(updatedNote)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(id: string): Promise<undefined> {
    await this.findOne(id)
    await this.noteRepository.delete(id)
  }
}