import { Actor } from '@/database';
import { ModelAttributes, ModelCreationAttributes } from '@/types';
import { Op } from 'sequelize';

export class ActorService {
  constructor(private readonly actorModel: typeof Actor) {}

  async getAllByName(params: ModelAttributes<Actor>['name'][]) {
    return this.actorModel.findAll({
      where: { name: { [Op.or]: params } },
    });
  }

  async create(actorData: ModelCreationAttributes<Actor>) {
    const { name } = actorData;

    const [actor] = await this.actorModel.findOrCreate({
      where: { name },
      defaults: { name },
    });

    return actor;
  }
}
