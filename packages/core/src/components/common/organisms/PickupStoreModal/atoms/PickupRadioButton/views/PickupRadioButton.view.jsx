import React from 'react';
import { PropTypes } from 'prop-types';
import LabeledRadioButton from '../../../../../atoms/LabeledRadioButton';
import BodyCopy from '../../../../../atoms/BodyCopy';

const PickStoreDetails = buttonLabel => {
  return (
    <BodyCopy fontSize="fs14" fontFamily="secondary">
      {buttonLabel}
    </BodyCopy>
  );
};

const PickStoreBOPISExtraDetails = BopisCtaProps => {
  const {
    pickupDate: { day, month, date },
    status,
  } = BopisCtaProps;
  return (
    <React.Fragment>
      <BodyCopy fontSize="fs12" fontFamily="secondary">
        {`${day}. ${month} ${date}`}
      </BodyCopy>
      {status && (
        <BodyCopy fontSize="fs12" fontFamily="secondary">
          {status}
        </BodyCopy>
      )}
    </React.Fragment>
  );
};

const PickStoreBOSSExtraDetails = BossCtaProps => {
  const { pickupLabel, startDate, endDate } = BossCtaProps;
  const colorBossDetail = ['text.primary', 'text.darkgray'];
  return (
    <React.Fragment>
      <BodyCopy
        as="span"
        fontSize={['fs12', 'fs10']}
        fontFamily="secondary"
        color={colorBossDetail}
      >
        {pickupLabel}
      </BodyCopy>
      <BodyCopy
        as="span"
        fontFamily="secondary"
        fontSize={['fs12', 'fs10']}
        fontWeight={['regular', 'extrabold']}
        color={colorBossDetail}
        className="hide-on-desktop hide-on-tablet"
      >
        {` ${startDate.month} ${startDate.date} - ${endDate.month} ${endDate.date}`}
      </BodyCopy>
      <BodyCopy
        as="span"
        fontFamily="secondary"
        fontSize={['fs12', 'fs10']}
        fontWeight={['regular', 'extrabold']}
        color={colorBossDetail}
        className="hide-on-mobile"
      >
        {` ${startDate.day}. ${startDate.month} ${startDate.date} - ${endDate.day}. ${
          endDate.month
        } ${endDate.date}`}
      </BodyCopy>
    </React.Fragment>
  );
};

export const PickupRadioButton = props => {
  const {
    handleClick,
    isSelected,
    radioGroupName,
    className,
    isBossPickupButton,
    BossCtaProps,
    BopisCtaProps,
  } = props;
  const pickupBtnLabel = isBossPickupButton ? BossCtaProps.buttonLabel : BopisCtaProps.buttonLabel;
  return (
    <LabeledRadioButton
      className={className}
      name={radioGroupName}
      onClick={() => handleClick(isBossPickupButton)}
      checked={isSelected}
      disabled={false}
    >
      {PickStoreDetails(pickupBtnLabel)}
      {isBossPickupButton && PickStoreBOSSExtraDetails(BossCtaProps)}
      {!isBossPickupButton && PickStoreBOPISExtraDetails(BopisCtaProps)}
    </LabeledRadioButton>
  );
};

PickupRadioButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  radioGroupName: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  className: PropTypes.string.isRequired,
  isBossPickupButton: PropTypes.bool,
  BossCtaProps: PropTypes.shape({
    endDate: PropTypes.shape({
      date: PropTypes.number,
      day: PropTypes.string,
      month: PropTypes.string,
    }),
    startDate: PropTypes.shape({
      date: PropTypes.number,
      day: PropTypes.string,
      month: PropTypes.string,
    }),
    buttonLabel: PropTypes.string,
  }),
  BopisCtaProps: PropTypes.shape({
    pickupDate: PropTypes.shape({
      date: PropTypes.number,
      day: PropTypes.string,
      month: PropTypes.string,
    }),
    buttonLabel: PropTypes.string,
    pickupLabel: PropTypes.string,
    status: PropTypes.string,
  }),
};

PickupRadioButton.defaultProps = {
  isSelected: false,
  isBossPickupButton: false,
  BossCtaProps: {},
  BopisCtaProps: {},
};

export default PickupRadioButton;
