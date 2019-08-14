import { Colors } from './global/colors'

import {
  StyleSheet,
  Dimensions
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
  terms:{
    paddingTop: 50,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: Colors.white
  },
  link:{
    paddingTop: 50,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.lightBlue
  }
});
