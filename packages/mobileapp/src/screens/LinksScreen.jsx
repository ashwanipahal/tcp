import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 15,
  },
});

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
         * content, we just wanted to provide you with some helpful links */}
        {/* <ExpoLinksView /> */}
      </ScrollView>
    );
  }
}
