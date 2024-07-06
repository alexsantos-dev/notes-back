import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { NoteEntity } from './entities/note.entity'
import { validate } from 'class-validator'
import { UserEntity } from '../user/entities/user.entity'

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async create(userId: string, data: CreateNoteDto): Promise<NoteEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    const newNote = this.noteRepository.create({ ...data, user })
    try {
      const errors = await validate(newNote)
      if (errors.length > 0) {
        throw new Error('Object data invalid')
      }
      return await this.noteRepository.save(newNote)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll(userId: string): Promise<NoteEntity[]> {
    try {
      const results = await this.noteRepository.find({
        where: { user: { id: userId } },
        order: {
          updatedAt: 'DESC',
        },
      })
      if (results.length === 0) {
        throw new Error('No results found for this operation')
      }
      return results
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async findOne(userId: string, noteId: string): Promise<NoteEntity> {
    const note = await this.findNoteByUser(userId, noteId)
    return note
  }

  async update(userId: string, noteId: string, data: UpdateNoteDto): Promise<NoteEntity> {
    const note = await this.findNoteByUser(userId, noteId)
    const updatedNote = this.noteRepository.merge(note, data)
    const errors = await validate(updatedNote)
    if (errors.length > 0) {
      throw new Error('Object data invalid')
    }
    return await this.noteRepository.save(updatedNote)
  }

  async remove(userId: string, noteId: string): Promise<void> {
    const note = await this.findNoteByUser(userId, noteId)
    await this.noteRepository.remove(note)
  }

  private async findNoteByUser(userId: string, noteId: string): Promise<NoteEntity> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId, user: { id: userId } },
    })
    if (!note) {
      throw new NotFoundException('Note not found')
    }
    return note
  }
}
