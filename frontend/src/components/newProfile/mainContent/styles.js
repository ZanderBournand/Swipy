import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    sectionContainer: {
        paddingVertical: 5,
    },
    sectionContainerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sectionTitle: {
        fontFamily: 'inter_bold',
        color: 'white',
        fontSize: 22,
    },
    showButton: {
        paddingRight: 5,
    },
    showButtonText: {
        color: 'lightgray',
        fontFamily: 'inter_medium'
    },
    popularTracksContainer: {
        paddingVertical: 10,
    },
    popularTrackContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
    },
    popularTrackImage: {
        width: Dimensions.get('window').width * 0.15,
        aspectRatio: 1/1,
        flex: 1,
        borderRadius: 5,
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
    previewTracksContainer: {
        paddingVertical: 15,
    },
    previewTrackContainer: {
        width: Dimensions.get('window').width * 0.4,
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
    previewTrackImage: {
        width: '100%',
        aspectRatio: 1/1,
        borderRadius: 5,
        opacity: 0.9
    },
    previewTrackTitle: {
        fontFamily: 'inter_semi_bold',
        paddingTop: 5,
        color: 'white',
        fontSize: 16,
    }
});

export default styles;