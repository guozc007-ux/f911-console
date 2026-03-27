import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'apply' })
export class Apply {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'apply_id' })
  applyId!: number

  @Index('idx_apply_user_id')
  @Column({ type: 'bigint', unsigned: true, name: 'user_id', nullable: false })
  userId!: number

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 })
  money!: string

  @Column({ type: 'varchar', length: 100, name: 'alipay_account', nullable: false, default: '' })
  alipayAccount!: string

  @Column({ type: 'varchar', length: 50, name: 'alipay_name', nullable: false, default: '' })
  alipayName!: string

  @Index('idx_apply_check')
  @Column({ type: 'tinyint', name: 'check', nullable: false, default: 0 })
  checkStatus!: number

  @Column({ type: 'varchar', length: 500, name: 'check_remark', nullable: false, default: '' })
  checkRemark!: string

  @Column({ type: 'bigint', unsigned: true, name: 'check_operator_id', nullable: false, default: 0 })
  checkOperatorId!: number

  @Column({ type: 'datetime', name: 'check_time', nullable: true })
  checkTime!: Date | null

  @Index('idx_apply_remit')
  @Column({ type: 'tinyint', name: 'remit', nullable: false, default: 0 })
  remit!: number

  @Column({ type: 'datetime', name: 'remit_time', nullable: true })
  remitTime!: Date | null

  @Column({ type: 'varchar', length: 500, name: 'remit_remark', nullable: false, default: '' })
  remitRemark!: string

  @Index('idx_apply_status')
  @Column({ type: 'tinyint', nullable: false, default: 1 })
  status!: number

  @Index('idx_apply_created')
  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt!: Date | null

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user!: User
}
