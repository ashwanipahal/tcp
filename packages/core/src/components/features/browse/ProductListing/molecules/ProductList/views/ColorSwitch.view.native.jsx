import React from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  /* eslint-disable */
  colowSwitchesContainerStyle: {
    height: 17,
    // borderColor: '#ff0000',
    // borderWidth: 1,
    marginTop: 8,
  },
  itemSeparatorStyle: {
    width: 8,
  },
  imageStyle: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    resizeMode: 'contain',
  },
  /* eslint-enable */
});

class ColorSwitch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: (new Map(): Map<string, boolean>),
    };
  }

  onSelectColor = colorProductId => {
    // updater functions are preferred for transactional updates
    console.log('colorProductId--', colorProductId);
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(colorProductId, !selected.get(colorProductId)); // toggle
      // selected.set(colorProductId, colorProductId); // toggle
      console.log('selected:::', selected);
      return { selected };
    });
  };

  renderColorItem = ({ item }) => {
    const { color } = item;
    const imageUrl = color.imagePath;
    // console.log('id, name :', colorProductId, color.name.toLowerCase(), imageUrl);
    // console.log('circleColor: ', circleColor);
    return (
      <TouchableOpacity onPress={this.onSelectHandler} accessibilityRole="button">
        {this.getImageIcon(imageUrl)}
      </TouchableOpacity>
    );
  };

  onSelectHandler = () => {};

  renderSeparator = () => {
    const { itemSeparatorStyle } = styles;
    return <View style={itemSeparatorStyle} />;
  };

  getImageIcon = imageUrl => {
    const { imageStyle } = styles;
    return (
      <Image
        source={{
          uri: imageUrl,
        }}
        style={imageStyle}
      />
    );
  };

  render() {
    const { colorsMap } = this.props;
    const { colowSwitchesContainerStyle } = styles;
    return (
      <View style={colowSwitchesContainerStyle}>
        <FlatList
          listKey={item => item.colorProductId}
          data={colorsMap}
          renderItem={item => this.renderColorItem(item)}
          keyExtractor={item => item.colorProductId}
          initialNumToRender={8}
          maxToRenderPerBatch={2}
          horizontal
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

ColorSwitch.propTypes = {
  colorsMap: PropTypes.arrayOf(PropTypes.shape({})),
};

ColorSwitch.defaultProps = {
  colorsMap: [],
};

export default ColorSwitch;
