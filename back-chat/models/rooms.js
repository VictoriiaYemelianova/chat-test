'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
    roomName: DataTypes.STRING,
    creator: DataTypes.INTEGER
  }, {});
  Rooms.associate = function(models) {
    Rooms.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: false
    }),

    Rooms.hasMany(models.Participator, {
      foreignKey: 'idRoom',
      allowNull: false
    })
  };
  return Rooms;
};