'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    path: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.User, {
      foreignKey: 'idUser',
      allowNull: false
    })
  };
  return Message;
};