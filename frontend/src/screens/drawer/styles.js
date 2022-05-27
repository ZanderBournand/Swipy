import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    buttonText: {
        marginLeft: 20
    },
    logo: {
        resizeMode: 'contain',
        marginVertical: 30,
        height: 50,
        width: null,
    },
    scrollContainer: {
        borderTopWidth: 1,
        borderColor: 'lightgray',
        paddingTop: 10,
    }
});

export default styles;