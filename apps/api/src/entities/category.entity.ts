import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Boss } from './boss.entity'
import { ProjectReport } from './project-report.entity'

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'category_id' })
  categoryId!: number

  @Index('idx_category_fid')
  @Column({ type: 'bigint', unsigned: true, name: 'category_fid', nullable: false, default: 0 })
  categoryFid!: number

  @Column({ type: 'varchar', length: 100, name: 'category_name', nullable: false, default: '' })
  categoryName!: string

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'category_price', nullable: false, default: 0 })
  categoryPrice!: string

  @Column({ type: 'varchar', length: 20, name: 'category_type', nullable: false, default: 'project' })
  categoryType!: string

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'commission_rate', nullable: false, default: 0 })
  commissionRate!: string

  @Index('idx_category_sort')
  @Column({ type: 'int', name: 'category_sort', nullable: false, default: 0 })
  categorySort!: number

  @Column({ type: 'varchar', length: 500, name: 'category_remark', nullable: false, default: '' })
  categoryRemark!: string

  @Index('idx_category_type')
  @Column({ type: 'varchar', length: 20, nullable: false, default: '' })
  type!: string

  @Index('idx_category_status')
  @Column({ type: 'tinyint', nullable: false, default: 1 })
  status!: number

  @OneToMany(() => ProjectReport, (report) => report.categoryId)
  projectReports!: ProjectReport[]

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt!: Date | null
}
