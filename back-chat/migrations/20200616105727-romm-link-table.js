'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Messages', ['roomId'], {
      type: 'foreign key',
      name: 'custom_fkey_rooms',
      references: { //Required field
        table: 'Rooms',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
  
    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Messages', 'custom_fkey_rooms')
  }
};
