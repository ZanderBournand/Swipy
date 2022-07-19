import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    topContainer: {
        paddingVertical: 8,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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