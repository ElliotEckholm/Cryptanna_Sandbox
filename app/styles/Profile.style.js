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
    backgroundColor: Colors.darkGrayBackground,
    flexDirection:'column',
    justifyContent:'space-between',
    paddingTop:30
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white
  },
  logoutText: {
    color: Colors.white,
    fontSize : 16,
    textAlign: 'center',
  },
  logoutContainer: {
    backgroundColor: Colors.c_ligth_red,
    alignSelf:'center',
    borderRadius:4,
    borderColor:Colors.white,
    borderWidth:1,
    height:40,
    width:deviceWidth-200,
    flexDirection: 'column',
    justifyContent:'space-around',
  },
  termsText: {
    color: Colors.lightGray,
    fontSize : 16,
  },
  termsContainer: {
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  apiSettingsText: {
    fontSize:16,
    color : Colors.white,
    textAlign:'center'
  },
  apiSettingsContainer: {
      backgroundColor: Colors.darkGray,
      alignSelf:'center',
      borderRadius:4,
      borderColor:Colors.white,
      borderWidth:1,
      height:40,
      width:deviceWidth-100,
      flexDirection: 'column',
      justifyContent:'space-around',
      marginTop:40
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 4,
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: Colors.shadow,
    shadowOpacity: 1.0,
    shadowRadius: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inputRow: {
    flexDirection : 'row',
    justifyContent:'center',
    marginBottom:10,
    marginTop:10,
    height:30,
  },
  detailText:{
    textAlign: 'left',
    color: Colors.white,
    fontSize: 16,
    padding:10
  },
  detailTextContainer: {
    flexDirection: 'row',
  },
  editInfo:{
    textAlign: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    color: Colors.black,
    fontSize: 14,
    width:'95%'
  }
});
