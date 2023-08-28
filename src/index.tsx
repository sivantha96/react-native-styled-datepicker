import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type TextStyle,
  type ViewStyle,
  type ImageStyle,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { Images } from './assets';
import { CALENDAR_STATES, MONTHS } from './constants';
import { getDateInfo, getInitialDate, getYearArray } from './utils';

type DatePickerProps = {
  initialViewDate: string;
  initialSelectedDate?: string;
  minDate?: string;
  maxDate?: string;

  todayDateColor?: string;
  weekendDateColor?: string;
  weekDateColor?: string;
  disabledDateColor?: string;
  selectedDateColor?: string;
  weekHeadersColor?: string;

  fontFamily?: string;

  arrowWrapperStyles?: ViewStyle;
  monthWrapperStyles?: ViewStyle;
  selectedMonthWrapperStyles?: ViewStyle;
  yearWrapperStyles?: ViewStyle;
  selectedYearWrapperStyles?: ViewStyle;
  selectedDateStyles?: ViewStyle;
  calendarHeaderWrapperStyles?: ViewStyle;
  validWeekendDateStyles?: ViewStyle;
  validWeekDateStyles?: ViewStyle;
  disabledDateStyles?: ViewStyle;

  arrowStyles?: ImageStyle;

  selectedMonthTextStyles?: TextStyle;
  monthTextStyles?: TextStyle;
  yearTextStyles?: TextStyle;
  calendarHeaderTextStyles?: TextStyle;
  selectedYearTextStyles?: TextStyle;

  onChange: (date: string) => void;
};

/**
 *
 * @param {string} initialViewDate - initial month to show
 * @param {string} initialSelectedDate - currently selected date - format YYYY-MM-DD
 * @param {string} minDate - minimum date can be selected
 * @param {string} maxDate - maximum date can be selected
 * @param {ViewStyle} selectedDateStyles - styles for the selected date
 * @param {ViewStyle} calendarHeaderTextStyles - styles for the calendar header text
 * @param {ViewStyle} calendarHeaderWrapperStyles - styles for the calendar header wrapper button
 * @param {ViewStyle} validWeekendDateStyles - styles for weekend date which is in the valid date range
 * @param {ViewStyle} validWeekDateStyles - styles for weekday date which is in the valid date range
 * @param {ViewStyle} disabledDateStyles - styles for a date which is outside the valid date range
 * @param {ViewStyle} arrowWrapperStyles - styles for arrow wrapper
 * @param {ViewStyle} arrowStyles - styles for arrow
 * @param {ViewStyle} monthWrapperStyles - styles for month container in month selection
 * @param {ViewStyle} selectedMonthWrapperStyles - styles for selected month container in month selection
 * @param {ViewStyle} monthTextStyles - styles for month text in month selection
 * @param {ViewStyle} selectedMonthTextStyles - styles for selected month text in month selection
 * @param {ViewStyle} yearWrapperStyles - styles for year container in year selection
 * @param {ViewStyle} yearTextStyles - styles for year text in year selection
 * @param {ViewStyle} selectedYearWrapperStyles - styles for selected year container in year selection
 * @param {ViewStyle} selectedYearTextStyles - styles for selected year text in year selection
 * @param {string} todayDateColor - color of the today's date text
 * @param {string} weekendDateColor - color of the weekend's date text
 * @param {string} weekDateColor - color of the weekday's date text
 * @param {string} weekHeadersColor - color of the week headers text
 * @param {string} disabledDateColor - color of a disabled date text
 * @param {string} selectedDateColor - color of a selected date text
 * @param {string} fontFamily - font family to apply for all text inside the calendar
 * @param {Function} onChange - callback to execute when the selected date changed
 * @returns Datepicker component
 *
 */
const DatePicker = (props: DatePickerProps) => {
  const {
    initialViewDate,
    initialSelectedDate,
    minDate,
    maxDate,
    todayDateColor,
    weekendDateColor,
    weekDateColor,
    disabledDateColor,
    selectedDateColor,
    weekHeadersColor,
    arrowWrapperStyles = {},
    arrowStyles = {},
    monthWrapperStyles = {},
    selectedMonthWrapperStyles = {},
    monthTextStyles = {},
    selectedMonthTextStyles = {},
    yearWrapperStyles = {},
    yearTextStyles = {},
    selectedYearWrapperStyles = {},
    selectedYearTextStyles = {},
    selectedDateStyles = {},
    calendarHeaderTextStyles = {},
    calendarHeaderWrapperStyles = {},
    validWeekendDateStyles = {},
    validWeekDateStyles = {},
    disabledDateStyles = {},
    fontFamily,
    onChange,
  } = props;
  const [selectedDate, setSelectedDate] = useState(
    initialSelectedDate || moment().format('YYYY-MM-DD')
  );
  const [isMonthView, setMonthView] = useState(false);
  const [isYearView, setYearView] = useState(false);
  const [isCalendarView, setCalendarView] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);
  const [yearArray, setYearArray] = useState<number[]>([]);

  const selectedDateInfo = useMemo(
    () => getDateInfo(selectedDate),
    [selectedDate]
  );

  const initialDate = useMemo(
    () => getInitialDate(selectedDate, initialViewDate, hasChanged),
    [selectedDate, initialViewDate, hasChanged]
  );

  useMemo(() => {
    setYearArray(getYearArray(selectedDate));
  }, [selectedDate]);

  const monthOpacity = useRef(new Animated.Value(0)).current;
  const yearOpacity = useRef(new Animated.Value(0)).current;
  const calendarOpacity = useRef(new Animated.Value(1)).current;

  const minMoment = minDate ? moment(minDate) : null;
  const maxMoment = maxDate ? moment(maxDate) : null;

  const sharedTextStyles = {
    fontFamily,
  };

  const onChangeSelectedDate = (date: string) => {
    onChange?.(date);
    setSelectedDate(date);
  };

  const toggleMonthView = () => {
    if (isMonthView) {
      setCalendarView(true);
      Animated.parallel([
        Animated.timing(monthOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(calendarOpacity, {
          toValue: 1,
          delay: 200,
          useNativeDriver: true,
          duration: 300,
        }),
      ]).start(() => setMonthView(false));
    } else {
      setMonthView(true);
      Animated.parallel([
        Animated.timing(monthOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(calendarOpacity, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
        }),
      ]).start(() => setCalendarView(false));
    }
  };

  const toggleYearView = () => {
    if (isYearView) {
      setCalendarView(true);
      Animated.parallel([
        Animated.timing(yearOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(calendarOpacity, {
          toValue: 1,
          delay: 200,
          useNativeDriver: true,
          duration: 300,
        }),
      ]).start(() => setYearView(false));
    } else {
      setYearView(true);
      Animated.parallel([
        Animated.timing(yearOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(calendarOpacity, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
        }),
      ]).start(() => setCalendarView(false));
    }
  };

  const renderCalendarHeader = (date: any) => {
    return (
      <View style={styles.calendarHeaderContainer}>
        <TouchableOpacity
          onPress={toggleMonthView}
          style={[styles.calendarHeaderWrapper, calendarHeaderWrapperStyles]}
        >
          <Text
            style={[
              styles.calendarHeader,
              calendarHeaderTextStyles,
              sharedTextStyles,
            ]}
          >
            {moment(new Date(date)).format('MMMM')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleYearView}
          style={[styles.calendarHeaderWrapper, calendarHeaderWrapperStyles]}
        >
          <Text
            style={[
              styles.calendarHeader,
              calendarHeaderTextStyles,
              sharedTextStyles,
            ]}
          >
            {moment(new Date(date)).format('YYYY')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const calendarDayContainerStyle = (
    date: any,
    state: CALENDAR_STATES
  ): ViewStyle => {
    const dayOfWeek = new Date(date.dateString).getDay();
    switch (true) {
      case selectedDate === date.dateString:
        // if the date is before the today's date and it has been selected
        return {
          ...styles.greenDayContainer,
          ...sharedContainerStyles,
          ...selectedDateStyles,
        } as ViewStyle;

      case state === CALENDAR_STATES.DISABLED:
        // if the date is disabled
        return {
          ...styles.noBackgroundDayContainer,
          ...sharedContainerStyles,
          ...disabledDateStyles,
        } as ViewStyle;

      case dayOfWeek === 6:
      case dayOfWeek === 0:
        // if the date is in valid range, is not selected, but is a weekend
        return {
          ...styles.noBackgroundDayContainer,
          ...sharedContainerStyles,
          ...validWeekendDateStyles,
        } as ViewStyle;

      default:
        // if the date is in valid range and a weekday
        return {
          ...styles.whiteDayContainer,
          ...sharedContainerStyles,
          ...validWeekDateStyles,
        } as ViewStyle;
    }
  };

  const calendarDayTextStyle = (date: any, state: CALENDAR_STATES) => {
    const dayOfWeek = new Date(date.dateString).getDay();
    switch (true) {
      case selectedDate === date.dateString:
        // if the date is before the today's date and it has been selected
        return selectedDateColor
          ? { color: selectedDateColor }
          : styles.whiteColor;

      case state === CALENDAR_STATES.DISABLED:
        // if the date is disabled
        return disabledDateColor
          ? { color: disabledDateColor }
          : styles.disabledColor;

      case state === CALENDAR_STATES.TODAY:
        // if the date is the today's date
        return todayDateColor ? { color: todayDateColor } : styles.primaryColor;

      case dayOfWeek === 6:
      case dayOfWeek === 0:
        // if the date is a weekend
        return weekendDateColor ? { color: weekendDateColor } : styles.redColor;

      default:
        // if the date is a week day
        return weekDateColor ? { color: weekDateColor } : styles.blackColor;
    }
  };

  const renderCalendarDate = ({
    date,
    state,
  }: {
    date: any;
    state: CALENDAR_STATES;
  }) => {
    return (
      <TouchableOpacity
        disabled={state === CALENDAR_STATES.DISABLED}
        onPress={() => {
          onChangeSelectedDate(date.dateString);
        }}
        style={calendarDayContainerStyle(date, state)}
      >
        <Text style={[calendarDayTextStyle(date, state), sharedTextStyles]}>
          {date.day}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCalendarArrow = (direction: 'left' | 'right') => {
    return (
      <View style={[styles.calendarArrowContainer, arrowWrapperStyles]}>
        <Image
          resizeMode="contain"
          source={Images.ic_chevron}
          style={[variableStyles.calendarArrow(direction), arrowStyles]}
        />
      </View>
    );
  };

  const renderCalendarMonth = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => {
    const isSelected = index === selectedDateInfo.month;
    const monthMoment = moment({
      year: selectedDateInfo.year,
      month: index,
      date: 1,
    });

    let isDisabled = false;
    if (maxMoment && minMoment) {
      isDisabled =
        monthMoment.isAfter(maxMoment) || monthMoment.isBefore(minMoment);
    } else if (maxMoment) {
      isDisabled = monthMoment.isAfter(maxMoment);
    } else if (minMoment) {
      isDisabled = monthMoment.isBefore(minMoment);
    }
    return (
      <View style={styles.monthStyle}>
        <TouchableOpacity
          disabled={isDisabled}
          style={[
            monthWrapperStyles,
            variableStyles.monthYear(
              isSelected,
              isDisabled,
              selectedMonthWrapperStyles
            ),
          ]}
          onPress={() => onSelectMonth(index)}
        >
          <Text
            style={[
              variableStyles.monthYearText(
                isSelected,
                isDisabled,
                selectedMonthTextStyles
              ),
              sharedTextStyles,
              monthTextStyles,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCalendarYear = ({ item }: { item: number }) => {
    const isSelected = item === selectedDateInfo.year;
    const yearMoment = moment({
      year: item,
      month: selectedDateInfo.month,
      date: 1,
    });

    let isDisabled = false;
    if (maxMoment && minMoment) {
      isDisabled =
        yearMoment.isAfter(maxMoment) || yearMoment.isBefore(minMoment);
    } else if (maxMoment) {
      isDisabled = yearMoment.isAfter(maxMoment);
    } else if (minMoment) {
      isDisabled = yearMoment.isBefore(minMoment);
    }
    return (
      <View style={styles.yearStyle}>
        <TouchableOpacity
          disabled={isDisabled}
          style={[
            yearWrapperStyles,
            variableStyles.monthYear(
              isSelected,
              isDisabled,
              selectedYearWrapperStyles
            ),
          ]}
          onPress={() => onSelectYear(item)}
        >
          <Text
            style={[
              variableStyles.monthYearText(
                isSelected,
                isDisabled,
                selectedYearTextStyles
              ),
              sharedTextStyles,
              yearTextStyles,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onSelectMonth = (index: number) => {
    const newSelectedMoment = moment({
      year: selectedDateInfo.year,
      month: index,
      date: 1,
    }).endOf('month');
    if (selectedDateInfo.date <= newSelectedMoment.date()) {
      newSelectedMoment.date(selectedDateInfo.date);
    }
    if (maxMoment && minMoment) {
      if (newSelectedMoment.isBefore(minMoment)) {
        onChangeSelectedDate(minMoment.format('YYYY-MM-DD'));
      } else if (newSelectedMoment.isAfter(maxMoment)) {
        onChangeSelectedDate(maxMoment.format('YYYY-MM-DD'));
      } else {
        onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'));
      }
    } else if (maxMoment) {
      if (newSelectedMoment.isAfter(maxMoment)) {
        onChangeSelectedDate(maxMoment.format('YYYY-MM-DD'));
      } else {
        onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'));
      }
    } else if (minMoment) {
      if (newSelectedMoment.isBefore(minMoment)) {
        onChangeSelectedDate(minMoment.format('YYYY-MM-DD'));
      } else {
        onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'));
      }
    } else {
      onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'));
    }

    toggleMonthView();
    setHasChanged(true);
  };

  const onSelectYear = (item: number) => {
    const newSelectedMoment = moment({
      year: item,
      month: selectedDateInfo.month,
      date: 1,
    }).endOf('month');
    if (selectedDateInfo.date <= newSelectedMoment.date()) {
      newSelectedMoment.date(selectedDateInfo.date);
    }
    if (maxMoment && minMoment) {
      if (newSelectedMoment.isBefore(minMoment)) {
        onChangeSelectedDate(minMoment.format('YYYY-MM-DD'));
      } else if (newSelectedMoment.isAfter(maxMoment)) {
        onChangeSelectedDate(maxMoment.format('YYYY-MM-DD'));
      } else {
        onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'));
      }
    } else if (maxMoment) {
      if (newSelectedMoment.isAfter(maxMoment)) {
        onChangeSelectedDate(maxMoment.format('YYYY-MM-DD'));
      } else {
        onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'));
      }
    } else if (minMoment) {
      if (newSelectedMoment.isBefore(minMoment)) {
        onChangeSelectedDate(minMoment.format('YYYY-MM-DD'));
      } else {
        onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'));
      }
    } else {
      onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'));
    }
    toggleYearView();
    setHasChanged(true);
  };

  const onPressYearArrow = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setYearArray(
        Array.from(
          { length: 20 },
          (_, i) => (yearArray[0] ? yearArray[0] : 0) - 20 + i
        )
      );
    } else {
      setYearArray(
        Array.from(
          { length: 20 },
          (_, i) => (yearArray[yearArray.length - 1] as any) + 1 + i
        )
      );
    }
  };

  const renderYearArrows = () => {
    let isLeftDisabled = false;
    if (yearArray[0] === 0) {
      isLeftDisabled = true;
    } else if (minMoment) {
      const prevSetLastYearMoment = moment({
        year: yearArray[0] ? yearArray[0] - 1 : 0,
        month: 11,
        date: 1,
      }).endOf('month');
      isLeftDisabled = prevSetLastYearMoment.isBefore(minMoment);
    }

    let isRightDisabled = false;
    if (maxMoment) {
      const nextSetLastFirstMoment = moment({
        year: (yearArray[yearArray.length - 1] as any) + 1,
        month: 0,
        date: 1,
      });
      isRightDisabled = nextSetLastFirstMoment.isAfter(maxMoment);
    }

    return (
      <View style={styles.row}>
        <TouchableOpacity
          disabled={isLeftDisabled}
          onPress={() => onPressYearArrow('left')}
          style={[styles.calendarArrowContainer, arrowWrapperStyles]}
        >
          <Image
            resizeMode="contain"
            source={Images.ic_chevron}
            style={[variableStyles.calendarArrow('left'), arrowStyles]}
          />
        </TouchableOpacity>
        <View style={[styles.row, styles.headerRow]}>
          <Text
            style={[
              styles.calendarHeader,
              sharedTextStyles,
              calendarHeaderTextStyles,
            ]}
          >
            {yearArray[0]}
            {' - '}
          </Text>
          <Text
            style={[
              styles.calendarHeader,
              sharedTextStyles,
              calendarHeaderTextStyles,
            ]}
          >
            {yearArray[yearArray.length - 1]}
          </Text>
        </View>
        <TouchableOpacity
          disabled={isRightDisabled}
          onPress={() => onPressYearArrow('right')}
          style={[styles.calendarArrowContainer, arrowWrapperStyles]}
        >
          <Image
            resizeMode="contain"
            source={Images.ic_chevron}
            style={[variableStyles.calendarArrow('right'), arrowStyles]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isCalendarView && (
        <Animated.View
          style={{
            opacity: calendarOpacity,
            position: 'absolute',
            width: '100%',
          }}
        >
          <Calendar
            current={initialDate}
            maxDate={maxDate ? maxMoment?.format('YYYY-MM-DD') : undefined}
            minDate={minDate ? minMoment?.format('YYYY-MM-DD') : undefined}
            firstDay={1} // starts from monday
            renderHeader={renderCalendarHeader}
            dayComponent={renderCalendarDate as any}
            renderArrow={renderCalendarArrow}
            theme={{
              calendarBackground: 'transparent',
              textSectionTitleColor: weekHeadersColor || '#000000',
              textDayHeaderFontFamily: fontFamily,
            }}
          />
        </Animated.View>
      )}
      {isMonthView && (
        <Animated.View
          style={{ opacity: monthOpacity, position: 'absolute', width: '100%' }}
        >
          <FlatList
            data={moment()?.localeData()?.monthsShort() || MONTHS}
            numColumns={3}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={renderCalendarMonth}
            contentContainerStyle={styles.contentContainerStyle}
            columnWrapperStyle={styles.columnWrapperStyles}
          />
        </Animated.View>
      )}
      {isYearView && (
        <Animated.View
          style={{ opacity: yearOpacity, position: 'absolute', width: '100%' }}
        >
          {renderYearArrows()}
          <FlatList
            data={yearArray}
            numColumns={4}
            keyExtractor={(item) => item.toString()}
            renderItem={renderCalendarYear}
            contentContainerStyle={styles.contentContainerStyle}
            columnWrapperStyle={styles.columnWrapperStyles}
          />
        </Animated.View>
      )}
    </View>
  );
};

const sharedContainerStyles = {
  paddingVertical: 6,
  width: 35,
  borderWidth: 1,
  borderRadius: 10,
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
};

const variableStyles = {
  calendarArrow: (direction: 'left' | 'right') => ({
    tintColor: 'blue',
    transform: [
      { rotate: direction === 'left' ? '90deg' : '-90deg' },
      { scale: 0.4 },
    ],
  }),
  monthYear: (
    isSelected: boolean,
    isDisabled: boolean,
    selectedStyles: TextStyle
  ) => ({
    backgroundColor: isDisabled || !isSelected ? '#ffffff' : 'green',
    borderRadius: 10,
    ...(isSelected ? selectedStyles : {}),
  }),
  monthYearText: (
    isSelected: boolean,
    isDisabled: boolean,
    selectedStyles: TextStyle
  ) => ({
    color: isDisabled ? '#eeeeee' : isSelected ? '#ffffff' : '#000000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    ...(isSelected ? selectedStyles : {}),
  }),
};

const styles = StyleSheet.create({
  calendarHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarHeader: {
    color: 'black',
    overflow: 'hidden',
  },
  calendarHeaderWrapper: {
    backgroundColor: '#ffffff',
    borderColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },
  greenDayContainer: {
    borderColor: 'green',
    backgroundColor: 'green',
  },
  whiteDayContainer: {
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
  },
  noBackgroundDayContainer: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  whiteColor: {
    color: '#ffffff',
  },
  redColor: {
    color: 'red',
  },
  blackColor: {
    color: '#000000',
  },
  disabledColor: {
    color: '#eeeeee',
  },
  primaryColor: {
    color: 'blue',
  },
  calendarArrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  bottomButtonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    width: '100%',
    height: '100%',
  },
  columnWrapperStyles: {
    width: '100%',
    marginVertical: '3%',
  },
  monthStyle: {
    width: '33%',
    height: '100%',
    alignItems: 'center',
  },
  yearStyle: {
    width: '25%',
    height: '100%',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    justifyContent: 'center',
    minHeight: 350,
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  headerRow: {
    marginHorizontal: 20,
  },
});

export default DatePicker;
