import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

// const Text = ({ text }) => (
//   <Text style={styles.text}>
//     {text}
//   </Text>
// );

export const LabelWhiteText = ({ text }) => {
    return (
        <Text style={styles.textWhite}>
          {text}
        </Text>
    );
  };

export const LabelBlackText = ({ text }) => {
    return (
        <Text style={styles.textBlack}>
          {text}
        </Text>
    );
  };


