import moment from "moment";

export const getDateInfo = (givenDate) => {
  const selectedMoment = moment(givenDate, "YYYY-MM-DD");
  return {
    year: selectedMoment.year(),
    month: selectedMoment.month(),
    date: selectedMoment.date(),
  };
};

export const getInitialDate = (selectedDate, initialDate, hasChanged) => {
  if (hasChanged) {
    return selectedDate;
  }
  return initialDate || moment().format("YYYY-MM-DD");
};

export const getYearArray = (selectedDate) => {
  const selectedMoment = moment(selectedDate, "YYYY-MM-DD");
  const selectedYear = selectedMoment.year();
  const diff = (selectedYear % 20) - 1;
  if (diff === -1) {
    return Array.from({ length: 20 }, (_, i) => selectedYear - 20 + 1 + i);
  }
  return Array.from({ length: 20 }, (_, i) => selectedYear - diff + i);
};

export const dateProp = (props, propName, componentName) => {
  if (!props[propName]) {
    return;
  }
  if (!/\d{4}\-\d{2}-\d{2}/.test(props[propName])) {
    return new Error("Invalid prop `" + propName + "` supplied to" + " `" + componentName + "`. Validation failed.");
  }
};
