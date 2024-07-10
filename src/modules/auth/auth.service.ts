
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/signIn.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../user/entities/user.entity'
import { Repository, EntityNotFoundError } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(signIn: SignInDto): Promise<{ token: string }> {
    const user = await this.userService.findOneByEmail(signIn.email)
    if (user && await bcrypt.compare(signIn.password, user.password)) {
      const payload = { sub: user.id, email: user.email }
      return {
        token: await this.jwtService.signAsync(payload)
      }
    } else {
      throw new UnauthorizedException('invalid email or password')
    }
  }

  async signInWithGoogle(email: string, name: string, password: string): Promise<{ token: string }> {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { email } })
      const payload = { sub: user.id, email: user.email }
      return {
        token: await this.jwtService.signAsync(payload),
      }
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        try {
          const hashedPassword = await bcrypt.hash(password, 10)
          const newUser = this.userRepository.create({ name, email, password: hashedPassword })
          await this.userRepository.save(newUser)
          const payload = { sub: newUser.id, email: newUser.email }
          return {
            token: await this.jwtService.signAsync(payload),
          }
        } catch (error) {
          throw new BadRequestException(error.message)
        }
      }
    }
  }
}