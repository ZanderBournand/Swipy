import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        backgroundColor: 'black'
    },
    camera: {
        flex: 1,
        backgroundColor: 'black',
        marginTop: 40,
        aspectRatio: 9 / 16,
        alignSelf: 'center',
    },
    bottomBarContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        marginBottom: 30,
    },
    recordButtonContainer: {
        flex: 1,
        marginHorizontal: 30,
    },
    recordButton: {
        borderWidth: 8,
        borderColor: '#c22c2c',
        backgroundColor: '#ff4040',
        borderRadius: 100,
        height: 80,
        width: 80,
        alignSelf: 'center'
    },
    galleryButton: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        width: 50,
        height: 50,
    },
    galleryButtonImage: {
        width: 50,
        height: 50,
    },
    sideBarContainer: {
        top: 60,
        right: 0,
        marginHorizontal: 20,
        position: 'absolute',
    },
    iconText: {
        color: 'white',
        fontSize: 12,
        marginTop: 5,
    },
    sideBarButton: {
        alignItems: 'center',
        marginBottom: 25,
    }
})

export default styles;