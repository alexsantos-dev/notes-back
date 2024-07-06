import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { UserEntity } from 'src/modules/user/entities/user.entity'

@Entity({ name: 'Notes' })
export class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'note', type: 'text' })
  @IsNotEmpty()
  note: string

  @ManyToOne(() => UserEntity, (user) => user.notes)
  user: UserEntity

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

}