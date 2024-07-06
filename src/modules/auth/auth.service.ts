
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

  async signIn(signIn: SignInDto): Promise<{ acess_token: string }> {
    const user = await this.userService.findOneByEmail(signIn.email)
    if (user && await bcrypt.compare(signIn.password, user.password)) {
      const payload = { sub: user.id, email: user.email }
      return {
        acess_token: await this.jwtService.signAsync(payload)
      }
    } else {
      throw new UnauthorizedException('invalid email or password')
    }
  }
}