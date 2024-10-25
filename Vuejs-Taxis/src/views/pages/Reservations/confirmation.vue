<template>
    <div class="reservation-confirmed">
      <div class="confirmation-card">
        <h1>Reservation Confirmed</h1>
        <p>Your reservation has been successfully completed!</p>
        </div></div>

      </template>

<style scoped>
.reservation-confirmed {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
}
.confirmation-card {
  max-width: 600px;
  padding: 20px;
  text-align: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.confirmation-card h1 {
  color: #4caf50;
}
.reservation-details {
  margin-top: 20px;
  text-align: left;
}
.reservation-details p {
  margin: 8px 0;
}
.btn-back-home {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
.btn-back-home:hover {
  background-color: #388e3c;
}
</style>