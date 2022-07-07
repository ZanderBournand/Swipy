import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    titleContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24,
    },
    title: {
        paddingLeft: 10,
    },
    profileContainer: {
        paddingRight: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    typeContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        //
        //flex: 0.7,
    },
    typeButton: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    typeSelected: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    typeNotSelected: {
        color: 'gray',
        fontSize: 20,
    },
    indicator: {
        height: 3,
        marginTop: 7,
        width: 15,
        borderRadius: 30,
        backgroundColor: '#fd4781'
    },
});

export default styles;