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
    }
});

export default styles;