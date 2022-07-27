import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
       flex: 1,
       flexDirection: 'row',
       alignItems: 'center',
    },
    imageContainer: {
        flex: 2,
    },
    artwork: {
        height: '100%',
        aspectRatio: 1/1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    trackInformationContainer: {
        flex: 6,
        justifyContent: 'center',
    },
    buttonsContainer: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }

});

export default styles;