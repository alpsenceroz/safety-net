import { StyleSheet } from "react-native";


const globalStyles={
    map:[
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 65
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": "50"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.attraction",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "30"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "40"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#8ac0c4"
                }
            ]
        },
        // {
        //     "featureType": "water",
        //     "elementType": "geometry",
        //     "stylers": [
        //         {
        //             "hue": "#ffff00"
        //         },
        //         {
        //             "lightness": -25
        //         },
        //         {
        //             "saturation": -97
        //         }
        //     ]
        // },
        // {
        //     "featureType": "water",
        //     "elementType": "labels",
        //     "stylers": [
        //         {
        //             "lightness": -25
        //         },
        //         {
        //             "saturation": -100
        //         }
        //     ]
        // }
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
        textColor: 'white',
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
        style: {
        }
    }
    
}


export default globalStyles