import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
    popularTracksContainer: {
        paddingVertical: 10,
    },
    popularTrackContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
    },
    popularTrackImageContainer: {
        width: Dimensions.get('window').width * 0.15,
        aspectRatio: 1/1,
        flex: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    popularTrackImage: {
        height: '100%',
        width: '100%',
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
    popularTrackIndex: {
        color: 'lightgray',
        flex: 0.5,
    },
    popularTrackInfo: {
        flexDirection: 'column',
        flex: 4,
        paddingHorizontal: 10,
    },
    popularTrackTitle: {
        color: 'white',
        fontSize: 18
    },
    popularTrackType: {
        color: 'lightgray',
        fontSize: 12,
    },  
    popularTrackButton: {
        flex: 1,
    },
});

export default styles;