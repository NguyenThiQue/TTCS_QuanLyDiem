'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //

    //Định danh các mối quan hệ trong database
    static associate(models) {
      // define association here
    }
  }
  Subject.init({
    statusId: DataTypes.STRING,
    teacherId: DataTypes.INTEGER,
    nameSubject: DataTypes.STRING,
    credits: DataTypes.INTEGER,
    soTietLyThuyet: DataTypes.INTEGER,
    soTietTH: DataTypes.INTEGER,
    maLopId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};