export const extractAndValidateAddress = (address, type) => {
  const requiredFields = [
    "fullName",
    "phone",
    "addressLine1",
    "city",
    "state",
    "postalCode",
    "country",
  ];

  const missingFields = requiredFields.filter((field) => !address[field]);

  if (missingFields.length > 0) {
    throw new CustomError(
      `${type} Address is missing fields: ${missingFields.join(", ")}`,
      400
    );
  }

  return {
    fullName: address.fullName,
    phone: address.phone,
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2 || "",
    city: address.city,
    state: address.state,
    postalCode: address.postalCode,
    country: address.country,
  };
};
