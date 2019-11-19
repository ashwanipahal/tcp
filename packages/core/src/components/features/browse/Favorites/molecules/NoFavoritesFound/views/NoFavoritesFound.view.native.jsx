import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { NoFavoriteContainer } from '../../../styles/Favorites.style.native';

const renderText = (headerText, bodyText) => {
  return (
    <NoFavoriteContainer>
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
        margin="12px 0 0 0"
      />
    </NoFavoriteContainer>
  );
};

const NoFavoritesFound = props => {
  const { labels } = props;
  return (
    <View>
      {renderText(labels.lbl_dont_have_favorites, labels.lbl_add_favorite_to_your_list)}
      {renderText(labels.lbl_inspiration_required, labels.lbl_items_to_favorite)}
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
