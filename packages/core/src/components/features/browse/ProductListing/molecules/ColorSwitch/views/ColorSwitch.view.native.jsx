import React, { useState } from 'react';
import { FlatList } from 'react-native';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  styles,
  ColorSwitchesContainer,
  ItemSeparatorStyle,
  ImageStyle,
  ImageTouchableOpacity,
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
 * @desc This method paint color image with border
 */
const getImageIcon = imageUrl => {
  return <ImageStyle url={imageUrl} swatchConfig="w_50,h_50,c_thumb,g_auto:0" isProductImage />;
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
  const { color, colorProductId } = item;
  const colorName = get(color, 'name', '').toLowerCase();
  const selected =
    (selectedColorId === 'none' && index === 0) || selectedColorId === colorProductId;
  const accState = selected ? 'selected' : '';
  const splitUrl = colorProductId.split('_')[0];
  const imageUrl = `${splitUrl}/${colorProductId}`;

  return (
    <ImageTouchableOpacity
      // eslint-disable-next-line
      accessibilityStates={[accState]}
      accessibilityHint="color switches"
      selected={selected}
      accessibilityRole="button"
      accessibilityLabel={colorName}
      onPress={() =>
        onSelectHandler(colorProductId, index, setSelectedColorId, setSelectedColorIndex)
      }
    >
      {getImageIcon(imageUrl)}
    </ImageTouchableOpacity>
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
        showsHorizontalScrollIndicator={false}
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
