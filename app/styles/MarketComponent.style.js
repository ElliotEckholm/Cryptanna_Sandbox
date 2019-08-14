import { Colors } from './global/colors'


import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: wp('100%'),
    height: hp(8),
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: Colors.black,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    marginBottom : 10,
    borderTopWidth : 1,
    borderTopColor : Colors.white,
    borderBottomWidth : 1,
    borderBottomColor : Colors.white,
    backgroundColor: Colors.darkGray,
    opacity: 0.8
  },
  rowContainer:{
    flex : 1,
    backgroundColor: Colors.red,
    borderColor: Colors.white,
    borderWidth: 1,
    borderTopWidth : 3,
    borderTopColor : Colors.white,
    borderBottomWidth : 1,
    borderBottomColor : Colors.white,
  },
  graphContainer: {
    backgroundColor: Colors.white,
    height: 10,
  },
  textContainer:{
    flex:1,
    flexDirection: 'row',
    fontWeight: 'bold',
    color : Colors.white,
    paddingLeft:20,
    paddingRight:20,
    alignItems:'center'
  },
  priceContainer:{
    fontSize: 20,
    fontWeight: 'bold',
    color : Colors.white,
    paddingLeft:100
  },
  infoTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  exchangeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color : Colors.white,
  },
  spinner: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
