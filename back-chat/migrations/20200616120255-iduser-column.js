'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Rooms',
      'userId',
      Sequelize.INTEGER

    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Rooms', 'userId')
  }
};
