import React from 'react';
import { PropTypes } from 'prop-types';
import { FlatList } from 'react-native';
import { Wrapper, ImageGridItem, Touchable } from '../styles/GetCandid.style.native';

class GetCandid extends React.PureComponent {
  static propTypes = {
    apiConfig: PropTypes.shape({}),
    candidData: PropTypes.shape({}),
    fetchCandidData: PropTypes.func,
  };

  static defaultProps = {
    apiConfig: {},
    candidData: {
      Settings: {},
      Views: [],
    },
    fetchCandidData: () => {},
  };

  componentDidMount() {
    const { apiConfig, fetchCandidData } = this.props;
    fetchCandidData(apiConfig);
  }

  keyExtractor = (_, index) => index.toString();

  renderItem = item => {
    const {
      item: {
        Media: {
          Images: { LowResolution },
        },
      },
      index,
    } = item;
    const image = LowResolution;
    return (
      <Touchable accessibilityRole="image">
        <ImageGridItem key={index.toString()} url={image.Url} height="103px" width="103px" />
      </Touchable>
    );
  };

  render() {
    const { candidData } = this.props;

    return (
      candidData && (
        <Wrapper>
          <FlatList
            numColumns={3}
            data={candidData}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </Wrapper>
      )
    );
  }
}

GetCandid.defaultProps = {
  apiConfig: {},
  candidData: {
    Settings: {},
    Views: [],
  },
  fetchCandidData: () => {},
};

GetCandid.propTypes = {
  apiConfig: PropTypes.shape({}),
  candidData: PropTypes.shape({}),
  fetchCandidData: PropTypes.func,
};

export default GetCandid;
export { GetCandid as GetCandidVanilla };
