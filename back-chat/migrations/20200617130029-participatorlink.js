'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Participators', ['participator'], {
      type: 'foreign key',
      name: 'custom_fkey_participators',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
  
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Participators', 'custom_fkey_participators');
  }
};
