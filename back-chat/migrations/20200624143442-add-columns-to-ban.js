'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'ban',
        Sequelize.BOOLEAN
      ),
      queryInterface.addColumn(
        'Users',
        'reasonBan',
        Sequelize.STRING
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'ban'),
      queryInterface.removeColumn('Users', 'reasonBan')
    ])
  }
};
