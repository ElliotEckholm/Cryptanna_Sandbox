import { Colors } from './global/colors'
import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({

  container: {
    flex: 1,
      backgroundColor: Colors.darkGrayBackground,
      flexDirection:'column',
      justifyContent:'space-between'
  },
  graphContainer:{
    flex: .5,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  price: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white
  },
  buttonsContainer:{
    flex:.4,
  }
});
