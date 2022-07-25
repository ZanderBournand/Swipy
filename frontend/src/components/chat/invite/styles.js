import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    profileImage: {
        width: Dimensions.get('window').width * 0.15,
        aspectRatio: 1/1,
        borderRadius: 15,
        flex: 1,
    },
    textContainer: {
        flexDirection: 'column',
        flex: 3,
        paddingHorizontal: 15,
    },
    username: {
        color: 'lightgray',
        fontWeight: 'bold',
        fontSize: 24,
    },
    trackInfo: {
        color: 'gray',
        fontSize: 14
    },
    buttonsContainer: {
        flexDirection: 'row',
        flex: 2,
        justifyContent: 'space-around',
    },
    declineButton: {
        backgroundColor: '#404040',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    acceptButton: {
        backgroundColor: '#FEACC6',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;