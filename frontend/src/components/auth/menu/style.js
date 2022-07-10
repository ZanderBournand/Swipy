import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', 
        marginTop: 30,
    },
    containerMain: {
        flex: 4,
        padding: 30,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 25,
        color: 'white',
        fontFamily: 'inter_black'
    },
    logoContainer: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        resizeMode: 'contain',
        height: 70,
    },
    providerButton: {
        borderColor: 'lightgray',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    providerButtonText: {
        paddingRight: 22,
        color: "white",
    },
    containerBottomButton: {
        backgroundColor: '#303030',
        padding: 30,
        alignItems: "center",
        borderStyle: 'solid',
        borderColor: 'lightgray',
    },
    bottomButtonText: {
        fontWeight: 'bold',
        color: '#fd7aa3',
    }
})

export default styles;