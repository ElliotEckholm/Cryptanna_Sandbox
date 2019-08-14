import { Colors } from './global/colors';

import { StyleSheet, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const screenHeight = Dimensions.get('window').height;

heightForContainer = () => {
    if (screenHeight >= 850) {
        return 385
    } else if (screenHeight <= 600) {
        return 225;
    }

    return 290;
}

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrayBackground,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom:-30
  },
  h4:{
    textAlign: 'center',
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: Colors.mediumDarkGray
  },
  imageContainer: {
    paddingTop: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('12%'),
    paddingBottom: hp('4%'),
  },
  botTitle: {
    padding: hp('5%'),
    color: Colors.white,
    fontSize: 30,
    fontWeight: 'bold'
  },
  marketContainer: {
    height:heightForContainer(),
    backgroundColor: Colors.darkGrayBackground,
  },
  marketText:{
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  marketTextContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth:1,
    borderColor:'#fff',
    padding:5
  },
});
