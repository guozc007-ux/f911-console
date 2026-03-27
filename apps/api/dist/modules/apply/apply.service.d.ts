import { Repository } from 'typeorm';
import { Apply } from '../../entities/apply.entity';
import { User } from '../../entities/user.entity';
import { PaginatedDto } from '../../responses';
import { CreateApplyDto, ListApplyDto, UpdateApplyCheckDto, UpdateApplyDto, UpdateApplyRemitDto } from './dto/apply.dto';
type SafeApply = Omit<Apply, 'deletedAt'>;
export declare class ApplyService {
    private readonly applyRepository;
    private readonly userRepository;
    constructor(applyRepository: Repository<Apply>, userRepository: Repository<User>);
    findPaginated(query: ListApplyDto): Promise<PaginatedDto<SafeApply>>;
    findById(applyId: number): Promise<SafeApply>;
    create(dto: CreateApplyDto): Promise<SafeApply>;
    update(applyId: number, dto: UpdateApplyDto): Promise<SafeApply>;
    updateCheckStatus(applyId: number, dto: UpdateApplyCheckDto): Promise<SafeApply>;
    updateRemitStatus(applyId: number, dto: UpdateApplyRemitDto): Promise<SafeApply>;
    remove(applyId: number): Promise<void>;
    private ensureUserExists;
    private ensureSufficientBalance;
    private toSafeApply;
    private toMoney;
    private getPublicSelect;
    private getPublicColumns;
}
export {};
