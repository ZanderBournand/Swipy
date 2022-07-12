import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#202020',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonCancel: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonConfirm: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
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