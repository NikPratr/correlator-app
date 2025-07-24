import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Datapoint } from '../models/datapoint';
import { dummyDatapoints } from '../data/dummyData';

/**
 * Converts an array of Datapoint objects into a format suitable for periods in the calendar.
 * Every date in each Datapoint's tracking periods are converted into the MarkedDate format.
 */
const datapointsToMarkedDates = (datapoints: Datapoint[]) => {
    const markedDates: MarkedDates = { };

    for (const datapoint of datapoints) {
        for (const period of datapoint.history.trackingPeriods) {
            const start = period.start;
            // If no end, treat as ongoing until today
            const end = period.end ? period.end : new Date();
            const current = new Date(start);

            while (current <= end) {
                // Convert to YYYY-MM-DD
                const dateStr = current.toISOString().split("T")[0];

                if (!markedDates[dateStr]) {
                    markedDates[dateStr] = { periods: [] };
                }

                markedDates[dateStr].periods.push({
                    startingDay: current.getTime() === start.getTime(),
                    endingDay: current.getTime() === end.getTime(),
                    color: datapoint.color,
                });

                // Move to next day
                current.setDate(current.getDate() + 1);
            }
        }
    }

    return markedDates;
}

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState('');
    
    return (
        <View style={{ flex: 1, padding: 50 }}>
            <Calendar
                style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10 }}
                onDayPress={(date) => setSelectedDate(date.dateString)}
                markingType='multi-period'
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: '#00adf5' },
                    ...datapointsToMarkedDates(dummyDatapoints)
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
