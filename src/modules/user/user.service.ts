import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import { validate } from 'class-validator'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const newNote = this.userRepository.create(data)
    try {
      const errors = await validate(newNote)
      if (errors.length > 0) {
        throw new Error('Object data ivalid')
      }
      return await this.userRepository.save(newNote)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const results = await this.userRepository.find({
        order: {
          updatedAt: 'DESC'
        }
      })
      if (results.length === 0) {
        throw new Error('No results found for this operation')
      }
      return results
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneOrFail({ where: { id } })
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    try {
      const user = await this.findOne(id)
      const updatedUser = this.userRepository.merge(user, data)
      const errors = await validate(updatedUser)
      if (errors.length > 0) {
        throw new Error('Object data ivalid')
      }
      return await this.userRepository.save(updatedUser)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(id: string): Promise<undefined> {
    await this.findOne(id)
    await this.userRepository.delete(id)
  }
}
