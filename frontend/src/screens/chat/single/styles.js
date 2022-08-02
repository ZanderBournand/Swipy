import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#121212',
    },
    containerInput: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        borderTopWidth: 0.25,
        borderColor: '#404040',
    },
    input: {
        backgroundColor: '#303030',
        borderRadius: 4,
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        color: 'white'
    }
});

export default styles;