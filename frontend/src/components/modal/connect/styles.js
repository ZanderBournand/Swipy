import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    titleContainer: {
        flex: 0.5,
        marginTop: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'inter_extra_bold',
        color: 'white',
        fontSize: 22,
    },
    listContainer: {
        flex: 4,
        marginTop: 5,
        paddingVertical: 10,
    },
    buttonContainer: {
        flex: 1.5,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#E6D9E6',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'black',
        paddingVertical: 5,
        fontWeight: 'bold',
        fontSize: 16,  
    },
    buttonOff: {
        backgroundColor: '#404040',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    buttonOffText: {
        color: 'black',
        paddingVertical: 5,
        fontSize: 16,  
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    checkboxContainer: {
        flex: 1,
    },
    itemImage: {
        width: Dimensions.get('window').width * 0.15,
        aspectRatio: 1/1,
        flex: 1,
        borderRadius: 5,
    },
    trackInfo: {
        flexDirection: 'column',
        flex: 4,
        paddingHorizontal: 10,
    },
    itemTitle: {
        color: 'white',
        fontSize: 18
    },
    itemType: {
        color: 'lightgray',
        fontSize: 12,
    },
    buttonChecked: {
        width: Dimensions.get('window').width * 0.08,
        aspectRatio: 1/1,
        borderRadius: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'lightgray',
        backgroundColor: '#E6D9E6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonUnChecked: {
        width: Dimensions.get('window').width * 0.08,
        aspectRatio: 1/1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    noDataTextContainer: {
        flex: 5,
    },
    noDataText: {
        color: 'lightgray',
        fontSize: 18,
        fontWeight: '600'
    }
});

export default styles;