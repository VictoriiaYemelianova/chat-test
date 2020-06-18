'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Participators', ['idRoom'], {
      type: 'foreign key',
      name: 'custom_fkey_participators_room',
      references: {
        table: 'Rooms',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
  
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Participators', 'custom_fkey_participators_room');
  }
};
