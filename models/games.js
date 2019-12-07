module.exports = function(sequelize, DataTypes) {
    return sequelize.define('games', {
        game_ID: {
        type: DataTypes.INTEGER(8).ZEROFILL.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      game_Name: {
        type: DataTypes.STRING(32),
        allowNull: false
      },
      challonge_game_id: {
        type: DataTypes.INTEGER(8).UNSIGNED,
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
      tableName: 'games'
    });
  };