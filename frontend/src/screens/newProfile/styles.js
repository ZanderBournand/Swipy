import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    profileHeaderContainer: {
        height: Dimensions.get('window').height * 0.35,
        width: Dimensions.get('window').width,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        opacity: 0.6
    },
    username: {
        fontFamily: 'inter_extra_bold',
        color: 'white',
        fontSize: 50,
        position: 'absolute',
        bottom: '3%',
        left: '7%',
    },
    subHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    statsContainer: {
        flexDirection: 'row',
        flex: 2,
        alignItems: 'center',
    },
    stats: {
        flexDirection: 'column',
        marginHorizontal: 10,
        alignItems: 'center',
    },
    statsText: {
        color: 'lightgray',
        fontSize: 14
    },
    statsNumber: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    followContainer: {
        borderWidth: 2,
        borderColor: '#E9E9E9',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    followButton: {
        paddingHorizontal: 20,
        paddingVertical: 5
    }
});

export default styles;