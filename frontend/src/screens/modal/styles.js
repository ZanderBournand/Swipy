import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
       flex: 1,
       alignItems: "center",
       paddingTop: 8,
       backgroundColor: 'white'
    },
    textWelcome: {
        fontWeight: "bold",
        padding: 8,
        color: '#6B7280',
        fontSize: 25,
    },
    image: {
        width: '100%',
        height: 80,
    },
    step: {
        padding: 20,
        color: "#BB43FF",
        fontWeight: "700",
        textAlign: "center",
        fontSize: 15,
    },
    input: {
        paddingBottom: 8,
        fontSize: 20,
        textAlign: "center",
    },
    imagePicker: {
        height: 100,
        width: 100,
        position: 'absolute',
    },
    imageContainer: {
        alignItems: 'center',
    },
    imageViewContainer: {
        backgroundColor: 'gray',
        height: 100,
        width: 100,
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageOverlay: {
        backgroundColor: 'rgba(0,0,0, 0.5)',
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateContainer: {
        position: 'absolute',
        bottom: 40,
        padding: 12,
        borderRadius: 10,
        width: '60%'
    },
    updateText: {
       color: 'white',
       fontSize: 20,
       textAlign: 'center',
    }
});

export default styles;