'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacherfaculty extends Model {
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
  Teacherfaculty.init({
    teacherId: DataTypes.INTEGER,
    facultyId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Teacherfaculty',
  });
  return Teacherfaculty;
};