import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

import {
  ProfileInfoActionTileWrapper,
  DoneIconWrapper,
  TileIconWrapper,
} from '../styles/ProfileInfoActionTile.style.native';

const noop = () => {};

const doneIcon = require('@tcp/core/src/assets/done.png');

export const ProfileInfoActionTile = ({
  activityIcon,
  activityTitle,
  activityDescription,
  activityCompletionState,
  handleComponentChange,
}) => {
  const titleToShow = activityCompletionState || activityTitle;
  return (
    <ProfileInfoActionTileWrapper onPress={activityCompletionState ? noop : handleComponentChange}>
      {!!activityCompletionState && (
        <DoneIconWrapper alt={activityDescription} source={doneIcon} title={activityDescription} />
      )}
      <TileIconWrapper
        alt={activityDescription}
        source={activityIcon}
        title={activityDescription}
        resizeMode="contain"
      />
      <View>
        <BodyCopy
          textAlign="center"
          fontSize="fs16"
          fontFamily="secondary"
          fontWeight="semibold"
          text={titleToShow}
        />
        <BodyCopy
          textAlign="center"
          fontSize="fs14"
          fontFamily="secondary"
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
  handleComponentChange: PropTypes.func,
};

ProfileInfoActionTile.defaultProps = {
  activityIcon: '',
  activityTitle: '',
  activityDescription: '',
  activityCompletionState: '',
  handleComponentChange: () => {},
};

export default ProfileInfoActionTile;
