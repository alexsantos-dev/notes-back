import { IsNotEmpty } from 'class-validator'
export class CreateModuleDto {
  @IsNotEmpty()
  note: string
}
