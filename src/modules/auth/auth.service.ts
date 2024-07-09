
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/signIn.dto'

@Injectable()
export class AuthService {
  constructor(
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

  async signInWithGoogle(email: string, name: string, googleId: string): Promise<{ id: string, token: string }> {
    let user = await this.userService.findOneByEmail(email)

    if (!user) {
      user = await this.userService.create({ email, name, password: googleId })
    }

    const payload = { sub: user.id, email: user.email }
    const token = await this.jwtService.signAsync(payload)
    return { id: user.id, token }
  }
}