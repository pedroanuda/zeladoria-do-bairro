const mockValues = {
  usuarios: [],
  bairros: [],
  localizacoes: [],
};

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

      const savedValue = { id: nextId, ...newValue };
      this.values[entity].push(savedValue);
      return;
    }

    const foundValueIndex = this.values[entity].findIndex(
      (value) => value.id === newValue.id,
    );
    if (foundValueIndex === -1) {
      if (newValue.id < this.#idSequences[entity])
        this.#idSequences[entity] = newValue.id + 1;

      this.values[entity].push(newValue);
      this.values[entity].sort((a, b) => a.id - b.id);
      return;
    }

    this.values[entity][foundValueIndex] = newValue;
  }

  _defineIdSequences(initValues) {
    this.#idSequences = {};
    for (const key in Object.keys(initValues)) {
      this.#idSequences[key] = (initValues[key]?.at(-1)?.id ?? 0) + 1;
    }
  }
}

const db = new Database(mockValues);
export default db;
