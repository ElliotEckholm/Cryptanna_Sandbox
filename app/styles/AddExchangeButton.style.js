import { Colors } from './global/colors'

import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: Colors.darkGrayBackground,
    paddingBottom: 20,
  },
  btn:
{
    position: 'absolute',
    right: 25,
    bottom: 25,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15
},

btnImage:
{
    resizeMode: 'contain',
    width: '100%',
    tintColor: 'white'
},
  rowContainer: {

    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    height: hp('6.5%'),
    padding: hp('2%'),
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    // paddingBottom: 100,
    // borderRadius: 4,
    // shadowOffset:{  width: 0,  height: 0,  },
    // shadowColor: Colors.green,
    // shadowOpacity: 1.0,
    // shadowRadius: 4

    borderColor: Colors.white,
    borderWidth: 1,
  },
  title: {
    textAlign: 'center',
    paddingTop: 0,
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: Colors.white
  },

  rowText: {
    textAlign: 'center',
    flex: 4,
    flexDirection: 'column'
  }
  });
