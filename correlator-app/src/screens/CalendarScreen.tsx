import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const styles = StyleSheet.create({
    dayContainer: {
      flex: 1,
      aspectRatio: 1, // forces square
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 0,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    dayText: {
      fontSize: 16,
      color: '#000',
    },
    disabledText: {
      color: '#ccc',
    },
  });

  return (
    <View style={{ flex: 1, padding: 50 }}>
      <Calendar
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10 }}
        onDayPress={(date) => setSelectedDate(date.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#00adf5' },
        }}
      />

      { selectedDate &&
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Selected Date: {selectedDate}
        </Text>
      }
    </View>
  );
};

export default CalendarScreen;
