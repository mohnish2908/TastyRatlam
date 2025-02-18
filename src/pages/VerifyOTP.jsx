import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/operations/authAPI';
import { setToken } from '../slices/userSlice';

const VerifyOTP = () => {
  const { contactNumber, redirectPath } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('OTP must be 6 digits.');
    } else {
      setError('');
      try {
        const response = await dispatch(login({ otp, contactNumber }));
        console.log("response of verify", response);
        if (response.payload.success) {
          dispatch(setToken(response.payload.token));
          // console.log("redirectPath of verifyotp:", redirectPath);
          navigate("/");
        } else {
          setError('Invalid OTP. Please try again.');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Verify OTP
        </h2>
        <label className="block mb-5">
          <span className="text-gray-700 font-medium">OTP:</span>
          <input
            type="text"
            value={otp}
            onChange={handleInputChange}
            placeholder="Enter the OTP"
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
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
