import React from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  /* eslint-disable */
  colowSwitchesContainerStyle: {
    height: 17,
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
    borderColor: 'rgba(26, 26, 26, 0)',
    borderWidth: 1,
  },
  selectedImageStyle: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    resizeMode: 'contain',
    borderColor: '#1a1a1a',
    borderWidth: 1,
  },
  /* eslint-enable */
});

class ColorSwitch extends React.PureComponent {
  constructor(props) {
    super(props);
    const { colorsMap } = props;
    const { colorProductId } = colorsMap[0];
    this.state = {
      selectedColorId: colorProductId,
    };
  }

  renderColorItem = ({ item, index }) => {
    const { color } = item;
    const imageUrl = color.imagePath;
    const { colorProductId } = item;
    const { selectedColorId } = this.state;
    const { selectedImageStyle, imageStyle } = styles;
    const selectedStyle = colorProductId === selectedColorId ? selectedImageStyle : imageStyle;
    return (
      <TouchableOpacity
        onPress={() => this.onSelectHandler(colorProductId, index)}
        accessibilityRole="button"
      >
        {this.getImageIcon(imageUrl, selectedStyle)}
      </TouchableOpacity>
    );
  };

  onSelectHandler = (selectedId, index) => {
    const { setImageIndex } = this.props;
    setImageIndex(index);
    this.setState({
      selectedColorId: selectedId,
    });
  };

  renderSeparator = () => {
    const { itemSeparatorStyle } = styles;
    return <View style={itemSeparatorStyle} />;
  };

  getImageIcon = (imageUrl, selectedStyle) => {
    return (
      <Image
        source={{
          uri: imageUrl,
        }}
        style={selectedStyle}
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
  setImageIndex: PropTypes.func,
};

ColorSwitch.defaultProps = {
  colorsMap: [],
  setImageIndex: () => {},
};

export default ColorSwitch;
