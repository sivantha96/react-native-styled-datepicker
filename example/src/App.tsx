import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-styled-datepicker';

export default function App() {
  return (
    <View style={styles.container}>
      <DatePicker initialViewDate="2022-02-05" onChange={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
