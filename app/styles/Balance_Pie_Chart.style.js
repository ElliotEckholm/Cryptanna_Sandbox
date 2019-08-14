import { Colors } from './global/colors'
import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  graphContainer: {
    backgroundColor: Colors.white,
  },
  exchangeTitle: {
    paddingLeft:35,
    flexDirection:'column',
    fontSize:16,
    fontWeight:'bold',
    color:Colors.white,
  },
  spinner: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
