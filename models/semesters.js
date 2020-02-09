// There's not much to this
// It's the semesters SQL table sequelized
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('semesters', {
       semester_ID: {
        type: DataTypes.INTEGER(8).ZEROFILL.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      semesterNum: {
        type: DataTypes.CHAR(4),
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
      tableName: 'semesters'
    });
  };