import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        paddingTop: 5,
    },
    text: {
        fontSize: 16,
        color: 'white',
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    button: {
        height: 35,
        width: 35,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17.5
    },
    noButton: {
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default styles;