'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Rooms', 'userId', 'creator')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Rooms', 'creator', 'userId')
  }
};
