import React from 'react';
import { PropTypes } from 'prop-types';
import Anchor from '../../../../../atoms/Anchor';
import BodyCopy from '../../../../../atoms/BodyCopy/views/BodyCopy';
import {
  BonusDayReadSection,
  BonusDayHeader,
  LeftHeaderContainer,
  RightHeaderContainer,
  BonusDayWrapper,
  DotActive,
  DotInactive,
} from '../styles/BonusPointsReadSection.style.native';

export const BonusPointsReadSection = ({
  toggleBonusPointsModal,
  labels,
  availableBonusPointDays,
  usedBonusPointDays,
}) => {
  if (availableBonusPointDays === null) {
    return null;
  }
  const availableDaysArray = Array(availableBonusPointDays).fill('');
  const usedDaysArray = Array(usedBonusPointDays).fill('');
  const message = labels.lbl_bonus_points_daysLeft.replace(/\{0\}/, availableBonusPointDays);

  return (
    <BonusDayReadSection>
      <BonusDayHeader>
        <LeftHeaderContainer>
          <BodyCopy
            fontSize="fs14"
            fontWeight="semibold"
            data-locator="accountoverview-myplacerewatdstile-bonuspointdaytext"
            text={labels.lbl_bonus_points_bonusPointsDay}
          />
        </LeftHeaderContainer>
        <RightHeaderContainer>
          <Anchor
            anchorVariation="primary"
            fontSizeVariation="large"
            underline
            onPress={toggleBonusPointsModal}
            data-locator="accountoverview-myplacerewatdstile-bonuspointdetaillink"
            text={labels.lbl_bonus_points_detailLink}
          />
        </RightHeaderContainer>
      </BonusDayHeader>

      <BonusDayWrapper>
        <BodyCopy
          fontSize="fs14"
          fontWeight="regular"
          color="black"
          text={message}
          marginRight="10"
        />
        {usedDaysArray.map(() => (
          <DotInactive />
        ))}
        {availableDaysArray.map(() => (
          <DotActive />
        ))}
      </BonusDayWrapper>
    </BonusDayReadSection>
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
};

BonusPointsReadSection.defaultProps = {};

export default BonusPointsReadSection;
