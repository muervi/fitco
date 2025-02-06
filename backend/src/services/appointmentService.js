const { Appointment } = require('../models');
const moment = require('moment');

exports.getAvailableAppointments = async () => {
  try {
    const now = moment();
    const appointments = await Appointment.findAll({
      where: {
        date: { $gt: now.format('YYYY-MM-DD HH:mm:ss') },
        status: 'available'
      }
    });
    return appointments;
  } catch (err) {
    throw new Error('Error while getting appointments');
  }
};

exports.createAppointment = async (date, userId) => {
  try {
    const appointment = await Appointment.create({
      date,
      userId,
      status: 'booked'
    });
    return appointment;
  } catch (err) {
    throw new Error('Error while creating the appointment');
  }
};

exports.cancelAppointment = async (id) => {
  try {
    const appointment = await Appointment.findByPk(id);
    if (appointment && appointment.status === 'booked') {
      appointment.status = 'canceled';
      await appointment.save();
      return true;
    }
    return false;
  } catch (err) {
    throw new Error('Error while canceling the appoitment');
  }
};
