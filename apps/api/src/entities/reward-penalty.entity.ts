import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'reward_penalty' })
export class RewardPenalty {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'id' })
  id!: number

  @Index('idx_reward_penalty_user_id')
  @ManyToOne(() => User)
  @Column({ type: 'bigint', unsigned: true, name: 'user_id', nullable: false })
  userId!: number

  @Index('idx_reward_penalty_type')
  @Column({ type: 'tinyint', nullable: false })
  type!: number

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 })
  amount!: string

  @Column({ type: 'varchar', length: 500, nullable: false, default: '' })
  remark!: string

  @Index('idx_reward_penalty_operator_id')
  @ManyToOne(() => User)
  @Column({ type: 'bigint', unsigned: true, name: 'operator_id', nullable: false })
  operatorId!: number

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt!: Date | null
}
