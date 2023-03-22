// packages
import { ARRAY, DataTypes, Sequelize } from "sequelize";
import mysql2 from "mysql2";
import bcrypt from "bcrypt";

// modules
import { DBHOST, DBNAME, DBPASS, DBUSER } from "../config/db.credentials.js";

// db instance 
export const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS,
    {
        host: DBHOST,
        dialect: "mysql",
        dialectModule: mysql2
    })

// User Model
export const User = sequelize.define("User", {
    reseller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    parentkey: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    subscription_type: {
        type: DataTypes.STRING,
        defaultValue: "",
    }

}, {
    hooks: {
        beforeCreate: async (user) => {
            const saltRounds = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(user.password, saltRounds)
            user.password = hashPassword;
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const saltRounds = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(user.password, saltRounds)
                user.password = hashPassword;
            }
        },
    }
})

// Role Model
export const Role = sequelize.define("Role", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

// Permission Model
export const Permission = sequelize.define('Permission', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// defining many to one relation between user and role
User.belongsTo(Role, { through: "UserRole" });

// // defining many to many relation between roles and permissions
// User.belongsToMany(Permission, { through: "UserPermission" });
// Permission.belongsToMany(User, { through: "UserPermission" });

// defining many to many relation between roles and permissions
Role.belongsToMany(Permission, { through: "RolePermission" });
Permission.belongsToMany(Role, { through: "RolePermission" });

// // defining many to many relation between roles and users
// User.belongsToMany(Role, { through: "UserRole" });
// Role.belongsToMany(User, { through: "UserRole" });

// synchronizing tables
sequelize.sync({ force: false })
    .then((res) => { console.log("model synchronized succesfully") })
    .catch((err) => { console.error("model synchroniation failed"); })
