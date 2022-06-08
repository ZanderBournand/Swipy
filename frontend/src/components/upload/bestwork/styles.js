import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
       flex: 1,
       flexDirection: 'row',
       paddingVertical: 10,
       alignItems: 'center'
    },
    artwork: {
        width: '100%',
        aspectRatio: 1/1,
        borderRadius: 15,
    },
    description: {
        flexDirection: 'column',
        paddingLeft: 10,
        flex: 2.5,
    },
    stats: {
        flex: 1,
        width: '80%',
        flexDirection: 'row', 
        paddingTop: 5,
        justifyContent: 'space-between',
    },
    statsItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsText: {
        fontWeight: '600', 
        fontSize: 16, 
        paddingLeft: 2
    }
});

export default styles;