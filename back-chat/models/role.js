'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role: DataTypes.INTEGER
  }, {});
  Role.associate = function(models) {
    Role.hasMany(models.User, {
      foreignKey: 'role',
      allowNull: false
    });  
  };
  return Role;
};