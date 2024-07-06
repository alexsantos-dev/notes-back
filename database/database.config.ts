import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as path from 'path'
import { NoteEntity } from 'src/modules/note/entities/note.entity'
import { UserEntity } from 'src/modules/user/entities/user.entity'

export const dataBaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'database/database.sqlite',
  entities: [UserEntity, NoteEntity],
  migrations: [path.join(__dirname, 'migrations', '*.ts')],
  synchronize: true,
}
