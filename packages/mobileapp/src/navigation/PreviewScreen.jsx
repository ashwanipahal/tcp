import React from 'react';
import { Text, TextInput, View } from 'react-native';

/**
 * This class creates a simple screen having date selection option for scheduled preview
 *
 * @class PreviewScreen
 * @extends {React.PureComponent<Props>}
 */
class PreviewScreen extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  render() {
    const { value } = this.state;
    const styles = {
      view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      },
      text: {
        color: '#1a1a1a',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 5,
        width: 300,
      },
      input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#d8d8d8',
        borderRadius: 3,
        color: '#1a1a1a',
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 5,
      },
    };
    return (
      <View style={styles.view}>
        <Text style={styles.text}>Scheduled preview date</Text>
        <TextInput
          style={styles.input}
          placeholder="Type date here"
          onChangeText={text => this.setState({ value: text })}
          value={value}
        />
      </View>
    );
  }
}

export default PreviewScreen;
