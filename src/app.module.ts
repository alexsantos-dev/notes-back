import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { dataBaseConfig } from 'database/database.config'
import { NoteModule } from './modules/note.module'

@Module({
  imports: [
    SequelizeModule.forRoot(dataBaseConfig),
    NoteModule,
  ],
})
export class AppModule { }
