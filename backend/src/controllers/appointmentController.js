const appointmentService = require('../services/appointmentService');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getAvailableAppointments();
    return res.json(appointments);
  } catch (err) {
    return res.status(500).json({ message: 'Error in the server', error: err.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { date, userId } = req.body;
    const appointment = await appointmentService.createAppointment(date, userId);
    return res.status(201).json(appointment);
  } catch (err) {
    return res.status(500).json({ message: 'Error in the server', error: err.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const canceled = await appointmentService.cancelAppointment(id);
    if (canceled) {
      return res.status(200).json({ message: 'Appointment canceledsuccessfully ' });
    } else {
      return res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error in the server', error: err.message });
  }
};
