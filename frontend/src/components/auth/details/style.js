import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
       paddingHorizontal: 30,
       paddingTop: 20, 
    },
    textInput: {
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    button: {
        marginTop: 25,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderStyle: 'solid', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: '#fd7aa3',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loadingIndicator: {
        alignSelf: 'center',
        marginTop: 120,
    },
    invalidCredentials: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    }
});

export default styles;