import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
        marginVertical: 4,
        backgroundColor: '#252525',
        borderRadius: 10,
    },
    image: {
        height: 50,
        aspectRatio: 1,
        borderRadius: 25,
        marginRight: 16,
        backgroundColor: 'gray',
    },
    userDisplayName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    lastMessage: {
        fontSize: 13,
        color: 'lightgray',
    },
    date: {
        fontSize: 13,
        color: 'lightgray',
    }
});

export default styles;