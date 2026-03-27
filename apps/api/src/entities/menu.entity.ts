import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'
import { Role } from './role.entity'

@Entity({ name: 'menu' })
export class Menu {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'menu_id' })
  menuId!: number

  @Index('idx_menu_name')
  @Column({ type: 'varchar', length: 50, nullable: false, default: '' })
  name!: string

  @Index('idx_menu_url')
  @Column({ type: 'varchar', length: 100, nullable: false, default: '' })
  url!: string

  @Column({ type: 'varchar', length: 50, nullable: false, default: '' })
  icon!: string

  @Column({ type: 'int', nullable: false, default: 0 })
  sort!: number

  @Index('idx_menu_parent_id')
  @Column({ type: 'bigint', unsigned: true, name: 'parent_id', nullable: false, default: 0 })
  parentId!: number

  @Index('idx_menu_status')
  @Column({ type: 'tinyint', nullable: false, default: 1 })
  status!: number

  @ManyToMany(() => Role, (role) => role.menus)
  roles!: Role[]

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt!: Date | null
}
