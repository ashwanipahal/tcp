import React from 'react';
import BodyCopy from '../../BodyCopy';
import CustomIcon from '../../Icon';
import { ICON_NAME } from '../../Icon/Icon.constants';
import { BadgeView, DefaultBadgeView, PrimaryBadgeView } from '../Badge.style.native';

// @flow

type Props = {
  children: string,
  dataLocator: ?string,
  primary: ?boolean,
};

const Badge = ({ children, dataLocator, primary }: Props) => {
  const BadgeViewWrapper = primary ? PrimaryBadgeView : DefaultBadgeView;

  return (
    <BadgeViewWrapper data-locator={dataLocator}>
      <BadgeView>
        {!primary && <CustomIcon name={ICON_NAME.checkmark} size={10} color="white" />}
        <BodyCopy
          mobilefontFamily={['secondary']}
          fontWeight="semibold"
          fontSize="fs10"
          color="white"
          text={children}
        />
      </BadgeView>
    </BadgeViewWrapper>
  );
};

export default Badge;
