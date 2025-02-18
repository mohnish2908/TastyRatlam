import React, { useState } from "react";

const statesAndUTs = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
  "Ladakh",
  "Jammu and Kashmir",
];

const ShippingDetails = ({ onShippingChange }) => {
  // Local state for shipping details
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    address: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });

  // State for error messages
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear any existing error for the current field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    // Update the shipping data
    const updatedData = {
      ...shippingData,
      [name]: value,
    };
    setShippingData(updatedData);

    // Notify parent of the change
    onShippingChange(updatedData);
  };

  // Handle form validation
  const validate = () => {
    const newErrors = {};

    // Validate pincode length
    if (shippingData.pincode.length !== 6) {
      newErrors.pincode = "Pincode must be exactly 6 digits long.";
    }

    // Set errors in state
    setErrors(newErrors);

    // Return true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission (optional)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate before submitting
    if (validate()) {
      console.log("Shipping Data is valid:", shippingData);
    } else {
      console.log("Shipping Data has errors:", errors);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Shipping Details</h3>

      {/* First Name */}
      <div className="flex flex-col">
        <label className="mb-1">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={shippingData.firstName}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </div>

      {/* Last Name */}
      <div className="flex flex-col">
        <label className="mb-1">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={shippingData.lastName}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </div>

      {/* Contact Number */}
      <div className="flex flex-col">
        <label className="mb-1">Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={shippingData.contactNumber}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </div>
      {/* Email */}
      <div className="flex flex-col">
        <label className="mb-1">Email:</label>
        <input
          type="email"
          name="email"
          value={shippingData.email}
          onChange={handleChange}
          required
          className={`border p-2 rounded ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Address */}
      <div className="flex flex-col">
        <label className="mb-1">Address:</label>
        <input
          type="text"
          name="address"
          value={shippingData.address}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </div>

      {/* Landmark (Optional) */}
      <div className="flex flex-col">
        <label className="mb-1">Landmark (Optional):</label>
        <input
          type="text"
          name="landmark"
          value={shippingData.landmark}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      {/* Pincode */}
      <div className="flex flex-col">
        <label className="mb-1">Pincode:</label>
        <input
          type="text"
          name="pincode"
          value={shippingData.pincode}
          onChange={handleChange}
          required
          maxLength="6"
          minLength="6"
          className={`border p-2 rounded ${
            errors.pincode ? "border-red-500" : ""
          }`}
        />
        {errors.pincode && (
          <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
        )}
      </div>

      {/* City */}
      <div className="flex flex-col">
        <label className="mb-1">City:</label>
        <input
          type="text"
          name="city"
          value={shippingData.city}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </div>

      {/* State */}
      <div className="flex flex-col">
        <label className="mb-1">State:</label>
        <select
          name="state"
          value={shippingData.state}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Select State</option>
          {statesAndUTs.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button (Optional) */}
      {/* <button
        onClick={handleSubmit}
        className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
      >
        Save Shipping Details
      </button> */}
    </div>
  );
};

export default ShippingDetails;
