import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
       flex: 1,
       flexDirection: 'row',
       marginHorizontal: 25,
       paddingVertical: 10,
    },
    artwork: {
        height: 85,
        width: 85,
        borderRadius: 15,
    },
    description: {
        flexDirection: 'column',
        paddingLeft: 10,
    },
    stats: {
        width: 200,
        flexDirection: 'row', 
        paddingTop: 5,
        justifyContent: 'space-between',
    },
    statsItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;