// There's not much to this
// It's the placements SQL table sequelized
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('placements', {
      placement_ID: {
        type: DataTypes.INTEGER(8).ZEROFILL.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      semester_ID: {
        type: DataTypes.INTEGER(8).ZEROFILL.UNSIGNED,
        allowNull: false,
        references: {
          model: 'semesters',
          key: 'semester_ID'
        }
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
      tour_1: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_2: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_3: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_4: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_5: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_6: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_7: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_8: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_9: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_10: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_11: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_12: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_13: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_14: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_15: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      tour_16: {
        type: DataTypes.INTEGER(3),
        allowNull: true
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
      tableName: 'placements'
    });
  };