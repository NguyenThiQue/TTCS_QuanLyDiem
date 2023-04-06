//file migrations sẽ tự động map dữ liệu vào databse cho chúng ta
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subject', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      statusId: {
        type: Sequelize.STRING
      },
      teacherId: {
        type: Sequelize.INTEGER
      },
      nameSubject: {
        type: Sequelize.STRING
      },
      credits: {
        type: Sequelize.INTEGER
      },
      soTietLyThuyet: {
        type: Sequelize.INTEGER
      },
      soTietTH: {
        type: Sequelize.INTEGER
      }, 
      maLopId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('subject');
  }
};