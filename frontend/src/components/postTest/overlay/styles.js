import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: Dimensions.get('window').width,
        zIndex: 999,
        bottom: 0,
        paddingHorizontal: 25,
        paddingBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'lightgray',
        paddingVertical: 2,
    },
    artist: {
        fontSize: 15,
        fontWeight: '500',
        color: 'gray',
        paddingVertical: 2,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    bottom: {
        alignItems: 'center',
        marginBottom: 15,
    },
    musicButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%'
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    titleContainer2: {
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
    subheaderContainer2: {
        alignItems: 'center',
        marginVertical: 10,
    },
    descriptionText: {
        textAlign: 'center',
        color: 'gray'
    },
    buttonsContainer: {
        flexDirection: 'row',
        paddingRight: 5
    },
    buttonsContainer2: {
        marginTop: 5,
    },
    buttonsContainer3: {
        flexDirection: 'row',
        paddingRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    okButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },  
    buttonContainer: {
        paddingHorizontal: 10,
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
        backgroundColor: '#E6D9E6',
        borderRadius: 5,
    },
    buttonMessages: {
        alignItems: 'center',
        backgroundColor: '#E6D9E6',
        borderRadius: 5,
        paddingHorizontal: 10,
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