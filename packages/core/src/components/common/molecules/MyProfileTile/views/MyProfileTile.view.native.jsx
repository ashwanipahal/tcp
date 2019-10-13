import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import {
  BodyCopyWithSpacing,
  ViewWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';

export const MyProfileTile = ({
  title,
  ctaTitle,
  ctaLink,
  children,
  handleComponentChange,
  birthdaySaving,
}) => {
  const isCtaPresent = !!ctaTitle;

  const styling = () => {
    if (isCtaPresent) {
      if (birthdaySaving) {
        return 'margin-bottom-LRG';
      }
      return 'margin-bottom-XXL';
    }
    return '';
  };

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
      <ViewWithSpacing spacingStyles={styling()}>{children}</ViewWithSpacing>
      {isCtaPresent && (
        <CustomButton
          fill="BLUE"
          text={ctaTitle}
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
  birthdaySaving: PropTypes.bool,
};

MyProfileTile.defaultProps = {
  title: '',
  ctaTitle: '',
  ctaLink: 'accountOverviewMobile',
  handleComponentChange: () => {},
  birthdaySaving: false,
};

export default MyProfileTile;
