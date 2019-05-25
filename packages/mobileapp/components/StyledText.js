import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  color: palevioletred;
`;

export class MonoText extends React.Component {
  render() {
    return <StyledText {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
  }
}
