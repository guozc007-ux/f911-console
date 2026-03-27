import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'order_id' })
  orderId!: number

  @Index('uk_order_no', { unique: true })
  @Column({ type: 'varchar', length: 20, nullable: false, default: '' })
  no!: string

  @Index('idx_order_boss_id')
  @Column({ type: 'bigint', unsigned: true, name: 'boss_id', nullable: false })
  bossId!: number

  @Column({ type: 'varchar', length: 100, name: 'boss_game_nickname', nullable: false, default: '' })
  bossGameNickname!: string

  @Index('idx_order_customer_id')
  @Column({ type: 'bigint', unsigned: true, name: 'customer_id', nullable: false })
  customerId!: number

  @Column({ type: 'json', name: 'category_id', nullable: false })
  categoryId!: unknown

  @Column({ type: 'varchar', length: 500, name: 'user_id', nullable: false, default: '' })
  userId!: string

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 1 })
  count!: string

  @Column({ type: 'varchar', length: 500, nullable: false, default: '' })
  remark!: string

  @Column({ type: 'varchar', length: 500, nullable: false, default: '' })
  feedback!: string

  @Index('idx_order_status')
  @Column({ type: 'tinyint', nullable: false, default: 1 })
  status!: number

  @Column({ type: 'tinyint', name: 'del', nullable: false, default: 1 })
  del!: number

  @Index('idx_order_created')
  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date

  @ManyToOne(() => User)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'userId' })
  customer!: User
}
