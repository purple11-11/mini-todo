const TodoModel = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      // column info
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0, // 0 == false
      },
    },
    // table option
    {
      tableName: "todo",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Todo;
};

module.exports = TodoModel;
