import React from 'react';
import { PropTypes } from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import {
  BonusDayReadSection,
  BonusDayHeader,
  LeftHeaderContainer,
  RightHeaderContainer,
  BonusDayWrapper,
  DotActive,
  DotInactive,
} from '../styles/BonusPointsReadSection.style.native';

/* BonusPointsReadSection component is to show number of bonus days applied and left in dots representation */
export const BonusPointsReadSection = ({
  toggleBonusPointsModal,
  labels,
  availableBonusPointDays,
  usedBonusPointDays,
}) => {
  if (!availableBonusPointDays) {
    return null;
  }
  const availableDaysArray = Array(availableBonusPointDays).fill('');
  const usedDaysArray = usedBonusPointDays && Array(usedBonusPointDays).fill('');
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
            onPress={toggleBonusPointsModal}
            data-locator="accountoverview-myplacerewatdstile-bonuspointdetaillink"
            text={labels.lbl_bonus_points_detailLink}
          />
        </RightHeaderContainer>
      </BonusDayHeader>

      <BonusDayWrapper>
        <BodyCopy fontSize="fs14" fontWeight="regular" color="black" text={message} />
        {usedDaysArray.length > 0 && usedDaysArray.map(() => <DotInactive />)}
        {availableDaysArray.length > 0 && availableDaysArray.map(() => <DotActive />)}
      </BonusDayWrapper>
    </BonusDayReadSection>
  );
};

BonusPointsReadSection.propTypes = {
  availableBonusPointDays: PropTypes.number.isRequired,
  usedBonusPointDays: PropTypes.number.isRequired,
  toggleBonusPointsModal: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    lbl_bonus_points_daysLeft: PropTypes.string,
    lbl_bonus_points_bonusPointsDay: PropTypes.string,
    lbl_bonus_points_detailLink: PropTypes.string,
  }),
};

BonusPointsReadSection.defaultProps = {
  labels: PropTypes.shape({
    lbl_bonus_points_daysLeft: '',
    lbl_bonus_points_bonusPointsDay: '',
    lbl_bonus_points_detailLink: '',
  }),
};

export default BonusPointsReadSection;
