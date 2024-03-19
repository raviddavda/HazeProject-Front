const normalizeGameDataFromServer = (inputsValue) => {
  return {
    title: inputsValue.title,
    description: inputsValue.description,
    email: inputsValue.email,
    category: inputsValue.category,
    url: inputsValue.image.url,
    alt: inputsValue.image.alt,
  };
};

export default normalizeGameDataFromServer;
