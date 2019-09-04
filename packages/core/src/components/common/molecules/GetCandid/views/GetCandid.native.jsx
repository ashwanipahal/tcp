import React from 'react';
import { PropTypes } from 'prop-types';
import { FlatList } from 'react-native';

import Anchor from '../../../atoms/Anchor';
import BodyCopy from '../../../atoms/BodyCopy';
import {
  ImageGridItem,
  ImageWrapper,
  Title,
  Touchable,
  Wrapper,
} from '../styles/GetCandid.style.native';

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
        <ImageGridItem
          key={index.toString()}
          index={index}
          url={image.Url}
          height="103px"
          width="103px"
        />
      </Touchable>
    );
  };

  render() {
    const { candidData, labels } = this.props;
    const data = candidData && candidData.Views;

    return (
      <Wrapper>
        {labels && (
          <>
            <Title
              mobileFontFamily="primary"
              fontSize="fs20"
              fontWeight="semibold"
              color="gray.900"
              marginBottom="12px"
              text={labels.title}
              textAlign="center"
              letterSpacing="ls167"
            />
            <BodyCopy
              mobileFontFamily="primary"
              fontSize="fs14"
              fontWeight="regular"
              color="gray.900"
              text={labels.titleDescription}
              textAlign="center"
            />
          </>
        )}
        {data && (
          <ImageWrapper>
            <FlatList
              numColumns={3}
              data={data.slice(0, 9)}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          </ImageWrapper>
        )}
        {labels && (
          <Anchor
            fontFamily="secondary"
            color="gray.900"
            anchorVariation="primary"
            noLink
            dataLocator=""
            text={labels.btnSeeMore}
            visible
          />
        )}
      </Wrapper>
    );
  }
}

GetCandid.defaultProps = {
  apiConfig: {},
  candidData: {
    Settings: {},
    Views: [],
    Tags: [],
  },
  labels: {
    title: 'title',
    titleDescripton: 'titleDescripton',
    btnSeeMore: 'btnSeeMore',
  },
  fetchCandidData: () => {},
};

GetCandid.propTypes = {
  apiConfig: PropTypes.shape({}),
  candidData: PropTypes.shape({}),
  fetchCandidData: PropTypes.func,
  labels: PropTypes.shape({}),
};

export default GetCandid;
export { GetCandid as GetCandidVanilla };
