'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Messages',
      'path',
      Sequelize.STRING

    )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Messages', 'path')
  }
};
