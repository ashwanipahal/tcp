// @flow
import React from 'react';
import { Text } from 'react-native';
import BodyCopyStyles from '../BodyCopy.style.native';
import withStyles from '../../../hoc/withStyles.native';

const BodyCopy = props => <Text {...props} />;

export default withStyles(BodyCopy, BodyCopyStyles);
