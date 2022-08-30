import React from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import { getScreenWidth } from '../../../../../utils/index.native';

/**
 * @function numColumns
 * @returns number of possible columns that can be displayed according to device width and component width
 *
 * @param {*} componentWidth
 * @param {*} separatorWidth
 */
const numColumns = (componentWidth, separatorWidth) =>
  Math.floor((getScreenWidth() - 14) / (componentWidth + separatorWidth));

/**
 * @function gridKeyExtractor
 * @returns default key extractor for flatlist with index as key
 *
 * @param {*} _
 * @param {*} index
 */
const gridKeyExtractor = (_, index) => index.toString();

/**
 * @function ItemSeparatorComponent
 * @returns default separator for flatlist items
 *
 * @param {*} separatorWidth
 */
const ItemSeparatorComponent = separatorWidth => <View style={{ height: separatorWidth }} />;

/**
 * @function renderGridItem
 * @returns grid item with separator between each horizontal item
 *
 * @param {*} item
 * @param {*} index
 * @param {*} renderItem
 * @param {*} separatorWidth
 * @returns
 */
const renderGridItem = (item, index, renderItem, separatorWidth, name) => {
  // right margin not required for last item
  const marginRight = index !== numColumns() - 1 ? separatorWidth : 0;
  const testID = `${name}_${index}`;
  return (
    <View style={{ marginRight }} testID={testID}>
      {renderItem({ item, index })}
    </View>
  );
};

/**
 * @class Grid
 *
 * @param {*} { componentWidth, separatorWidth, renderItem, keyExtractor,...otherProps }
 * @returns
 */
const Grid = ({
  componentWidth,
  separatorWidth,
  renderItem,
  keyExtractor,
  name,
  ...otherProps
}) => (
  <FlatList
    numColumns={numColumns(componentWidth, separatorWidth)}
    ItemSeparatorComponent={() => ItemSeparatorComponent(separatorWidth)}
    scrollEnabled={false}
    keyExtractor={keyExtractor || gridKeyExtractor}
    listKey={(_, index) => `grid-${index}`}
    renderItem={({ item, index }) => renderGridItem(item, index, renderItem, separatorWidth, name)}
    {...otherProps}
  />
);

/* PropTypes declaration */
Grid.propTypes = {
  componentWidth: PropTypes.number,
  separatorWidth: PropTypes.number,
  renderItem: PropTypes.func,
  keyExtractor: PropTypes.func,
  name: PropTypes.string,
};

Grid.defaultProps = {
  componentWidth: 80,
  separatorWidth: 8,
  renderItem: null,
  keyExtractor: null,
  name: 'GRID',
};

/* export grid class */
export default Grid;
