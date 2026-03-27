import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm'
import { Boss } from './boss.entity'
import { User } from './user.entity'

@Entity({ name: 'fund_flow' })
export class FundFlow {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'fund_flow_id' })
  fundFlowId!: number

  @Index('idx_fund_flow_boss_id')
  @Column({ type: 'bigint', unsigned: true, name: 'boss_id', nullable: false })
  bossId!: number

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false, default: 0 })
  amount!: string

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false, default: 0 })
  give!: string

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'balance_before', nullable: false, default: 0 })
  balanceBefore!: string

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'balance_after', nullable: false, default: 0 })
  balanceAfter!: string

  @Index('idx_fund_flow_operation_type')
  @Column({ type: 'tinyint', name: 'operation_type', nullable: false })
  operationType!: number

  @Column({ type: 'varchar', length: 50, nullable: false, default: '' })
  type!: string

  @Column({ type: 'varchar', length: 50, name: 'business_type', nullable: false, default: '' })
  businessType!: string

  @Column({ type: 'bigint', unsigned: true, name: 'business_id', nullable: false, default: 0 })
  businessId!: number

  @Column({ type: 'varchar', length: 500, nullable: false, default: '' })
  remark!: string

  @Column({ type: 'json', name: 'extra_data', nullable: true })
  extraData!: unknown

  @Index('idx_fund_flow_customer_id')
  @Column({ type: 'bigint', unsigned: true, name: 'customer_id', nullable: true })
  customerId!: number | null

  @Column({ type: 'varchar', length: 500, nullable: false, default: '' })
  photo!: string

  @Column({ type: 'tinyint', nullable: false, default: 1 })
  status!: number

  @Index('idx_fund_flow_del')
  @Column({ type: 'tinyint', name: 'del', nullable: false, default: 1 })
  del!: number

  @Index('idx_fund_flow_created')
  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt!: Date | null

  @ManyToOne(() => Boss)
  @JoinColumn({ name: 'boss_id', referencedColumnName: 'bossId' })
  boss!: Boss

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'userId' })
  customer?: User
}
