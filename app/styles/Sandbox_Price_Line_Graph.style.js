import { Colors } from './global/colors'
import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  graphContainer: {
    backgroundColor: Colors.white,
  },
  textContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.black,
  },
  infoTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
      color: Colors.black
  },
  exchangeTitle: {
    paddingLeft: 35,
    paddingBottom:10,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white
  },
  marketTitle: {
    paddingLeft: 35,
    paddingBottom:10,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.lightBlue
  },
  spinner: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
