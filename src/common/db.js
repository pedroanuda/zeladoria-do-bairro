import { mockValues } from './mockData.js';

class Database {
  #idSequences;

  constructor(initValues) {
    this.values = initValues ?? {};
    this._defineIdSequences(initValues ?? {});
  }

  getAllFrom(entity) {
    return this.values[entity] ?? [];
  }

  getById(entity, id) {
    return this.values[entity]?.find((value) => value.id === id);
  }

  getBy(entity, predicate) {
    return this.values[entity]?.filter(predicate) ?? [];
  }

  writeEntity(entity, newValue) {
    if (!this.values[entity]) this.values[entity] = [];

    if (!newValue.id) {
      const nextId = this.#idSequences[entity] ?? 1;
      this.#idSequences[entity] = nextId + 1;

      newValue.id = nextId;
      this.values[entity].push(newValue);
      return newValue;
    }

    const foundValueIndex = this.values[entity].findIndex(
      (value) => value.id === newValue.id,
    );
    if (foundValueIndex === -1) {
      const currentSeq = this.#idSequences[entity] ?? 1;
      if (newValue.id >= currentSeq) {
        this.#idSequences[entity] = newValue.id + 1;
      }

      this.values[entity].push(newValue);
      this.values[entity].sort((a, b) => a.id - b.id);
      return newValue;
    }

    this.values[entity][foundValueIndex] = newValue;
    return newValue;
  }

  _defineIdSequences(initValues) {
    this.#idSequences = {};
    for (const key of Object.keys(initValues)) {
      const maxId =
        initValues[key]?.reduce(
          (max, item) => (item.id > max ? item.id : max),
          0,
        ) ?? 0;
      this.#idSequences[key] = maxId + 1;
    }
  }
}

const db = new Database(mockValues);
export default db;
