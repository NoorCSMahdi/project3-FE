import React, { useState } from 'react';

function BookingForm() {
  const [bookingData, setBookingData] = useState({
    booking_status: '',
    booking_time: '',
    user: '', // User ID
    car: '', // Car ID
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send the bookingData to the backend
    // You can use an API call or other methods to send the data to your backend server
    console.log(bookingData); // Example: Log the booking data to the console
    // Reset the form after submission if needed
    setBookingData({
      booking_status: '',
      booking_time: '',
      user: '',
      car: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <label htmlFor="booking_status">Booking Status:</label> */}
      <input type="hidden" id="booking_status" name="booking_status" value="Pending"/>

      <label htmlFor="booking_time">Booking Time:</label>
      <input type="datetime-local" id="booking_time" name="booking_time" onChange={handleChange}/>

      <label htmlFor="user">User ID:</label>
      <input type="text" id="user" name="user"  onChange={handleChange}/>

      <label htmlFor="car">Car ID:</label>
      <input type="text" id="car" name="car"  onChange={handleChange}/>

      <input type="submit" value="submit"/>
    </form>
  );
}

export default BookingForm;