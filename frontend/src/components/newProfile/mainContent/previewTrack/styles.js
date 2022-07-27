import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
    previewTrackContainer: {
        width: Dimensions.get('window').width * 0.4,
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
    previewTrackImageContainer: {
        width: '100%',
        aspectRatio: 1/1,
        borderRadius: 5,
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    previewTrackImage: {
        height: '100%',
        width: '100%',
    },
    previewTrackTitle: {
        fontFamily: 'inter_semi_bold',
        paddingTop: 5,
        color: 'white',
        fontSize: 16,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0, 0.5)',
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlayAnimation: {
        width: '50%',
        aspectRatio: 1/1
    },  
});

export default styles;