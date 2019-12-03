import { Colors } from './global/colors';

import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

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
    color: Colors.white,
  },

  subTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.mediumDarkGray,
    paddingBottom: 150,
  },
  imageContainer: {
    flex:.2,
    justifyContent: 'center',
    borderWidth:2,
    paddingBottom:10,
    borderColor:Colors.darkGrayBackground,
  },
  botAgressiveTitle: {
    // borderTopWidth:2,
    // borderColor:Colors.white,
    color: '#2CA5FD',//Colors.blue,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    padding: 10,
  },
  botConvservativeTitle: {
    color: '#2CA5FD',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    padding: 10,
  },
  botMultiDayTitle: {
    color:  '#2CA5FD',//"#035795",
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    padding: 10,
  },
});
