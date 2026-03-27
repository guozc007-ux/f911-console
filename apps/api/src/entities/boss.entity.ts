import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'
import { ProjectReport } from './project-report.entity'
import { FundFlow } from './fund-flow.entity'

@Entity({ name: 'boss' })
export class Boss {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'boss_id' })
  bossId!: number

  @Index('idx_boss_nickname')
  @Column({ type: 'varchar', length: 50, nullable: false, default: '' })
  nickname!: string

  @Index('uk_boss_code', ['code'], { unique: true })
  @Column({ type: 'char', length: 10, nullable: false, default: '' })
  code!: string

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  sex!: number

  @Index('idx_boss_phone')
  @Column({ type: 'varchar', length: 20, nullable: false, default: '' })
  phone!: string

  @Column({ type: 'varchar', length: 100, nullable: false, default: '' })
  wx!: string

  @Index('idx_boss_referrer')
  @Column({ type: 'bigint', unsigned: true, name: 'referrer', nullable: false, default: 0 })
  referrer!: number

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'referrer_commission', nullable: false, default: 0 })
  referrerCommission!: string

  @Index('idx_boss_boss_type')
  @Column({ type: 'bigint', unsigned: true, name: 'boss_type_id', nullable: false, default: 1 })
  bossTypeId!: number

  @Index('idx_boss_status')
  @Column({ type: 'tinyint', nullable: false, default: 1 })
  status!: number

  @OneToMany(() => ProjectReport, (report) => report.boss)
  reports!: ProjectReport[]

  @OneToMany(() => FundFlow, (fundFlow) => fundFlow.boss)
  fundFlows!: FundFlow[]

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt!: Date | null
}
