import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h3>Your Appointments</h3>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.date} - {appointment.name}
            <button onClick={() => handleCancel(appointment.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const handleCancel = async (id) => {
  try {
    await api.delete(`/appointments/${id}`);
    alert('Appointment canceled');

  } catch (error) {
    console.error('Error canceling appointment:', error);
  }
};

export default AppointmentList;
