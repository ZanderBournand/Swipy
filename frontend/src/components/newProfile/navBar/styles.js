import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        top: '17%',
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
    text: {
        fontSize: 16,
        color: 'white',
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    button: {
        height: 25,
        width: 25,
        justifyContent: 'center'
    },
});

export default styles;