import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%'
    },
    text: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 10,
        fontWeight: '600',
        color: 'lightgray'
    },
    image: {
        backgroundColor: 'gray',
        height: 40,
        width: 40,
        borderRadius: 20,
    }
});

export default styles;