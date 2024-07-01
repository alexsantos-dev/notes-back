import { Injectable } from '@nestjs/common'
import { CreateModuleDto } from './dto/create-module.dto'
import { UpdateModuleDto } from './dto/update-module.dto'
import { NoteEntity } from './entities/note.entity'
import { InjectModel } from '@nestjs/sequelize'
import { UpdatedAt } from 'sequelize-typescript'

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(NoteEntity)
    private readonly noteModel: typeof NoteEntity
  ) { }

  async create(noteData: CreateModuleDto) {
    try {
      await this.noteModel.create(noteData)
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<NoteEntity[]> {
    try {
      const notes = await this.noteModel.findAll({
        order: [['updatedAt', 'DESC']]
      })
      return notes
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string): Promise<NoteEntity> {
    try {
      const note = await this.noteModel.findByPk(id)
      return note
    } catch (error) {
      throw error
    }
  }

  async update(id: string, noteData: UpdateModuleDto) {
    try {
      await this.noteModel.update(noteData, {
        where: { id },
        returning: true,
      })
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      await this.noteModel.destroy({ where: { id } })
    } catch (error) {
      throw error
    }
  }
}
