import { StyleSheet, Dimensions } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlayContainer: {
        position: "absolute",
        width: Dimensions.get('window').width,
        zIndex: 999,
        bottom: 0,
        paddingLeft: 20,
        paddingBottom: 20,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {

    },
    artist: {
        
    }
});

export default styles;