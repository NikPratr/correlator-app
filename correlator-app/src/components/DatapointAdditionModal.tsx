import { useState } from "react";
import { Modal, Text, TextInput, View, StyleSheet, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DatapointAdditionModal = ({ modalVisible, setModalVisible, onCreation }: {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    onCreation?: (datapoint: Datapoint) => void;
}) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [minRating, setMinRating] = useState("");
    const [maxRating, setMaxRating] = useState("");
    const [categories, setCategories] = useState("");

    const handleSave = () => {
        if (!name.trim() || !type) {
            alert("Please provide a name and type.");
            return;
        }

        const newDatapoint: Datapoint = {
            name,
            type,
            config: { },
            history: []
        };

        if (type === "rating") {
            if (!minRating || !maxRating) {
                alert("Please provide both minimum and maximum ratings.");
                return;
            }

            const min = parseInt(minRating, 10);
            const max = parseInt(maxRating, 10);
            if (isNaN(min) || isNaN(max) || min >= max) {
                alert("Invalid rating range.");
                return;
            }

            newDatapoint.config.min = min;
            newDatapoint.config.max = max;
        }
    
        if (type === "categories") {
            if (categories.split(",").length < 2) {
                alert("Please provide at least two categories.");
                return;
            }

            newDatapoint.config.categories = categories.split(",").map(cat => cat.trim());
        }

        if (onCreation) {
            onCreation(newDatapoint);
        }

        // Reset form
        setName("");
        setMinRating("");
        setMaxRating("");
        setCategories("");
    };

    const handleCancel = () => {
        setName("");
        setType("");
        setMinRating("");
        setMaxRating("");
        setCategories("");
        setModalVisible(false);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.label}>Datapoint Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Name"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Datapoint Type:</Text>
                    <Picker
                        selectedValue={type}
                        onValueChange={setType}
                        style={styles.input}
                    >
                        <Picker.Item label="Select Type" value="" enabled={false} />
                        <Picker.Item label="Categories" value="categories" />
                        <Picker.Item label="Checkbox" value="checkbox" />
                        <Picker.Item label="Numerical" value="numerical" />
                        <Picker.Item label="Rating" value="rating" />
                        <Picker.Item label="Time of Day" value="time-of-day" />
                    </Picker>

                    {type === 'rating' && (
                        <>
                            <Text style={styles.label}>Minimum:</Text>
                            <TextInput
                                style={styles.input}
                                value={minRating}
                                onChangeText={setMinRating}
                                keyboardType="number-pad"
                            />
                            <Text style={styles.label}>Maximum:</Text>
                            <TextInput
                                style={styles.input}
                                value={maxRating}
                                onChangeText={setMaxRating}
                                keyboardType="number-pad"
                            />
                        </>
                    )}

                    {type === 'categories' && (
                        <>
                            <Text style={styles.label}>Add Categories (comma separated):</Text>
                            <TextInput
                                style={styles.input}
                                value={categories}
                                onChangeText={setCategories}
                            />
                        </>
                    )}

                    <View style={styles.buttonRow}>
                        <Button title="Cancel" onPress={handleCancel} />
                        <Button title="Save" onPress={handleSave} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 20,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 6,
        padding: 8,
        marginTop: 8,
    },
    buttonRow: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

type Datapoint = {
    name: string;
    type: string;
    config: Record<string, any>;
    history: DatapointHistory;
};
type DatapointHistory = Array<{
    timestamp: Date;
    result: any;
}>;

export default DatapointAdditionModal;
