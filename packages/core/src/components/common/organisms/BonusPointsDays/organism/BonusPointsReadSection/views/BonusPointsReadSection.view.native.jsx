import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import Anchor from '../../../../../atoms/Anchor';
import BodyCopy from '../../../../../atoms/BodyCopy/views/BodyCopy';

export const BonusPointsReadSection = ({
  toggleBonusPointsModal,
  labels,
  availableBonusPointDays,
  usedBonusPointDays,
  className,
}) => {
  if (availableBonusPointDays === null) {
    return null;
  }
  const availableDaysArray = Array(availableBonusPointDays).fill('');
  const usedDaysArray = Array(usedBonusPointDays).fill('');
  const message = labels.lbl_bonus_points_daysLeft.replace(/\{0\}/, availableBonusPointDays);

  return (
    <View>
      <BodyCopy
        fontSize="fs14"
        fontWeight="semibold"
        data-locator="accountoverview-myplacerewatdstile-bonuspointdaytext"
        text={labels.lbl_bonus_points_bonusPointsDay}
      />
      <Anchor
        anchorVariation="primary"
        fontSizeVariation="large"
        underline
        onClick={toggleBonusPointsModal}
        data-locator="accountoverview-myplacerewatdstile-bonuspointdetaillink"
        text={labels.lbl_bonus_points_detailLink}
      />
    </View>
  );
};

BonusPointsReadSection.propTypes = {
  availableBonusPointDays: PropTypes.number.isRequired,
  usedBonusPointDays: PropTypes.number.isRequired,
  toggleBonusPointsModal: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    lbl_bonus_points_daysLeft: PropTypes.string.isRequired,
    lbl_bonus_points_bonusPointsDay: PropTypes.string.isRequired,
    lbl_bonus_points_detailLink: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

BonusPointsReadSection.defaultProps = {
  className: '',
};

export default BonusPointsReadSection;
