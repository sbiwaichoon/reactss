import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types'
const ButtonLink = (props) => {
  const { text, onPress } = props;
  return (
    <TouchableOpacity style={styles.buttonlink} onPress={onPress}>
      <Text style={styles.buttonLinkText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};


ButtonLink.propTypes = {
  text: PropTypes.string.isRequired,
}


ButtonLink.defaultProps = {
  text: 'Button Text',
  // eslint-disable-next-line no-console
  onPress: () => console.log('ButtonLink Pressed'),
};

export default ButtonLink;
