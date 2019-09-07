import React from 'react';
import PropTypes from 'prop-types';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import {
  BtnWrapper,
  StyledTouchableOpacity,
  StyledView,
} from '../styles/BonusPointsAvailability.view.style.native';

const colorPalette = createThemeColorPalette();

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
  return (
    <BtnWrapper>
      {bonusPoints &&
        bonusPoints.map((item, index) => {
          const Component = item.disabled ? StyledView : StyledTouchableOpacity;
          const componentProps = item.disabled
            ? {}
            : {
                onPress: () =>
                  applyBonusPoints(getBonusDaysData, orderDetails, bonusDayAvailableToday),
              };
          return (
            <Component {...componentProps} key={item.id} index={index}>
              <BodyCopy
                fontSize="fs10"
                fontWeight="extrabold"
                fontFamily="secondary"
                letterSpacing="ls071"
                color={colorPalette.gray[400]}
                text={item.buttonText}
                textAlign="center"
              />
            </Component>
          );
        })}
    </BtnWrapper>
  );
};

BonusPointsAvailability.propTypes = {
  bonusPoints: PropTypes.shape([]),
  getBonusDaysData: PropTypes.func,
  orderDetails: PropTypes.shape({}),
  bonusDayAvailableToday: PropTypes.bool,
};

BonusPointsAvailability.defaultProps = {
  bonusPoints: [{ disabled: false, buttonText: '' }],
  getBonusDaysData: () => {},
  orderDetails: {},
  bonusDayAvailableToday: false,
};

export default BonusPointsAvailability;
