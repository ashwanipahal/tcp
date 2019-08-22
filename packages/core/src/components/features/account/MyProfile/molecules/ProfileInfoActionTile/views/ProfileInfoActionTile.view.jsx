import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';

import Anchor from '../../../../../../common/atoms/Anchor';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

import styles from '../styles/ProfileInfoActionTile.style';
import { getIconPath } from '../../../../../../../utils';
import { Image } from '../../../../../../common/atoms';

const noop = e => {
  e.preventDefault();
};

export const ProfileInfoActionTile = ({
  className,
  activityIcon,
  activityTitle,
  activityDescription,
  activityCompletionState,
  onClick,
  redirectTo,
  dataLocatorPrefix,
}) => {
  const titleToShow = activityCompletionState || activityTitle;

  return (
    <Anchor
      onClick={activityCompletionState ? noop : onClick}
      to={activityCompletionState ? '' : redirectTo}
      className={className}
      centered
    >
      {activityCompletionState && (
        <Image
          className="activity-complete-icon"
          alt={activityDescription}
          src={getIconPath('icon-done')}
          title={activityDescription}
          data-locator={`${dataLocatorPrefix}ChkmarkIcon`}
        />
      )}
      <BodyCopy className="img-cont" component="div" textAlign="center">
        <Image
          alt={activityDescription}
          src={activityIcon}
          title={activityDescription}
          className="tile-icon"
          data-locator={`${dataLocatorPrefix}Img`}
        />
      </BodyCopy>
      <BodyCopy className="msg-cont elem-pl-SM elem-pr-SM" component="div">
        <BodyCopy
          textAlign="center"
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="extrabold"
          data-locator={`${dataLocatorPrefix}StatusTxt`}
        >
          {titleToShow}
        </BodyCopy>
        <BodyCopy
          textAlign="center"
          fontFamily="secondary"
          fontSize="fs14"
          lineHeight="lh107"
          data-locator={`${dataLocatorPrefix}Text`}
        >
          {activityDescription}
        </BodyCopy>
      </BodyCopy>
    </Anchor>
  );
};

ProfileInfoActionTile.propTypes = {
  activityIcon: PropTypes.string,
  activityTitle: PropTypes.string,
  activityDescription: PropTypes.string,
  activityCompletionState: PropTypes.string,
  onClick: PropTypes.func,
  redirectTo: PropTypes.string,
  className: PropTypes.string,
  dataLocatorPrefix: PropTypes.string,
};

ProfileInfoActionTile.defaultProps = {
  activityIcon: '',
  activityTitle: '',
  activityDescription: '',
  activityCompletionState: '',
  onClick: () => {},
  redirectTo: '',
  className: '',
  dataLocatorPrefix: '',
};

export default withStyles(ProfileInfoActionTile, styles);
