// There's not much to this
// It's the players SQL table sequelized
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('players', {
       player_ID: {
        type: DataTypes.INTEGER(8).ZEROFILL.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      player_Handle: {
        type: DataTypes.STRING(32),
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
      tableName: 'players'
    });
  };