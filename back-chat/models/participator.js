'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participator = sequelize.define('Participator', {
    idRoom: DataTypes.INTEGER,
    participator: DataTypes.INTEGER,
    chatRole: DataTypes.STRING
  }, {});
  Participator.associate = function(model) {
    Participator.belongsTo(model.User, {
      foreignKey: 'participator',
      allowNull: false
    }),

    Participator.belongsTo(model.Rooms, {
      foreignKey: 'idRoom',
      allowNull: false
    })
  };
  return Participator;
};