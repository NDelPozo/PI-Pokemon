const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
 
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    speed: {
      type: DataTypes.INTEGER,  
      allowNull: true,
      defaultValue: null
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    custom: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
  });
    
};
