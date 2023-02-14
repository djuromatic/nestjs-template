import { Repository } from 'typeorm';
import { Expose } from 'class-transformer';
import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsIn, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export type Paginated<T> = {
  data: T[];
  count: number;
};

export class PaginatedQuery {
  @IsOptional()
  @IsNumberString()
  skip: number;

  @IsOptional()
  @IsNumberString()
  take: number;

  @IsOptional()
  @IsNotEmpty()
  sort: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(['ASC', 'DESC'])
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
        //if sort is camelCase, convert it to snake_case
        //orderBy is not supporting camelCase
        sort.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`),
        order,
      )
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

export abstract class BaseDto {
  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
