const normalizeGameData = (inputsValue) => {
  return {
    title: inputsValue.title,
    description: inputsValue.description,
    email: inputsValue.email,
    category: inputsValue.category,
    image: {
      url: inputsValue.url,
      alt: inputsValue.alt,
    },
  };
};

export default normalizeGameData;
