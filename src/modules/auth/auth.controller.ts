
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/signIn.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signIn: SignInDto) {
    return this.authService.signIn(signIn)
  }
  @HttpCode(HttpStatus.OK)
  @Post('google')
  async signInWithGoogle(@Body() body: any) {
    const { email, name, googleId } = body
    return this.authService.signInWithGoogle(email, name, googleId)
  }
}
