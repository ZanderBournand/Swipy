import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
       flex: 1,
       paddingHorizontal: 30,
       paddingTop: 20,
       marginTop: 40,
    },
    textInput: {
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        color: 'white'
    },
    button: {
        marginTop: 25,
        borderColor: 'lightgray',
        borderStyle: 'solid', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 30,
        alignItems: 'center',
        backgroundColor: '#fd7aa3',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'inter_black'
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