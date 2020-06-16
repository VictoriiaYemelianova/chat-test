'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
    roomName: DataTypes.STRING
  }, {});
  Rooms.associate = function(models) {
    Rooms.belongsTo(models.Users, {
      foreignKey: 'userId',
      allowNull: false
    })
  };
  return Rooms;
};