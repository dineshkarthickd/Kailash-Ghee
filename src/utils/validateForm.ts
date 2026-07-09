// @ts-nocheck
export const validateAddressForm = (data) => {
  const errors = {};
  if (!data.name?.trim()) errors.name = "Name is required";
  if (!data.phone?.trim() || !/^\d{10}$/.test(data.phone.replace(/\D/g, ''))) errors.phone = "Valid 10-digit phone number required";
  if (!data.address?.trim()) errors.address = "Address is required";
  if (!data.city?.trim()) errors.city = "City is required";
  if (!data.state?.trim()) errors.state = "State is required";
  if (!data.pincode?.trim() || !/^\d{6}$/.test(data.pincode)) errors.pincode = "Valid 6-digit pincode required";
  
  return errors;
};
