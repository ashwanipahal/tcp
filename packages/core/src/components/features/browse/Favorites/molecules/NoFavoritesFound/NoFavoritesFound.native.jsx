import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import { Col, Row, BodyCopy } from '@tcp/core/src/components/common/atoms';

export const renderText = (headerText, bodyText) => {
  return (
    <Col colSize={{ large: 12, medium: 8, small: 6 }} className="no-favorite-container">
      <BodyCopy
        className="no-favorite-heading"
        fontFamily="secondary"
        fontWeight="extrabold"
        fontSize="fs22"
        aria-hidden="true"
        tabIndex="-1"
        textAlign="center"
        text={headerText}
      />
      <BodyCopy
        className="no-favorite-text"
        fontFamily="secondary"
        fontSize="fs16"
        aria-hidden="true"
        tabIndex="-1"
        textAlign="center"
        text={bodyText}
      />
    </Col>
  );
};

const NoFavoritesFound = props => {
  const { labels } = props;
  return (
    <View {...props}>
      <Row className="no-favorites-found">
        {renderText(labels.lbl_dont_have_favorites, labels.lbl_add_favorite_to_your_list)}
        {renderText(labels.lbl_inspiration_required, labels.lbl_items_to_favorite)}
      </Row>
    </View>
  );
};

NoFavoritesFound.propTypes = {
  labels: PropTypes.shape({}),
};

NoFavoritesFound.defaultProps = {
  labels: {},
};

export default NoFavoritesFound;
