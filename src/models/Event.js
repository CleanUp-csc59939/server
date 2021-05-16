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
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      date: {
        type: DataTypes.DATE,
      },
      type: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      registered: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
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
