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
        borderRadius: 15,
        marginVertical: 20,
        flexDirection: 'row'
    },
    left: {
        flex: 1.5,
        flexDirection: 'column',
        marginRight: 10,
        marginTop: 10,
        marginBottom: 5,
        justifyContent: 'space-between',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FEACC6',
        borderRadius: 5,
        width: 110,
        height: 35
    },
    right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    subContainer: {
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    tracks: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 25,
    },
    trackCount: {
        paddingVertical: 35,
    },
    allTracksButton: {
        borderWidth: 2,
        borderColor: 'lightgray',
        borderRadius: 10,
        width: 75,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default styles;