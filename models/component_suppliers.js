'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Component_Suppliers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Component_Suppliers.init({
    id_supplier: DataTypes.INTEGER,
    id_component: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Component_Suppliers',
  });
  return Component_Suppliers;
};