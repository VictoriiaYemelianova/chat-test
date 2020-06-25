'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    ban: DataTypes.BOOLEAN,
    reasonBan: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Message, {
      foreignKey: 'idUser',
      allowNull: false
    }),

    User.hasMany(models.Rooms, {
      foreignKey: 'creator',
      allowNull: false
    }),

    User.belongsTo(models.Role, {
      foreignKey: 'role',
      allowNull: false
    }),

    User.hasMany(models.Participator, {
      foreignKey: 'participator',
      allowNull: false
    })
  };
  return User;
};