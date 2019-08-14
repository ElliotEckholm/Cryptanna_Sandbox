import { Colors } from './global/colors'

import {
  StyleSheet,
  Dimensions
} from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: Colors.darkGrayBackground
  	},
title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize:28,
    color: '#fff',
  	},
  sectionTitle: {
  	fontSize: 24,
  	color: Colors.white,
    marginLeft:5,
    fontWeight:'bold',
    paddingTop:30
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: deviceWidth/2,
    borderWidth:2,
    borderColor:'#fff',
    marginTop:40,
    borderRadius:4,
    backgroundColor:Colors.darkGray
  	},
  inputRow: {
    flexDirection : 'row',
    justifyContent:'center',
    marginBottom:10,
    marginTop:10,
    height:30
  	},
  detailText:{
    textAlign: 'left',
    flexDirection: 'row',
    color: Colors.white,
    fontSize: 16,
    padding: 10
  	},
  editInfo:{
    flexDirection: 'row',
    backgroundColor: Colors.white,
    color: Colors.black,
    fontSize: 14,
    textAlign:'center',
    width:'95%'
  }
});
