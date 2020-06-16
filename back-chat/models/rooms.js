'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
    roomName: DataTypes.STRING
  }, {});
  Rooms.associate = function(models) {
    // associations can be defined here
  };
  return Rooms;
};