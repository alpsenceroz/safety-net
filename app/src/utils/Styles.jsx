import { StyleSheet } from "react-native";


const globalStyles={
    map:[
        
    ],
    button1: {
        buttonColor:'#e90064',
        textColor:'#ffffff',
        style:{ 
    }},
    mainView: {
        flex: 1, 
        backgroundColor:'#FFFFFF',
    },
    editView: {
        flex: 1, 
        backgroundColor:'#FFFFFF',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginBottom: '20%'
    },
    screenAddButton: {
        textColor:'#ffffff',
        style:{
            marginVertical: 30,
            borderRadius: 10,
            backgroundColor: 'black'
    }},
    smallAddButton: {
        marginVertical: 5,
        borderRadius: 10,
        alignSelf: 'center', 
        width: 200, 
        justifyContent:'center',
    },
    smallAddButtonHorizontal: {
        marginVertical: 5,
        borderRadius: 10,
        alignSelf: 'center', 
        width: '30%', 
        justifyContent:'center',
    },
    addButtonHorizontalHalfScreen: {
        marginVertical: 5,
        marginRight: 2,
        borderRadius: 10,
        alignSelf: 'center', 
        width: '40%', 
        marginTop: '5%'
    },
    addButtonHorizontalQuarterScreen: {
        marginVertical: 5,
        marginHorizontal: 2,
        borderRadius: 10,
        alignSelf: 'center', 
        width: '30%', 
        marginTop: '5%'
    },
    smallAddButtonBlack: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: 'black',
        alignSelf: 'center', 
        width: 200, 
        justifyContent:'center',
        style:{
            marginVertical: 30,
            borderRadius: 10,
            backgroundColor: 'black',
            alignSelf: 'center', 
            width: 200, 
            justifyContent:'center'
    }},
    screenTitle: {
        style:{
            fontSize: 30,
            textAlign: 'center',
            marginTop: 50,
            marginBottom: 20
    }},
    navigationButtonIcon: {
        style:{
            color: 'black'
    }},
}


export default globalStyles