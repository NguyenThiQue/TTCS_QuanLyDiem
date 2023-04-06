'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Accounts', [{
      username: 'Que',
      password: '123456',
      der: '0',
      role: 'ROLE',
      status: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
