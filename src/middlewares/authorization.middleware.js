// authorization middleware function
export const authorizationMiddleware = async (request, response, next) => {
    try {
        const role = request.user.Role.name;

        (role === "Admin")
            ? next()
            : response.status(403).send({
                status: "0",
                message: "Unauthorized Gateway"
            });

    } catch (error) {
        return response.status(500).send({
            message: "Something Went Wrong",
        })
    }
}

export const authorizedMiddleware = async (request, response, next) => {
    try {
        const userPermission = request.user.Role.Permissions.map((perm) => { return perm.name });
        const path = request.path;
        const feature = path.split("/")[1];
        const crudOperation = path.split("/")[2];
        const permissionName = `${crudOperation} ${feature}`
        const hasRequiredPermission = userPermission.includes(permissionName);
        if (hasRequiredPermission === true && path.includes(crudOperation)) {
            next()
        } else {
            return response.status(403).send({
                status: "0",
                message: "Unauthorized Gateway"
            });
        }

    } catch (error) {
        return response.status(500).send({
            message: "Something Went Wrong"
        });
    }
};
