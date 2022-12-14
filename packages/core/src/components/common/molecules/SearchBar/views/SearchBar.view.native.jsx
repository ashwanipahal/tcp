import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { BodyCopy } from '../../../atoms';
import CustomIcon from '../../../atoms/Icon';
import { ICON_NAME, ICON_FONT_CLASS } from '../../../atoms/Icon/Icon.constants';
import QRScannerIcon from '../../../atoms/QRScannerIcon';

import styles, {
  TouchableOpacityContainer,
  ViewContainer,
  TouchableQRContainer,
  ViewQRContainer,
} from '../Searchbar.style.native';
import withStyles from '../../../hoc/withStyles';

/**
 * This component produces a Search Bar component for Header
 * This component uses BodyCopy atom and accepts all properties of BodyCopy
 * @param {*} props
 */
class SearchBar extends React.PureComponent {
  onSearchFocus = () => {
    const { openSearchProductPage } = this.props;
    if (openSearchProductPage) openSearchProductPage();
  };

  render() {
    const { showCustomizedSearch, labels, navigation } = this.props;
    if (showCustomizedSearch) {
      return (
        <ViewContainer>
          <TouchableOpacityContainer width="200px" activeOpacity={1} onPress={this.onSearchFocus}>
            <BodyCopy
              fontWeight="regular"
              mobileFontFamily="secondary"
              fontSize="fs12"
              text={getLabelValue(labels, 'lbl_looking_for')}
              color="gray.900"
            />
            <CustomIcon
              iconFontName={ICON_FONT_CLASS.Icomoon}
              name={ICON_NAME.search}
              size="fs16"
              color="gray.900"
            />
          </TouchableOpacityContainer>
        </ViewContainer>
      );
    }

    return (
      <ViewQRContainer {...this.props}>
        <TouchableOpacityContainer activeOpacity={1} width="95%" onPress={this.onSearchFocus}>
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
            text={getLabelValue(labels, 'lbl_looking_for')}
            color="gray.900"
          />
          <TouchableQRContainer activeOpacity={1} width="50px">
            <QRScannerIcon size="fs16" navigation={navigation} />
          </TouchableQRContainer>
        </TouchableOpacityContainer>
      </ViewQRContainer>
    );
  }
}

SearchBar.propTypes = {
  openSearchProductPage: PropTypes.func,
  showCustomizedSearch: PropTypes.bool,
  labels: PropTypes.shape({
    lbl_search_whats_trending: PropTypes.string,
    lbl_search_recent_search: PropTypes.string,
    lbl_search_looking_for: PropTypes.string,
    lbl_search_product_matches: PropTypes.string,
  }),
  navigation: PropTypes.shape({}).isRequired,
};

SearchBar.defaultProps = {
  openSearchProductPage: null,
  showCustomizedSearch: false,
  labels: PropTypes.shape({
    lbl_search_whats_trending: '',
    lbl_search_recent_search: '',
    lbl_search_looking_for: '',
    lbl_search_product_matches: '',
  }),
};

export default withStyles(SearchBar, styles);
export { SearchBar as SearchBarVanilla };
