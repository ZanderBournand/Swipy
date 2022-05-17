import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        alignItems: "center",
        paddingHorizontal: 60,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    emailText: {
        padding: 20,
    },
    counterContainer: {
        flexDirection: 'row',
        paddingBottom: 20,
    },
    counterItemContainer: {
        flex: 1,
        alignItems: "center",
    },
    counterNumberText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    counterLabelText: {
        color: 'gray',
        fontSize: 11,
    },
    userImage: {
        backgroundColor: 'gray',
        height: 80,
        width: 80,
        borderRadius: 40,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loader: {
        position: 'absolute',
        padding: 30,
    },
});

export default styles;