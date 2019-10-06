import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { BodyCopy } from '../../../../common/atoms/index.native';
import withStyles from '../../../../common/hoc/withStyles.native';
import searchLabels from '../searchDetail.constants';
import styles from '../SearchDetail.style.native';

class SearchDetail extends React.PureComponent {
  render() {
    const { SEARCHED_FOR } = searchLabels;
    const { searchedText } = this.props;
    return (
      <View {...this.props}>
        {searchedText.length > 0 && (
          <View>
            <BodyCopy color="gray.900" fontFamily="secondary" fontSize="fs14" text={SEARCHED_FOR} />
            <BodyCopy
              color="gray.900"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize="fs16"
              text={`"${searchedText}"`}
            />
          </View>
        )}
      </View>
    );
  }
}

SearchDetail.propTypes = {
  searchedText: PropTypes.string,
};

SearchDetail.defaultProps = {
  searchedText: '',
};

export default withStyles(SearchDetail, styles);

export { SearchDetail as SearchDetailVanilla };
