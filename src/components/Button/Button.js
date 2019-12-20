import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types'

export const ButtonPrimary = (props) => {
  const { text, onPress } = props;
  return (
    <TouchableOpacity style={[styles.button,{ backgroundColor: '#0082c3'}]} onPress={onPress}>
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const ButtonSecondary = (props) => {
  const { text, onPress } = props;
  return (
    <TouchableOpacity style={[styles.button,{ backgroundColor: '#596972'}]} onPress={onPress}>
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};




// Button.propTypes = {
//   text: PropTypes.string.isRequired,
// }


// Button.defaultProps = {
//   text: 'Button Text',
//   // eslint-disable-next-line no-console
//   onPress: () => console.log('Button Pressed'),
// };

