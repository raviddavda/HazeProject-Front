const normalizeDataFromServer = (inputsValue) => {
  return {
    first: inputsValue.name.first,
    middle: inputsValue.name.middle,
    last: inputsValue.name.last,
    phone: inputsValue.phone,
    email: inputsValue.email,
    password: inputsValue.password,
    url: inputsValue.image.url,
    alt: inputsValue.image.alt,
    state: inputsValue.address.state,
    country: inputsValue.address.country,
    city: inputsValue.address.city,
    street: inputsValue.address.street,
    houseNumber: inputsValue.address.houseNumber,
    zip: inputsValue.address.zip,
    isBusiness: inputsValue.isBusiness,
  };
};

export default normalizeDataFromServer;
