'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
    roomName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Rooms.associate = function(models) {
    Rooms.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: false
    })
  };
  return Rooms;
};