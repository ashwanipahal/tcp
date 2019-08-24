import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import {
  StyledTile,
  BodyCopyWithMEDMargin
} from '../styles/MyProfileTile.style.native';

export const MyProfileTile = ({
  title,
  ctaTitle,
  ctaLink,
  ctaPath,
  children,
  dataLocator,
}) => {
  return (
    <StyledTile>
      {!!title && (
        <BodyCopyWithMEDMargin
          text={title}
          fontSize="fs16"
          fontWeight="extrabold"
          fontFamily="secondary"
        />
      )}
      <View>{children}</View>
      {!!ctaTitle && (
        <CustomButton
          fill="BLUE"
          buttonVariation="variable-width"
          text={ctaTitle}
          color="white"
          onPress={() => {}}
        />
      )}
    </StyledTile>
  );
};

MyProfileTile.propTypes = {
  title: PropTypes.string,
  ctaTitle: PropTypes.string,
  ctaLink: PropTypes.string,
  ctaPath: PropTypes.string,
  children: PropTypes.node.isRequired,
  dataLocator: PropTypes.string,
};

MyProfileTile.defaultProps = {
  title: '',
  ctaTitle: '',
  ctaLink: '',
  ctaPath: '',
  dataLocator: '',
};

export default MyProfileTile;
