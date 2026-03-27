import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm'

@Entity({ name: 'player_level' })
export class PlayerLevel {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'player_level_id' })
  playerLevelId!: number

  @Index('idx_player_level_name')
  @Column({ type: 'varchar', length: 50, nullable: false, default: '' })
  name!: string

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false, default: 0 })
  percent!: string

  @Index('idx_player_level_sort')
  @Column({ type: 'int', nullable: false, default: 0 })
  sort!: number

  @Index('idx_player_level_status')
  @Column({ type: 'tinyint', nullable: false, default: 1 })
  status!: number

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt!: Date | null
}
