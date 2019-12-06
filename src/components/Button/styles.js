import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0082c3',
    margin: 5,
    width:350,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
  },
  buttonlink: {
    paddingVertical: 10,
    paddingHorizontal: 20,

    margin: 5,
    width:350,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: '500',
  },
  buttonLinkText: {
    color:'rgba(255,255,255,0.5)',
    fontSize:12
  },
});
