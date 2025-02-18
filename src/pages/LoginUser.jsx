import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP } from '../services/operations/authAPI';
import { setRedirectPath, setContactNumber } from '../slices/userSlice';

const LoginUser = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const redirectPath = useSelector((state) => state.auth?.redirectPath || '/');

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>
        <label className="block mb-5">
          <span className="text-gray-700 font-medium">Mobile Number:</span>
          <input
            type="text"
            value={mobileNumber}
            onChange={handleInputChange}
            placeholder="Enter your mobile number"
            className={`mt-2 block w-full px-4 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800`}
          />
        </label>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg shadow hover:bg-indigo-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        >
          Get OTP
        </button>
      </form>
    </div>
  );
};

export default LoginUser;
