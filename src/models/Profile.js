module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allownNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      bio: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      img: {
        type: DataTypes.STRING,
        defaultValue: 'https://res.cloudinary.com/cleanup/image/upload/v1621121500/download_remvsp.png',
      },
      number: {
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
      },
      events: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
    },
    {
      freezeTableName: true,
    },
  );

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, { foreignKey: 'userID', onDelete: 'cascade' });
  };

  return Profile;
};
