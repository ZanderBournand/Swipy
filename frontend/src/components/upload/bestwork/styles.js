import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
       flex: 1,
       flexDirection: 'row',
       marginHorizontal: 25,
       paddingVertical: 10,
    },
    artwork: {
        height: 100,
        width: 100,
        borderRadius: 15,
    },
    description: {
        flexDirection: 'column',
        paddingLeft: 10,
    },
    stats: {
        width: 200,
        flexDirection: 'row', 
        paddingTop: 15,
        justifyContent: 'space-between',
    },
    statsItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;