module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      userID: {
        type: DataTypes.INTEGER,
        allownNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      desc: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      img: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
      },
      type: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
    },
  );

  Event.associate = (models) => {
    Event.belongsTo(models.User, { foreignKey: 'userID', onDelete: 'cascade' });
  };

  return Event;
};
