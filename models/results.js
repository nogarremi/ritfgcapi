module.exports = function(sequelize, DataTypes) {
    return sequelize.define('results', {
       results_ID: {
        type: DataTypes.INTEGER(8).ZEROFILL.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      placement_ID: {
        type: DataTypes.INTEGER(8).ZEROFILL.UNSIGNED,
        allowNull: false,
        references: {
          model: 'placement',
          key: 'placement_ID'
        }
      },
      ranbat_score: {
        type: DataTypes.INTEGER(8).ZEROFILL.UNSIGNED,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      tableName: 'results'
    });
  };