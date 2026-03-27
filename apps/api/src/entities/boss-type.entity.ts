import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm'
import { Boss } from './boss.entity'

@Entity({ name: 'boss_type' })
export class BossType {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'boss_type_id' })
  bossTypeId!: number

  @Index('idx_boss_type_name')
  @Column({ type: 'varchar', length: 50, nullable: false, default: '' })
  name!: string

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false, default: 0 })
  percent!: string

  @Index('idx_boss_type_sort')
  @Column({ type: 'int', nullable: false, default: 0 })
  sort!: number

  @Index('idx_boss_type_status')
  @Column({ type: 'tinyint', nullable: false, default: 1 })
  status!: number

  @OneToMany(() => Boss, (boss) => boss.bossTypeId)
  bosses!: Boss[]

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt!: Date | null
}
