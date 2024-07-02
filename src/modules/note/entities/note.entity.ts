import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

@Entity({ name: 'Notes' })
export class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'note', type: 'text' })
  @IsNotEmpty()
  note: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  constructor(public todo?: Partial<NoteEntity>) {
    Object.assign(this, todo)
  }
}