import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types'
const Button = (props) => {
  const { text, onPress } = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};


Button.propTypes = {
  text: PropTypes.string.isRequired,
}


Button.defaultProps = {
  text: 'Button Text',
  // eslint-disable-next-line no-console
  onPress: () => console.log('Button Pressed'),
};

export default Button;
