import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../BodyCopy';
import CustomIcon from '../../Icon';
import { ICON_NAME } from '../../Icon/Icon.constants';
import { ViewWithSpacing } from '../../styledWrapper/styledWrapper.native';
import { BadgeView, DefaultBadgeView, PrimaryBadgeView } from '../Badge.style.native';

const Badge = ({ children, dataLocator, primary, lightGrayColor }) => {
  const BadgeViewWrapper = primary || lightGrayColor ? PrimaryBadgeView : DefaultBadgeView;

  return (
    <BadgeViewWrapper data-locator={dataLocator} lightGrayColor={lightGrayColor}>
      <BadgeView>
        {!primary && (
          <ViewWithSpacing spacingStyles="margin-right-XXS margin-top-XXXS margin-bottom-XXXS">
            <CustomIcon name={ICON_NAME.checkmark} size="fs9" color="white" />
          </ViewWithSpacing>
        )}
        <BodyCopy
          fontFamily="secondary"
          fontWeight="extrabold"
          fontSize="fs10"
          color="white"
          text={children}
        />
      </BadgeView>
    </BadgeViewWrapper>
  );
};

Badge.propTypes = {
  children: PropTypes.string,
  dataLocator: PropTypes.string,
  primary: PropTypes.bool,
  lightGrayColor: PropTypes.bool,
};

Badge.defaultProps = {
  children: '',
  dataLocator: '',
  primary: false,
  lightGrayColor: false,
};

export default Badge;
