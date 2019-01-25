module.exports = function(sequelize, DataTypes) {
    return sequelize.define('results', {
       results_ID: {
        type: DataTypes.INTEGER(8).ZEROFILL.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      game_ID: {
        type: DataTypes.INTEGER(8).ZEROFILL.UNSIGNED,
        allowNull: false,
        references: {
          model: 'games',
          key: 'game_ID'
        }
      },
      player_ID: {
        type: DataTypes.INTEGER(8).ZEROFILL.UNSIGNED,
        allowNull: false,
        references: {
          model: 'players',
          key: 'player_ID'
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