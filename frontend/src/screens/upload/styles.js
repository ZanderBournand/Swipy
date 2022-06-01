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
        paddingLeft: 4,
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
    uploadContainer: {
        backgroundColor: '#FFECFF',
        marginHorizontal: 30,
        borderRadius: 5,
        marginVertical: 20,
        flexDirection: 'row'
    },
    left: {
        flex: 1.5,
        flexDirection: 'column',
        marginRight: 10,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FEACC6',
        borderRadius: 5,
        width: 100,
        height: 35
    },
    right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    }
});

export default styles;