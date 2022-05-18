import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    containerInput: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    input: {
        backgroundColor: 'lightgray',
        borderRadius: 4,
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 10,
    }
});

export default styles;