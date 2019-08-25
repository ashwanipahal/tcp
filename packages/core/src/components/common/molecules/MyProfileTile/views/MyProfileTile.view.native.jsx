import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import {
  BodyCopyWithSpacing,
  ViewWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';

export const MyProfileTile = ({ title, ctaTitle, ctaLink, children, handleComponentChange }) => {
  const isCtaPresent = !!ctaTitle;
  return (
    <ViewWithSpacing spacingStyles="margin-bottom-XXXL">
      {!!title && (
        <BodyCopyWithSpacing
          text={title}
          fontSize="fs16"
          fontWeight="extrabold"
          fontFamily="secondary"
          spacingStyles="margin-bottom-MED"
        />
      )}
      <ViewWithSpacing spacingStyles={isCtaPresent ? 'margin-bottom-XXXL' : ''}>
        {children}
      </ViewWithSpacing>
      {isCtaPresent && (
        <CustomButton
          fill="BLUE"
          buttonVariation="variable-width"
          text={ctaTitle}
          color="white"
          onPress={() => {
            handleComponentChange(ctaLink);
          }}
        />
      )}
    </ViewWithSpacing>
  );
};

MyProfileTile.propTypes = {
  title: PropTypes.string,
  ctaTitle: PropTypes.string,
  ctaLink: PropTypes.string,
  children: PropTypes.node.isRequired,
  handleComponentChange: PropTypes.func,
};

MyProfileTile.defaultProps = {
  title: '',
  ctaTitle: '',
  ctaLink: 'accountOverviewMobile',
  handleComponentChange: () => {},
};

export default MyProfileTile;
