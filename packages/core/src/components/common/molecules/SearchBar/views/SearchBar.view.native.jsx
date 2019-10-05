import React from 'react';
import { View } from 'react-native';
import { BodyCopy } from '../../../atoms';
import CustomIcon from '../../../atoms/Icon';
import { ICON_NAME, ICON_FONT_CLASS } from '../../../atoms/Icon/Icon.constants';
import constants from '../SearchBar.constants';
import styles, { TouchableOpacityContainer } from '../Searchbar.style.native';
import withStyles from '../../../hoc/withStyles';

/**
 * This component produces a Search Bar component for Header
 * This component uses BodyCopy atom and accepts all properties of BodyCopy
 * @param {*} props
 */
class SearchBar extends React.PureComponent {
  render() {
    return (
      <View {...this.props}>
        <TouchableOpacityContainer activeOpacity={1}>
          <CustomIcon
            iconFontName={ICON_FONT_CLASS.Icomoon}
            name={ICON_NAME.search}
            size="fs16"
            color="gray.900"
          />
          <BodyCopy
            fontWeight="regular"
            mobileFontFamily="secondary"
            fontSize="fs12"
            text={constants.SEARCH_PLACEHOLDER}
            color="gray.900"
          />
          <CustomIcon
            iconFontName={ICON_FONT_CLASS.Icomoon}
            name={ICON_NAME.qrcode}
            size="fs16"
            color="gray.600"
          />
        </TouchableOpacityContainer>
      </View>
    );
  }
}

export default withStyles(SearchBar, styles);
