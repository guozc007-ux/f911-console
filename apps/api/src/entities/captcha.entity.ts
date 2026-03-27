import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm'

@Entity({ name: 'captcha' })
export class Captcha {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'id' })
  id!: number

  @Index('uk_captcha_uniq_id', ['uniqId'], { unique: true })
  @Column({ type: 'varchar', length: 50, nullable: false, default: '' })
  uniqId!: string

  @Column({ type: 'varchar', length: 10, nullable: false, default: '' })
  code!: string

  @Index('idx_captcha_expire')
  @Column({ type: 'bigint', name: 'expire_time', nullable: false })
  expireTime!: number

  @Index('idx_captcha_used')
  @Column({ type: 'tinyint', nullable: false, default: 0 })
  used!: number

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date
}
