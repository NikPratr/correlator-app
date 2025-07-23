import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState('');

    return (
        <View style={{ flex: 1, padding: 50 }}>
            <Calendar
                style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10 }}
                onDayPress={(date) => setSelectedDate(date.dateString)}
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: '#00adf5' },
                }}
            />

            {selectedDate &&
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                    Selected Date: {selectedDate}
                </Text>
            }
        </View>
    );
};

type MarkedDates = {
    [date: string]: {
        periods: Array<{
            startingDay: boolean;
            endingDay: boolean;
            color: string;
        }>;
    };
};


export default CalendarScreen;
