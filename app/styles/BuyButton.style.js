import { Colors } from './global/colors'

import {
  StyleSheet,
  Dimensions
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  buttons_container: {
   flex: 1,
   borderColor: Colors.white,
   borderTopWidth: 1,
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems:'center',
   paddingLeft:20,
   paddingRight:20,
  },
  buyButton: {
    backgroundColor: Colors.darkGray,
    borderColor: '#fff',
    width:deviceWidth-225,
    height:40,
    borderRadius:4,
    shadowOffset:{width: 0,height: 0},
    shadowColor: Colors.green,
    shadowOpacity: 1.0,
    paddingTop:8
  },
  amountInput: {
    backgroundColor: Colors.darkGrayBackground,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
    width:deviceWidth-250,
    paddingBottom:10
},
  text: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
  }
  });
