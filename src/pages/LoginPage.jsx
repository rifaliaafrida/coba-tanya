// src/pages/LoginPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import rabbitImage from '../assets/image/rabbit.png'; // Import the image

function LoginPage() {
  return (
    <div className="login-page">
      <div className="form__login">
        <LoginForm />
        <p className="register__link">
          Dont have an account?
          {' '}
          <Link to="/register">Register here</Link>

        </p>

      </div>
      <div className="maskot">
        <img className="icon__login" src={rabbitImage} alt="Rabbit Icon" />
        {' '}
        {/* Use the imported image */}
      </div>
    </div>
  );
}

export default LoginPage;
