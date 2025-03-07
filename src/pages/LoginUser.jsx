import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP } from '../services/operations/authAPI';
import { setContactNumber } from '../slices/userSlice';
import logo from '../assets/Logo_no_bg.png';

const LoginUser = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.token) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMobileNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) {
      setError('Mobile number must be 10 digits.');
    } else {
      setError('');
      dispatch(setContactNumber(mobileNumber));
      dispatch(sendOTP({ contactNumber: mobileNumber }, navigate));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </div>

        {/* Login Form */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Login to Your Account
        </h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Enter your mobile number to receive an OTP
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Mobile Number:</label>
            <input
              type="text"
              value={mobileNumber}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              className={`mt-2 w-full px-4 py-2 border ${
                error ? 'border-red-500' : 'border-gray-300'
              } rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-black to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-black transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Get OTP
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default LoginUser;
