import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/')
      .then(response => setMessage(response.data))
      .catch(error => console.error('Error fetching message:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/book-slot', { name, email, date, time });
      alert('Slot booked successfully!');
      setName('');
      setEmail('');
      setDate('');
      setTime('');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed!');
    }
  };

  return (
    <div>
      <h1>{message}</h1>
      <h2>Book a Therapy Slot</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        <button type="submit">Book Slot</button>
      </form>
    </div>
  );
}

export default App;
