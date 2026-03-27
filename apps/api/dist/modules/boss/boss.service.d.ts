import { Repository } from 'typeorm';
import { Boss } from '../../entities/boss.entity';
import { PaginatedDto } from '../../responses';
import { CreateBossDto, ListBossDto, UpdateBossDto } from './dto/boss.dto';
type SafeBoss = Omit<Boss, 'deletedAt'>;
export declare class BossService {
    private readonly bossRepository;
    constructor(bossRepository: Repository<Boss>);
    findPaginated(query: ListBossDto): Promise<PaginatedDto<SafeBoss>>;
    findById(bossId: number): Promise<SafeBoss>;
    create(dto: CreateBossDto): Promise<SafeBoss>;
    update(bossId: number, dto: UpdateBossDto): Promise<SafeBoss>;
    remove(bossId: number): Promise<void>;
    private getPublicSelect;
    private getPublicColumns;
}
export {};
