# React Native Styled Datepicker

Datepicker with a Calendar View, Month Selection view and Year Selection view.

Built on top of the Calendar of [react-native-calendars](https://github.com/wix/react-native-calendars)

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
| `selectedDateStyles`           | `object`  | Styles for the selected date                                 |
| `calendarHeaderTextStyles`     | `object`  | Styles for the calendar header text                          |
| `calendarHeaderWrapperStyles`  | `object`  | Styles for the calendar header wrapper button                |
| `validWeekendDateStyles`       | `object`  | Styles for weekend date which is in the valid date range     |
| `validWeekDateStyles`          | `object`  | Styles for weekday date which is in the valid date range     |
| `disabledDateStyles`           | `object`  | Styles for a date which is outside the valid date range      |
| `arrowWrapperStyles`           | `object`  | Styles for arrow wrapper                                     |
| `arrowStyles`                  | `object`  | Styles for arrow                                             |
| `monthWrapperStyles`           | `object`  | Styles for month container in month selection                |
| `monthTextStyles`              | `object`  | Styles for month text in month selection                     |
| `yearWrapperStyles`            | `object`  | Styles for year container in year selection                  |
| `yearTextStyles`               | `object`  | Styles for year text in year selection                       |
| `todayDateColor`               | `string`  | Color of the today's date text                               |
| `weekendDateColor`             | `string`  | Color of the weekend's date text                             |
| `weekDateColor`                | `string`  | Color of the weekday's date text                             |
| `disabledDateColor`            | `string`  | Color of a disabled date text                                |
| `selectedDateColor`            | `string`  | Color of a selected date text                                |
| `fontFamily`                   | `string`  | Font family to apply for all text inside the calendar        |