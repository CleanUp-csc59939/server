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
        type: DataTypes.BLOB,
      },
      number: {
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
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