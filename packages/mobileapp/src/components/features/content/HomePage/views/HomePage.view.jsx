import React from 'react';
import { Anchor } from '@tcp/core/src/components/common/atoms';
import { View } from 'react-native';
import UrlHandler from '@tcp/core/src/components/common/atoms/Anchor/AnchorHandler';

export default class HomePage extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View>
        <Anchor
          centered="centered"
          underline="underline"
          fontSizeVariation="small"
          anchorVariation="tertiary"
          onPress={() => UrlHandler('https://www.google.com')}
        />
      </View>
    );
  }
}
