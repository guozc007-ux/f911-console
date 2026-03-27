import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'user_id' })
  userId!: number

  @Index('uk_user_account')
  @Column({ type: 'varchar', length: 50, nullable: false, default: '' })
  account!: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '' })
  password!: string

  @Column({ type: 'varchar', length: 50, nullable: false, default: '' })
  nickname!: string

  @Index('uk_user_code')
  @Column({ type: 'char', length: 10, nullable: false, default: '' })
  code!: string

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  sex!: number

  @Index('uk_user_phone')
  @Column({ type: 'varchar', length: 20, nullable: false, default: '' })
  phone!: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '' })
  avatar!: string

  @Index('idx_user_role')
  @Column({ type: 'tinyint', nullable: false, default: 1 })
  role!: number

  @Index('idx_user_player_level')
  @Column({ type: 'bigint', unsigned: true, name: 'player_level_id', nullable: false, default: 0 })
  playerLevelId!: number

  @Column({ type: 'varchar', length: 100, nullable: false, default: '' })
  zfb!: string

  @Column({ type: 'varchar', length: 50, nullable: false, default: '' })
  name!: string

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 })
  deposit!: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'deposit_pay',
    nullable: false,
    default: 0,
  })
  depositPay!: string

  @Column({ type: 'tinyint', name: 'project_hypothecate', nullable: false, default: 0 })
  projectHypothecate!: number

  @Column({ type: 'int', name: 'freeze_hours', nullable: false, default: 0 })
  freezeHours!: number

  @Index('idx_user_status')
  @Column({ type: 'tinyint', nullable: false, default: 1 })
  status!: number

  @Column({ type: 'varchar', length: 500, nullable: false, default: '' })
  remark!: string

  @Column({ type: 'bigint', name: 'project_accept_time', nullable: false, default: 0 })
  projectAcceptTime!: number

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt!: Date | null
}
