import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { dataBaseConfig } from 'database/database.config'
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    SequelizeModule.forRoot(dataBaseConfig),
    ModulesModule,
  ],
})
export class AppModule { }
