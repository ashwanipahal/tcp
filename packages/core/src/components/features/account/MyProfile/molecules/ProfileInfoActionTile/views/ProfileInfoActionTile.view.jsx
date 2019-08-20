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
          src={getIconPath('active_icon')}
          title={activityDescription}
        />
      )}
      <BodyCopy className="img-cont" component="div" textAlign="center">
        <Image
          alt={activityDescription}
          src={activityIcon}
          title={activityDescription}
          className="tile-icon"
        />
      </BodyCopy>
      <BodyCopy className="msg-cont" component="div">
        <BodyCopy textAlign="center" fontFamily="secondary" fontSize="fs16" fontWeight="extrabold">
          {titleToShow}
        </BodyCopy>
        <BodyCopy textAlign="center" fontFamily="secondary">
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
};

ProfileInfoActionTile.defaultProps = {
  activityIcon: '',
  activityTitle: '',
  activityDescription: '',
  activityCompletionState: '',
  onClick: () => {},
  redirectTo: '',
  className: '',
};

export default withStyles(ProfileInfoActionTile, styles);
