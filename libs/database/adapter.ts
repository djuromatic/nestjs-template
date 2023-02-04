import { Repository } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';
import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

export type Paginated<T> = {
  data: T[];
  count: number;
};

export interface PaginatedQuery {
  skip: number;
  take: number;
  sort: string;
  order: 'ASC' | 'DESC';
  [key: string]: any;
}

export abstract class BaseRepository<
  T extends CustomBaseEntity,
> extends Repository<T> {
  constructor(private repository: Repository<T>) {
    super(repository.target, repository.manager);
  }

  async paginated(query: Partial<PaginatedQuery>): Promise<Paginated<T>> {
    const {
      skip = 0,
      take = 10,
      sort = 'createdAt',
      order = 'DESC',
      ...search
    } = query;

    const [results, total] = await this.createQueryBuilder()
      .where(search)
      .orderBy(
        sort.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`),
        order,
      ) // apperently type "ASC" | "DESC" is not a string
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return {
      data: results,
      count: total,
    };
  }
}

export abstract class CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Expose()
  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @Expose()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}