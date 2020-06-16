'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Message, {
      foreignKey: 'idUser',
      allowNull: false
    }),

    User.hasMany(models.Rooms, {
      foreignKey: 'userId',
      allowNull: false
    })
  };
  return User;
};