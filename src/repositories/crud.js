class CrudRepository {
  async findAll(Model, filteredQuery) {
    const data = await Model.findAll(filteredQuery);
    return data;
  }

  async findOne(Model, filteredQuery) {
    const data = await Model.findOne(filteredQuery);
    return data;
  }

  async create(Model, filteredQuery) {
    const data = await Model.create(filteredQuery);
    return data;
  }

  async update(entity, filteredQuery) {
    const data = await entity.update(filteredQuery);
    return data;
  }

  async destroy(Model, filteredQuery) {
    const data = await Model.destroy(filteredQuery);
    return data;
  }

  async setRole(entity, role) {
    const assignedRole = await entity.setRole(role);
    return assignedRole;
  }

  async setPermissions(entity, permissions) {
    const assignedPermissions = await entity.setPermissions(permissions);
    return assignedPermissions;
  }
}

module.exports = CrudRepository;
