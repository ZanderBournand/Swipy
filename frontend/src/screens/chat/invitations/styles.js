import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    topContainer: {
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    listContainer: {
        paddingTop: 20,
    },
    noDataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
    },
    noDataText: {
        color: 'lightgray',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    }
});

export default styles;