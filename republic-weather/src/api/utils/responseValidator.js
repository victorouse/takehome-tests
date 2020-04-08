const validateResponse = (res) => {
  switch (res.status) {
    case 404:
      throw new Error('404: Not found');

    default:
      if (res.status !== 200) {
        throw new Error(`${res.status} error`);
      }

      return res.json();
  }
};

export default validateResponse;
