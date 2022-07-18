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
    buttonsContainer: {
        flexDirection: 'row',
        paddingRight: 5
    },
    buttonCancel: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonConfirm: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E6D9E6',
        borderRadius: 5,
    },
    buttonCancelText: {
        color: 'white',
        paddingVertical: 5,
    },
    buttonConfirmText: {
        color: 'black',
        paddingVertical: 5,
        fontWeight: 'bold',
    }
});

export default styles;