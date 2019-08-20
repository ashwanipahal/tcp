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
  marginBottom: theme.spacing.ELEM_SPACING.LRG,
  fontSize: theme.typography.fontSizes.fs10,
  paddingRight: 5,
  paddingLeft: 5,
  paddingBottom: 5,
};

const graySecondary = theme.colorPalette.gray.secondary;
const grayPrimary = theme.colorPalette.gray.primary;

const BonusPointsAvailability = ({ bonusPoints }) => {
  const bonusPointsLength = bonusPoints && bonusPoints.length;

  return (
    <BtnWrapper>
      {bonusPoints &&
        bonusPoints.map((item, index) => {
          buttonStyle = Object.assign({}, buttonStyle, {
            color: item.disabled ? { graySecondary } : grayPrimary,
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
              />
            </MarginRightWrapper>
          );
        })}
    </BtnWrapper>
  );
};

BonusPointsAvailability.propTypes = {
  bonusPoints: PropTypes.shape([]),
};

BonusPointsAvailability.defaultProps = {
  bonusPoints: [{ disabled: false, buttonText: '' }],
};

export default BonusPointsAvailability;
