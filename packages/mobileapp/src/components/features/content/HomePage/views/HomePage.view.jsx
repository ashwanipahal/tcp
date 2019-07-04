import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import EspotContainer from '../../../../common/atoms/EspotContainer/EspotContainer';

const StyledText = styled.Text`
  color: palevioletred;
`;

export default class HomePage extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View className="">
        <StyledText>This is test text</StyledText>
        <EspotContainer />
      </View>
    );
  }
}
