import React from 'react';
import { PropTypes } from 'prop-types';
import Anchor from '../../../../../../common/atoms/Anchor';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/BonusPointsReadSection.style';
import BodyCopy from '../../../../../../common/atoms/BodyCopy/views/BodyCopy';

export const BonusPointsReadSection = ({ toggleBonusPointsModal, labels, availableBonusPointDays, usedBonusPointDays, className }) => {
  const availableDaysArray = Array(availableBonusPointDays).fill('');
  const usedDaysArray = Array(usedBonusPointDays).fill('');
  const message = labels.lbl_bonus_points_daysLeft.replace(/\{0\}/, availableBonusPointDays);

  return (
    <BodyCopy component="div" className={`${className} elem-pt-LRG`}>
      <BodyCopy component="div" className="bonusPointDayHeading elem-mb-XS">
        <BodyCopy fontSize="fs14" fontWeight="semibold">{labels.lbl_bonus_points_bonusPointsDay}</BodyCopy>
        <Anchor
          anchorVariation="primary"
          fontSizeVariation="large"
          underline
          onClick={toggleBonusPointsModal}
        >
          {labels.lbl_bonus_points_detailLink}
        </Anchor>
      </BodyCopy>
      <BodyCopy fontSize="fs14" component="div">
        {message}
        {usedDaysArray.map(() => (<span className="dot filled elem-ml-XS" />))}
        {availableDaysArray.map(() => (<span className="dot elem-ml-XXS" />))}
      </BodyCopy>
    </BodyCopy>
  );
};

BonusPointsReadSection.propTypes = {
  availableBonusPointDays: PropTypes.number.isRequired,
  usedBonusPointDays: PropTypes.number.isRequired,
  toggleBonusPointsModal: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    lbl_bonus_points_daysLeft: PropTypes.string.isRequired,
    lbl_bonus_points_bonusPointsDay: PropTypes.string.isRequired,
    lbl_bonus_points_detailLink: PropTypes.string.isRequired
  }).isRequired,
  className: PropTypes.string,
};

BonusPointsReadSection.defaultProps = {
  className: ''
};

export default withStyles(BonusPointsReadSection, styles);
