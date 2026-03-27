import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { PaginatedDto } from '../../responses';
import { CreateUserDto, ListUserDto, UpdateUserDto, UpdateUserStatusDto } from './dto/user.dto';
type SafeUser = Omit<User, 'password'>;
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findPaginated(query: ListUserDto): Promise<PaginatedDto<SafeUser>>;
    findById(userId: number): Promise<SafeUser>;
    create(dto: CreateUserDto): Promise<SafeUser>;
    update(userId: number, dto: UpdateUserDto): Promise<SafeUser>;
    patchStatus(userId: number, dto: UpdateUserStatusDto): Promise<SafeUser>;
    remove(userId: number): Promise<void>;
    private assertUniqueFields;
    private toSafeUser;
    private getPublicSelect;
    private getPublicColumns;
}
export {};
