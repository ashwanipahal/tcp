import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  styles,
  ColorSwitchesContainer,
  ItemSeparatorStyle,
  ImageStyle,
  SelectedImageStyle,
} from '../styles/ColorSwitch.style.native';

/**
 * @param {String} selectedId : Selected color id
 * @param {Number} index : selected index id
 * @param {Function} setSelectedColorId : Method to set selected color
 * @param {Function} setSelectedColorIndex : Method to set image index
 * @desc This method call when select any color switch
 */
const onSelectHandler = (selectedId, index, setSelectedColorId, setSelectedColorIndex) => {
  setSelectedColorIndex(index);
  setSelectedColorId(selectedId);
};

/**
 * @param {String} imageUrl : Image source
 * @param {Object} SelectedImage : Styled component
 * @desc This method paint color image with border
 */
const getImageIcon = (imageUrl, SelectedImage) => {
  return (
    <SelectedImage
      source={{
        uri: imageUrl,
      }}
    />
  );
};

/**
 * @desc This is seperator method which used for making gap between color switches
 */
const RenderSeparator = () => {
  return <ItemSeparatorStyle />;
};

/**
 * @param {Object} itemObj : colorsMap item
 * @param {Number} index : colorsMap item index
 * @param {String} selectedColorId : Selected Color Id
 * @param {Function} setSelectedColorId : Method to set selected color
 * @param {Function} setSelectedColorIndex : Method to set image index
 * @desc This renderer method of the list which draw color switches
 */
const RenderColorItem = (itemObj, selectedColorId, setSelectedColorId, setSelectedColorIndex) => {
  const { item, index } = itemObj;
  const { color } = item;
  const imageUrl = color.imagePath;
  const { colorProductId } = item;
  const SelectedImage =
    (selectedColorId === 'none' && index === 0) || selectedColorId === colorProductId
      ? SelectedImageStyle
      : ImageStyle;
  return (
    <TouchableOpacity
      onPress={() =>
        onSelectHandler(colorProductId, index, setSelectedColorId, setSelectedColorIndex)
      }
      accessibilityRole="button"
    >
      {getImageIcon(imageUrl, SelectedImage)}
    </TouchableOpacity>
  );
};

/**
 * @param {Object} props : props for colorsMap
 * @desc This method generate color switches
 */
const ColorSwitch = props => {
  const { colorsMap, setSelectedColorIndex } = props;
  const [selectedColorId, setSelectedColorId] = useState('none');
  return (
    <ColorSwitchesContainer>
      <FlatList
        listKey={item => item.colorProductId}
        data={colorsMap}
        renderItem={item =>
          RenderColorItem(item, selectedColorId, setSelectedColorId, setSelectedColorIndex)
        }
        keyExtractor={item => item.colorProductId}
        initialNumToRender={8}
        maxToRenderPerBatch={2}
        horizontal
        ItemSeparatorComponent={RenderSeparator}
      />
    </ColorSwitchesContainer>
  );
};

ColorSwitch.propTypes = {
  props: PropTypes.shape({}),
  colorsMap: PropTypes.arrayOf(PropTypes.shape({})),
  setSelectedColorIndex: PropTypes.func,
};

ColorSwitch.defaultProps = {
  props: {},
  colorsMap: [],
  setSelectedColorIndex: () => {},
};

export default withStyles(ColorSwitch, styles);
export { ColorSwitch as ColorSwitchVanilla };
