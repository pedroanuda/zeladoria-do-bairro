import db from '../common/db.js';
import { Bairro } from '../common/models/index.js';

function cloneWithRelations(instance, relations = {}) {
  if (!instance) return null;
  return Object.assign(
    Object.create(Object.getPrototypeOf(instance)),
    instance,
    relations,
  );
}

export const bairroService = {
  getAll() {
    return db.getAllFrom('bairros').map((bairro) => cloneWithRelations(bairro));
  },

  getById(id) {
    const bairro = db.getById('bairros', Number(id));
    return cloneWithRelations(bairro);
  },

  create(data) {
    const novoBairro = data instanceof Bairro ? data : new Bairro(data);
    return db.writeEntity('bairros', novoBairro);
  },
};

export default bairroService;
