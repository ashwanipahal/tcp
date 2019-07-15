// @flow
import React from 'react';
import { Text } from 'react-native';
import HeadingStyles from '../Heading.style.native';
import withStyles from '../../../hoc/withStyles.native';

const Heading = props => <Text {...props} />;

export default withStyles(Heading, HeadingStyles);
