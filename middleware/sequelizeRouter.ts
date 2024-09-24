import express from 'express';
import { create, read, findByPk, update, destroy } from './sequelize';
import { validateSchema } from './validateSchema';

const sequelizeRouter = (props: any) => {
  const { model, key = 'id', schemas } = props;
  const router = express.Router();

  router.get('/', read({ model }));
  router.get(`/:${model}Id`, findByPk({ model, id: `${model}Id` }));
  router.post('/', validateSchema(schemas.create), create({ model }));
  router.put(`/:${key}`, validateSchema(schemas.update), update({
    model,
    key,
    path: `params.${model}Id`,
  }));
  router.delete(`/:${key}`, destroy({
    model,
    key,
    path: `params.${model}Id`,
  }));

  return router;
};

export default sequelizeRouter;
