import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import Anchor from '../../../atoms/Anchor';

class GetCandidGallery extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <React.Fragment>
        <Text>Get Candid Gallery</Text>
        <Anchor
          fontFamily="secondary"
          color="gray.900"
          anchorVariation="primary"
          noLink
          dataLocator=""
          text="<< go back"
          onPress={() => navigation.navigate('Home')}
        />
      </React.Fragment>
    );
  }
}

GetCandidGallery.propTypes = {
  navigation: PropTypes.shape({}),
};

GetCandidGallery.defaultProps = {
  navigation: PropTypes.shape({}),
};

export default GetCandidGallery;
