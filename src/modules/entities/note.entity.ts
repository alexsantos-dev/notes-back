import { Model, Table, Column, DataType } from 'sequelize-typescript'

@Table({ timestamps: true })
export class NoteEntity extends Model<NoteEntity> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  note: string
}
