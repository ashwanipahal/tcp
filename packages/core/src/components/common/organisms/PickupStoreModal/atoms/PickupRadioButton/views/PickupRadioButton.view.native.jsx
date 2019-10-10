import React from 'react';
import { PropTypes } from 'prop-types';
import LabeledRadioButton from '@tcp/core/src/components/common/atoms/LabeledRadioButton';
import { withTheme } from 'styled-components';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';

const PickStoreBOPISExtraDetails = BopisCtaProps => {
  const {
    pickupDate: { day, month, date },
    status,
  } = BopisCtaProps;
  return (
    <React.Fragment>
      <BodyCopyWithSpacing
        fontSize="fs12"
        fontFamily="secondary"
        text={`${day}. ${month} ${date}`}
        spacingStyles="padding-left-LRG"
      />
      {status && (
        <BodyCopyWithSpacing
          fontSize="fs12"
          fontFamily="secondary"
          text={status}
          spacingStyles="padding-left-LRG"
        />
      )}
    </React.Fragment>
  );
};

const PickStoreBOSSExtraDetails = BossCtaProps => {
  const { pickupLabel, startDate, endDate } = BossCtaProps;
  return (
    <BodyCopyWithSpacing
      fontSize="fs12"
      fontFamily="secondary"
      fontWeight="regular"
      color="text.primary"
      spacingStyles="padding-left-LRG"
      text={`${pickupLabel} ${startDate.month} ${startDate.date} - ${endDate.month} ${
        endDate.date
      }`}
    />
  );
};

export const PickupRadioButton = props => {
  const {
    handleClick,
    isSelected,
    radioGroupName,
    isBossPickupButton,
    BossCtaProps,
    BopisCtaProps,
    theme,
  } = props;
  const pickupBtnLabel = isBossPickupButton ? BossCtaProps.buttonLabel : BopisCtaProps.buttonLabel;
  const RadioButtonLabelStyle = {
    fontSize: 14,
    fontFamily: theme.typography.fonts.secondary,
  };
  return (
    <>
      <LabeledRadioButton
        name={radioGroupName}
        onPress={() => handleClick(isBossPickupButton)}
        checked={isSelected}
        disabled={false}
        buttonSize={7}
        buttonOuterSize={15}
        obj={{
          label: pickupBtnLabel,
          value: pickupBtnLabel,
        }}
        labelStyle={RadioButtonLabelStyle}
      />
      {isBossPickupButton && PickStoreBOSSExtraDetails(BossCtaProps)}
      {!isBossPickupButton && PickStoreBOPISExtraDetails(BopisCtaProps)}
    </>
  );
};

PickupRadioButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  radioGroupName: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  isBossPickupButton: PropTypes.bool,
  theme: PropTypes.shape({}).isRequired,
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

export default withTheme(PickupRadioButton);
