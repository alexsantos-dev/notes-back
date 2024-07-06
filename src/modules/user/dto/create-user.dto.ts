import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsStrongPassword()
  password: string
}

