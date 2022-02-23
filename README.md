# React Native Styled Datepicker

Datepicker with a Calendar View, Month Selection view and Year Selection view.

Built on top of the Calendar of [react-native-calendars](https://github.com/wix/react-native-calendars)

![React Native Styled Datepicker](https://media.giphy.com/media/WTezJS3IysrzxLYgh1/giphy.gif)

## Getting started

```bash
npm install react-native-styled-datepicker --save
```

or

```bash
yarn add react-native-styled-datepicker
```

#### RN >= 0.60

If you are using RN >= 0.60, only run `npx pod-install`. Then rebuild your project.

## General Usage

```js
import DatePicker from "react-native-styled-datepicker";
```

## Props

All the dates should be in `YYYY-MM-DD` string format

| Prop                           | Type      | Description                                                  |
| ---------------------          | --------- | -------------------------------------------------------------|
| `initialViewDate`              | `string`  | Any date of the initial month to be shown                    |
| `initialSelectedDate`          | `string`  | Date to be selected initially                                |
| `minDate`                      | `string`  | Minimum date that can be selected                            |
| `maxDate`                      | `string`  | Maximum date that can be selected                            |
| `selectedDateStyles`           | `Object`  | Styles for the selected date                                 |
| `calendarHeaderTextStyles`     | `Object`  | Styles for the calendar header text                          |
| `calendarHeaderWrapperStyles`  | `Object`  | Styles for the calendar header wrapper button                |
| `validWeekendDateStyles`       | `Object`  | Styles for weekend date which is in the valid date range     |
| `validWeekDateStyles`          | `Object`  | Styles for weekday date which is in the valid date range     |
| `disabledDateStyles`           | `Object`  | Styles for a date which is outside the valid date range      |
| `arrowWrapperStyles`           | `Object`  | Styles for arrow wrapper                                     |
| `arrowStyles`                  | `Object`  | Styles for arrow                                             |
| `monthWrapperStyles`           | `Object`  | Styles for month container in month selection                |
| `monthTextStyles`              | `Object`  | Styles for month text in month selection                     |
| `yearWrapperStyles`            | `Object`  | Styles for year container in year selection                  |
| `yearTextStyles`               | `Object`  | Styles for year text in year selection                       |
| `selectedMonthWrapperStyles`   | `Object`  | Styles for selected month container in month selection       |
| `selectedMonthTextStyles`      | `Object`  | Styles for selected month text in month selection            |
| `selectedYearWrapperStyles`    | `Object`  | Styles for selected year container in year selection         |
| `selectedYearTextStyles`       | `Object`  | Styles for selected year text in year selection              |
| `todayDateColor`               | `string`  | Color of the today's date text                               |
| `weekendDateColor`             | `string`  | Color of the weekend's date text                             |
| `weekDateColor`                | `string`  | Color of the weekday's date text                             |
| `disabledDateColor`            | `string`  | Color of a disabled date text                                |
| `selectedDateColor`            | `string`  | Color of a selected date text                                |
| `fontFamily`                   | `string`  | Font family to apply for all text inside the calendar        |
| `onChange`                     | `Function`| Callback function to execute when the selected date changed  |
