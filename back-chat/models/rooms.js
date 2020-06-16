'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
    roomName: DataTypes.STRING
  }, {});
  Rooms.associate = function(models) {
    Rooms.hasMany(models.Message, {
      foreignKey: 'roomId',
      allowNull: false
    })
  };
  return Rooms;
};