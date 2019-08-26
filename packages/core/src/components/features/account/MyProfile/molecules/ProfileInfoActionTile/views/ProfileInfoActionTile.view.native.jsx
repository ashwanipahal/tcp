import React from 'react';
import { PropTypes } from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

import { ProfileInfoActionTileWrapper, DoneIconWrapper } from '../styles/ProfileInfoActionTile.style.native';
import { Image } from '../../../../../../common/atoms';

const noop = e => {
  e.preventDefault();
};

const doneIcon = require('@tcp/core/src/assets/done.png');

export const ProfileInfoActionTile = ({
  activityIcon,
  activityTitle,
  activityDescription,
  activityCompletionState,
  onClick,
  redirectTo,
}) => {
  const titleToShow = activityCompletionState || activityTitle;
  console.log('-------------activityIcon------------', activityIcon);
  const activityIconSrc = require(`@tcp/core/src/assets/${activityIcon}`);
  return (
    <ProfileInfoActionTileWrapper
      onPress={activityCompletionState ? noop : onClick}
      to={activityCompletionState ? '' : redirectTo}
      centered
    >
      {!!activityCompletionState && (
        <DoneIconWrapper
          alt={activityDescription}
          source={doneIcon}
          title={activityDescription}
        />
      )}
      <Image
        alt={activityDescription}
        source={activityIconSrc}
        width={60}
        height={100}
        title={activityDescription}
      />
      <BodyCopy
        textAlign="center"
        fontSize="fs16"
        fontWeight="extrabold"
        text={titleToShow}
      />
      <BodyCopy
        textAlign="center"
        fontSize="fs14"
        lineHeight="lh107"
        text={activityDescription}
      />
    </ProfileInfoActionTileWrapper>
  );
};

ProfileInfoActionTile.propTypes = {
  activityIcon: PropTypes.string,
  activityTitle: PropTypes.string,
  activityDescription: PropTypes.string,
  activityCompletionState: PropTypes.string,
  onClick: PropTypes.func,
  redirectTo: PropTypes.string,
};

ProfileInfoActionTile.defaultProps = {
  activityIcon: '',
  activityTitle: '',
  activityDescription: '',
  activityCompletionState: 'done',
  onClick: () => {},
  redirectTo: '',
};

export default ProfileInfoActionTile;
