import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as path from 'path'
import { NoteEntity } from 'src/modules/note/entities/note.entity'

export const dataBaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: path.join(__dirname, 'database', 'database.sqlite'),
  entities: [NoteEntity],
  migrations: [path.join(__dirname, 'migrations', '*.ts')],
  synchronize: true,
}
