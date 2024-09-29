import React, { useState } from 'react';
import './userSignup.css';
import toast from 'react-hot-toast';
// import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const UserSignup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  

  // Password validation state
  const [validation, setValidation] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isValidLength: false,
  });

  
  const navigate = useNavigate();

  // Handle password validation
  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    setValidation({
      hasUpperCase: /[A-Z]/.test(inputPassword),
      hasLowerCase: /[a-z]/.test(inputPassword),
      hasNumber: /[0-9]/.test(inputPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(inputPassword),
      isValidLength: inputPassword.length >= 8,
    });
  };

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Password and gender validations
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!gender) {
      toast.error("Please select gender");
      return;
    }
    if (!validation.isValidLength || !validation.hasUpperCase || !validation.hasLowerCase || !validation.hasNumber || !validation.hasSpecialChar) {
      toast.error("Password does not meet the required criteria");
      return;
    }

    // Handle sign-up logic
    try {
      const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: name,
          Username: username,
          Password: password,
          gender: gender,
          Confirmpassword: confirmPassword,
        }),
      });

      const data = await response.json();
      console.log(data.user);
      if (data.error) {
        toast.error(data.error);
        return;
      }
      
      localStorage.setItem('authuser-chat', data.user);

     
      toast.success("Signup successful!");
      navigate('/home');
     
      
    } catch (error) {
      toast.error(`Signup failed: ${error.message}`);
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>User Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password input and validation */}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
          <ul>
            <li style={{ color: validation.hasUpperCase ? "green" : "red" }}>
              {validation.hasUpperCase ? "✔" : "✘"} At least one uppercase letter
            </li>
            <li style={{ color: validation.hasLowerCase ? "green" : "red" }}>
              {validation.hasLowerCase ? "✔" : "✘"} At least one lowercase letter
            </li>
            <li style={{ color: validation.hasNumber ? "green" : "red" }}>
              {validation.hasNumber ? "✔" : "✘"} At least one number
            </li>
            <li style={{ color: validation.hasSpecialChar ? "green" : "red" }}>
              {validation.hasSpecialChar ? "✔" : "✘"} At least one special character
            </li>
            <li style={{ color: validation.isValidLength ? "green" : "red" }}>
              {validation.isValidLength ? "✔" : "✘"} At least 8 characters long
            </li>
          </ul>
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group gender-group">
          <label>Gender</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                value="Male"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                value="Other"
                checked={gender === 'Other'}
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>
        </div>

        <button type="submit">Sign Up</button>
      </form>
      
      <div className="login-link">
        <p>Already have an account? <a href="/user/login">Login</a></p>
      </div>
    </div>
  );
};

export default UserSignup;
