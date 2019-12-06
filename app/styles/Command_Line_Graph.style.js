import { Colors } from './global/colors'

import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    shadowOffset:{width:0,height:0},
    shadowColor: Colors.black,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    borderColor:'#fff',
    marginBottom:20
  },
  graphContainer: {
    flex:.7,
    backgroundColor: Colors.white,
  },
  textContainer:{
    flex:.3,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
  infoTitle: {
    textAlign: 'center',
    fontSize: 16,//hp('3%'),
    fontWeight: 'bold',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  exchangeTitle: {
    paddingLeft:35,
    flexDirection:'column',
    fontSize:16,
    fontWeight:'bold',
    color:Colors.white,
    paddingBottom:10
  },
  spinner: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
