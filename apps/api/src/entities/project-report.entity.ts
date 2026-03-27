import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm'
import { Boss } from './boss.entity'
import { Category } from './category.entity'
import { User } from './user.entity'

@Entity({ name: 'project_report' })
export class ProjectReport {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'project_report_id' })
  projectReportId!: number

  @Index('uk_project_report_no', { unique: true })
  @Column({ type: 'varchar', length: 20, nullable: false, default: '' })
  no!: string

  @Index('idx_project_report_user_id')
  @Column({ type: 'bigint', unsigned: true, name: 'user_id', nullable: false })
  userId!: number

  @Index('idx_project_report_customer_id')
  @Column({ type: 'bigint', unsigned: true, name: 'customer_id', nullable: false })
  customerId!: number

  @Index('idx_project_report_boss_id')
  @Column({ type: 'bigint', unsigned: true, name: 'boss_id', nullable: false })
  bossId!: number

  @Index('idx_project_report_category_id')
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'categoryId' })
  @Column({ type: 'bigint', unsigned: true, nullable: false })
  categoryId!: number

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 1 })
  quantity!: string

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'total_amount', nullable: false, default: 0 })
  totalAmount!: string

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'player_commission', nullable: false, default: 0 })
  playerCommission!: string

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'referrer_commission', nullable: false, default: 0 })
  referrerCommission!: string

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'shop_money', nullable: false, default: 0 })
  shopMoney!: string

  @Column({ type: 'varchar', length: 20, nullable: false, default: 'project' })
  type!: string

  @Column({ type: 'varchar', length: 500, nullable: false, default: '' })
  remark!: string

  @Column({ type: 'json', name: 'player_img', nullable: true })
  playerImg!: unknown

  @Index('idx_project_report_status')
  @Column({ type: 'tinyint', nullable: false, default: 1 })
  status!: number

  @Column({ type: 'tinyint', name: 'pay_status', nullable: false, default: 1 })
  payStatus!: number

  @Column({ type: 'datetime', name: 'start_time', nullable: true })
  startTime!: Date | null

  @Column({ type: 'datetime', name: 'end_time', nullable: true })
  endTime!: Date | null

  @Column({ type: 'varchar', length: 500, nullable: false, default: '' })
  feedback!: string

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt!: Date | null

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user!: User

  @ManyToOne(() => User)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'userId' })
  customer!: User

  @ManyToOne(() => Boss)
  @JoinColumn({ name: 'boss_id', referencedColumnName: 'bossId' })
  boss!: Boss
}
