import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'
import { Menu } from './menu.entity'

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'role_id' })
  roleId!: number

  @Index('idx_role_name')
  @Column({ type: 'varchar', length: 50, nullable: false, default: '' })
  name!: string

  @Index('idx_role_del')
  @Column({ type: 'tinyint', nullable: false, default: 1 })
  del!: number

  @Column({ type: 'varchar', length: 255, nullable: false, default: '' })
  remark!: string

  @ManyToMany(() => Menu, (menu) => menu.roles)
  @JoinTable({
    name: 'role_menu',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'roleId',
    },
    inverseJoinColumn: {
      name: 'menu_id',
      referencedColumnName: 'menuId',
    },
  })
  menus!: Menu[]

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt!: Date | null
}
