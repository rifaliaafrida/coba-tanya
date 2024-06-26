// src/pages/RegisterPage.js
import React from 'react';
import RegisterForm from '../components/RegisterForm';
import rabbitImage from '../assets/image/rabbit.png'; // Import the image

function RegisterPage() {
  return (
    <div className="login-page">
      <div className="form__login">
        <RegisterForm />
      </div>
      <div className="maskot">
        <img className="icon__login" src={rabbitImage} alt="Rabbit Icon" />
        {' '}
        {/* Use the imported image */}
      </div>
    </div>
  );
}

export default RegisterPage;
