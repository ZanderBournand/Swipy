import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    titleText: {
        color: 'lightgray',
        fontFamily: 'inter_bold',
        fontSize: 18,
    },
    subheaderContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    descriptionText: {
        textAlign: 'center',
        color: 'gray'
    },
    buttonsContainer3: {
        flexDirection: 'row',
        paddingRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    buttonMessages: {
        alignItems: 'center',
        backgroundColor: '#E6D9E6',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    buttonConfirmText: {
        color: 'black',
        paddingVertical: 5,
        fontWeight: 'bold',
    }
});

export default styles;