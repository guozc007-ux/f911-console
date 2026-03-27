import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'admin_session' })
export class AdminSession {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'id' })
  id!: number

  @Index('idx_admin_session_user_id')
  @Column({ type: 'bigint', unsigned: true, name: 'user_id', nullable: false })
  userId!: number

  @Index('uk_admin_session_token')
  @Column({ type: 'varchar', length: 500, nullable: false, default: '' })
  token!: string

  @Index('idx_admin_session_expire')
  @Column({ type: 'bigint', name: 'expire_time', nullable: false })
  expireTime!: number

  @Column({ type: 'varchar', length: 50, nullable: false, default: '' })
  ip!: string

  @Column({ type: 'varchar', length: 500, nullable: false, default: '' })
  userAgent!: string

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime', nullable: true })
  updatedAt!: Date | null

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt!: Date | null

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user!: User
}
