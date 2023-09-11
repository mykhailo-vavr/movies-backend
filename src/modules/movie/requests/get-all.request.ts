import { PaginationQuery, TypedReqQuery } from '@/types';
import { OrderEnum } from '@/utils';

type QueryType = Partial<
  {
    actor: string;
    title: string;
    search: string;
    sort: 'id' | 'title' | 'year';
    order: OrderEnum;
  } & PaginationQuery
>;

export type GetAllRequest = TypedReqQuery<QueryType>;
