module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
  }, {});

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Appointment;
};
