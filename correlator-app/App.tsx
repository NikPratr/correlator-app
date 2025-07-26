import RootNavigator from './src/navigation/RootNavigator';
import { initDatabase } from './src/database';
import { use, useEffect } from 'react';

export default function App() {
    useEffect(() => {
        // Initialize the database when the app starts
        initDatabase()
            .then(() => console.log('Database initialized'))
            .catch((error) => console.error('Failed to initialize database:', error));
    }, []);

    return <RootNavigator />;
}
