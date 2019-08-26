import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

import { ProfileInfoActionTileWrapper, DoneIconWrapper, TileIconWrapper } from '../styles/ProfileInfoActionTile.style.native';

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
      <TileIconWrapper
        alt={activityDescription}
        source={activityIcon}
        title={activityDescription}
      />
      <View>
        <BodyCopy
          textAlign="center"
          fontSize="fs16"
          fontWeight="semibold"
          text={titleToShow}
        />
        <BodyCopy
          textAlign="center"
          fontSize="fs14"
          text={activityDescription}
        />
      </View>
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
  activityCompletionState: '',
  onClick: () => {},
  redirectTo: '',
};

export default ProfileInfoActionTile;
