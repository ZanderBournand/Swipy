import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#121212'
    },
    containerInput: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
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