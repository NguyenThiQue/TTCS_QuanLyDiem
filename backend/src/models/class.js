'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
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
  Class.init({
    tenLop: DataTypes.STRING,
    maLop: DataTypes.STRING,
    gvId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};