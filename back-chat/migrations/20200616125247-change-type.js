'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Users',
      'role',
      Sequelize.INTEGER
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Usere',
      'role',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  }
};
