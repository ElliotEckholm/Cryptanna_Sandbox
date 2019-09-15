import { Colors } from './global/colors'

import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: Colors.darkGrayBackground
  	},
title: {
    textAlign: 'center',
    paddingTop: hp('3%'),
    paddingBottom: hp('1%'),
    fontSize: hp('6%'),
    fontWeight: 'bold',
    color: Colors.white
  	},
instructions: {
    textAlign: 'center',
    paddingTop: hp('3%'),
    paddingBottom: hp('1%'),
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: Colors.mediumDarkGray
  	},


  sectionTitle: {
  	fontSize: 30,
  	color: Colors.white,
  	padding: 5,
  	paddingLeft : 20,
  	flexDirection: 'row',
  	width: wp('80%')
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: wp('80%')
  	},
  inputRow: {
    flexDirection : 'row',
    width: wp('80%')
  	},
  detailText:{
    textAlign: 'left',
    flex: 1,
    flexDirection: 'row',
    color: Colors.mediumDarkGray,
    fontSize: 17,
    padding: 10
  	},
  detailTextContainer: {
    flexDirection: 'row',
    width: wp('80%')
  	},
  editInfo:{
    textAlign: 'center',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    color: Colors.blacl,
    fontSize: 17,
    padding: 5,
    margin: 5
  }
});
