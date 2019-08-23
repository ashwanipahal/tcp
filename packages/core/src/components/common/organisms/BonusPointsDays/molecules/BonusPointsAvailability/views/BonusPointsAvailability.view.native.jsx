import React from 'react';
import PropTypes from 'prop-types';
import theme from '@tcp/core/styles/themes/TCP';
import Button from '../../../../../atoms/Button';
import {
  BtnWrapper,
  MarginRightWrapper,
} from '../styles/BonusPointsAvailability.view.style.native';

let buttonStyle = {
  fontWeight: theme.typography.fontWeights.regular,
  marginBottom: 24,
  fontSize: 10,
  paddingRight: 5,
  paddingLeft: 5,
  paddingBottom: 5,
};

const graySecondary = theme.colorPalette.gray.secondary;
const grayPrimary = theme.colorPalette.gray.primary;

const applyBonusPoints = (getBonusDaysData, orderDetails, bonusDayAvailableToday) => {
  const dto = {
    bonusDaySelected: bonusDayAvailableToday ? 0 : 1,
    orderId: orderDetails,
  };
  return getBonusDaysData(dto);
};

const BonusPointsAvailability = ({
  bonusPoints,
  getBonusDaysData,
  orderDetails,
  bonusDayAvailableToday,
}) => {
  const bonusPointsLength = bonusPoints && bonusPoints.length;

  return (
    <BtnWrapper>
      {bonusPoints &&
        bonusPoints.map((item, index) => {
          buttonStyle = Object.assign({}, buttonStyle, {
            color: item.disabled ? graySecondary : grayPrimary,
            paddingTop: bonusPointsLength === 1 ? 14 : 5,
          });
          return (
            <MarginRightWrapper bonusPointsLength={bonusPointsLength}>
              <Button
                buttonVariation="variable-width"
                width={bonusPointsLength === 1 ? '225px' : '103px'}
                height="42px"
                id={index}
                data-locator={item.dataLocator}
                text={item.buttonText}
                style={buttonStyle}
                disableButton
                onPress={() =>
                  applyBonusPoints(getBonusDaysData, orderDetails, bonusDayAvailableToday)
                }
              />
            </MarginRightWrapper>
          );
        })}
    </BtnWrapper>
  );
};

BonusPointsAvailability.propTypes = {
  bonusPoints: PropTypes.shape([]),
  getBonusDaysData: PropTypes.shape({}),
  orderDetails: PropTypes.shape({}),
  bonusDayAvailableToday: PropTypes.bool,
};

BonusPointsAvailability.defaultProps = {
  bonusPoints: [{ disabled: false, buttonText: '' }],
  getBonusDaysData: {},
  orderDetails: {},
  bonusDayAvailableToday: false,
};

export default BonusPointsAvailability;
