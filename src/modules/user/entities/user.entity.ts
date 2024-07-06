import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'
import { NoteEntity } from 'src/modules/note/entities/note.entity'

@Entity({ name: 'Users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', type: 'text' })
  @IsNotEmpty()
  name: string

  @Column({ name: 'email', type: 'text', unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Column({ name: 'password', type: 'text' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string

  @OneToMany(() => NoteEntity, (note) => note.user)
  notes: NoteEntity[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

}