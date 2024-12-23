function setNullFields({ expectedFields = [], obj = {} }) {
  const resultObj = {};
  const missingFields = [];
  expectedFields.forEach((field) => {
    if (obj[field]) {
      resultObj[field] = obj[field];
    } else {
      resultObj[field] = null;
      missingFields.push(field);
    }
  });
  return { ...resultObj, missingFields };
}

module.exports = { setNullFields };
