const stingObjWithComma = (param) => {
  if (typeof param === 'object') {
    for (const [key, value] of Object.entries(param)) {
      if (Number(param) !== NaN) {
        if (!String(value).includes('-'))
          param[key] = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }
    return param;
  } else {
    if (Number(param) !== NaN) {
      return param.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      console.warn('parameter is not number check parameter');
      return param;
    }
  }
};

export default stingObjWithComma;
