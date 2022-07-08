import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: '#121212'
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        //
        flex: 1,
    }, 
    titleContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24,
    },
    title: {
        paddingLeft: 12,
        color: 'lightgray'
    },
    profileContainer: {
        paddingRight: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    typeContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        //
        flex: 0.7,
    },
    typeButton: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    typeSelected: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    typeNotSelected: {
        color: 'gray',
        fontSize: 20,
    },
    indicator: {
        height: 3,
        marginTop: 7,
        width: 15,
        borderRadius: 30,
        backgroundColor: '#fd4781'
    },
    uploadFilesContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222020',
        //
        flex: 8,
    },
    fileTypeUploadContainerTop: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 7,
        borderColor: 'gray',
        borderStyle: 'dashed',
        flex: 1,
        width: '92%'
    },
    fileTypeUploadContainerBottom: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 7,
        marginBottom: 15,
        borderColor: 'gray',
        borderStyle: 'dashed',
        flex: 1,
        width: '92%'
    },
    fileIconContainer: {
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fileIcon: {
        backgroundColor: '#FFD7E3',
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fileUploadDescription: {
        flex: 2,
        justifyContent: 'center',
    },
    artOrVideoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    artOrVideoButton: {
        backgroundColor: '#FFD7E3',
        borderRadius: 15,
        marginHorizontal: 15
    },
    artOrVideoText: {
        color: 'black', 
        fontSize: 16,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    trackInformationContainer: {
        marginVertical: 10,
        marginLeft: 20,
        marginRight: 30,
        //
        flex: 3,
    },
    trackInformationTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textInputContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray'
    },
    textInput: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 15,
        color: 'white'
    },
    moreIconContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    uploadButtonContainer: {
        flex: 2.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    uploadButton: {
        width: '40%',
        height: '50%',
        borderRadius: 5,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
    },
    fileTypeUploadContainerTopModified: {
        flexDirection: 'row',
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 7,
        backgroundColor: '#FFD7E3', 
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '92%'
    },
    fileTypeUploadContainerBottomModified: {
        flexDirection: 'row',
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 7,
        marginBottom: 15,
        backgroundColor: '#FFD7E3', 
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '92%'
    },
    previewContainer: {
        flex: 2,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mediaPreview: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: 'black'
    },
    audioDetailsContainer: {
        flex: 2,
        flexDirection: 'column',
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default styles;