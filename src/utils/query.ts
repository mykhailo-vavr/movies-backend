import { Op } from 'sequelize';

export enum OrderEnum {
  DESC = 'DESC',
  ASC = 'ASC',
}

export const generatePaginationCondition = ({
  limit = 20,
  offset = 0,
}: {
  limit?: number | string;
  offset?: number | string;
}) => ({
  limit: +limit,
  offset: +offset,
});

export const likeOperator = (value: string | undefined) => ({ [Op.like]: `%${value || ''}%` });
