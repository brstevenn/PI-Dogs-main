const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo de la tabla Dog
  const Dog = sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The name cannot be null"
        },
        len: {
          args: [1, 50],
          msg: "The name can only be from 2 to 50 characters in length"
        }
      }
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The height cannot be null"
        },
        len: {
          args: [1, 50],
          msg: "The height can only be from 2 to 50 characters in length"
        }
      }
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The weight cannot be null"
        },
        len: {
          args: [2, 50],
          msg: "The weight can only be from 2 to 50 characters in length"
        }
      }
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The life span cannot be null"
        },
        len: {
          args: [2, 50],
          msg: "The life span can only be from 2 to 50 characters in length"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The image cannot be null"
        },
        len: {
          args: [2, 255],
          msg: "The image can only be from 2 to 255 characters in length"
        }
      }  
    }
  }, {
    timestamps: false
  });

  // Defino el modelo de la tabla temperament
  const Temperament = sequelize.define('temperament', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The temperament cannot be null"
        },
        len: {
          args: [1, 50],
          msg: "The temperament can only be from 2 to 50 characters in length"
        }
      }
    },
  }, {
    timestamps: false
  });

  const Relation_Temperaments = sequelize.define('Relation_Temperaments', {}, {
    timestamps: false
  })


  Dog.belongsToMany(Temperament, {
    through: 'Relation_Temperaments'
  })
  Temperament.belongsToMany(Dog, {
    through: 'Relation_Temperaments'
  })


};
