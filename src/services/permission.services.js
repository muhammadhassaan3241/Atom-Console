// PERMISSION_SERVICES

// create 
export const create = async (model, permissionname, body, callback) => {
    try {
        // finding user in db
        const permission = await model.findOne({ where: permissionname });
        (permission !== null)
            ? callback(permission)
            : (async () => {
                await model.create(body);

                callback(permission);
            })();


    } catch (error) {
        throw error
    }
}

// findAll
export const findAll = async (model, callback) => {
    try {
        const permissions = await model.findAll();
        callback(permissions)

    } catch (error) {
        throw error
    }
}

// findOne
export const findOne = async (model, object, callback) => {
    try {
        const permission = await model.findOne({ where: object });

        permission ? callback(permission) : console.log('permission not found');

    } catch (error) {
        throw error
    }
}

// findByIdAndUpdate
export const findByIdAndUpdate = async (model, permissionId, updatedpermission) => {
    try {
        const fields = updatedpermission;

        await model.update(fields, { where: { id: permissionId } });

    } catch (error) {
        throw error
    }
}

// findByIdAndDelete
export const findByIdAndDelete = async (model, permissionId) => {
    try {
        await model.destroy({ where: { id: permissionId } });

    } catch (error) {
        throw error
    }
}


