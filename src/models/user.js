const { development } = require("../config/config");

const { DataTypes, Sequelize } = require("sequelize");
const mysql2 = require("mysql2");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize(
  development.dbname,
  development.username,
  development.password,
  {
    host: development.host,
    dialect: "mysql",
    dialectModule: mysql2,
  }
);

const User = sequelize.define(
  "User",
  {
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
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    subscription: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const saltRounds = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashPassword;
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const saltRounds = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(user.password, saltRounds);
          user.password = hashPassword;
        }
      },
    },
  }
);

const Role = sequelize.define("Role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Permission = sequelize.define("Permission", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.belongsTo(Role, { through: "UserRole" });

Role.belongsToMany(Permission, { through: "RolePermission" });
Permission.belongsToMany(Role, { through: "RolePermission" });

sequelize
  .sync({ force: false })
  .then((res) => {
    console.log("model synchronized succesfully");
  })
  .catch((err) => {
    console.error("model synchroniation failed");
  });

module.exports = {
  User,
  Role,
  Permission,
  sequelize,
};
