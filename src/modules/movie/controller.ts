import { Request, Response } from '@/types';
import { StatusCodesEnum } from '@/utils';
import { CreateRequest, DeleteRequest, GetAllRequest, GetByPkRequest, UpdateRequest } from './requests';
import { MovieService } from './service';

export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  async create({ body }: CreateRequest, res: Response) {
    const movie = await this.movieService.create(body);
    res.status(StatusCodesEnum.OK).json({ data: movie });
  }

  async delete({ params }: DeleteRequest, res: Response) {
    await this.movieService.delete(params.id);
    res.status(StatusCodesEnum.OK).json();
  }

  async update({ body, params }: UpdateRequest, res: Response) {
    const movie = await this.movieService.update(params.id, body);
    res.status(StatusCodesEnum.OK).json({ data: movie });
  }

  async getByPk({ params }: GetByPkRequest, res: Response) {
    const movie = await this.movieService.getByPk(params.id);
    res.status(StatusCodesEnum.OK).json({ data: movie });
  }

  async getAll({ query }: GetAllRequest, res: Response) {
    const { rows, count } = await this.movieService.getAll(query);
    res.status(StatusCodesEnum.OK).json({ data: rows, meta: { total: count } });
  }

  async import(req: Request, res: Response) {
    const { rows, count } = await this.movieService.import(req.headers, req.pipe.bind(req));
    res.status(StatusCodesEnum.OK).json({ data: rows, meta: { imported: count } });
  }
}
