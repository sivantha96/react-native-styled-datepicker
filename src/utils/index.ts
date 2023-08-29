import moment from 'moment';

export const getDateInfo = (givenDate: string) => {
  const selectedMoment = moment(givenDate, 'YYYY-MM-DD');
  return {
    year: selectedMoment.year(),
    month: selectedMoment.month(),
    date: selectedMoment.date(),
  };
};

export const getInitialDate = ({
  selectedDate,
  initialDate,
  hasChanged,
}: {
  selectedDate: string;
  initialDate?: string;
  hasChanged: boolean;
}) => {
  if (hasChanged) {
    return selectedDate;
  }
  return initialDate ?? moment().format('YYYY-MM-DD');
};

export const getYearArray = (selectedDate: string) => {
  const selectedMoment = moment(selectedDate, 'YYYY-MM-DD');
  const selectedYear = selectedMoment.year();
  const diff = (selectedYear % 20) - 1;
  if (diff === -1) {
    return Array.from({ length: 20 }, (_, i) => selectedYear - 20 + 1 + i);
  }
  return Array.from({ length: 20 }, (_, i) => selectedYear - diff + i);
};
