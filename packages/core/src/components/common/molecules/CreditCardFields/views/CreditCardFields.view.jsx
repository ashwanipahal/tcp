import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Col, Row, TextBox } from '../../../atoms';
import Select from '../../../atoms/Select';
import CreditCardNumber from '../../../atoms/CreditCardNumber';
import { getCreditCardExpirationOptionMap } from '../../../../../utils';
import styles from '../styles/CreditCardFields.style';
import withStyles from '../../../hoc/withStyles';

export const handleEditCreditCardNumber = value => {
  return value.startsWith('*') ? '' : value;
};

const CardNumberField = ({
  cardTypeImgUrl,
  cardType,
  isPLCCEnabled,
  creditFieldLabels,
  onCardFocus,
}) => {
  return (
    <Field
      placeholder={creditFieldLabels.creditCardNumber}
      name="cardNumber"
      id="cardNumber"
      type="tel"
      onFocus={onCardFocus}
      component={CreditCardNumber}
      dataLocator="cardNbrTxtBox"
      cardTypeImgUrl={cardTypeImgUrl}
      isPLCCEnabled={isPLCCEnabled}
      cardType={cardType}
      className="field"
      enableSuccessCheck={false}
      normalize={handleEditCreditCardNumber}
    />
  );
};

export const CreditCardFields = ({
  creditFieldLabels,
  cardTypeImgUrl,
  isExpirationRequired,
  isPLCCEnabled,
  cardType,
  className,
  cardNumbProps,
  expMonthProps,
  expYearProps,
  cvvProps,
  cvvInfo,
  syncErrors,
  showCvv,
  cardNumberWrapper,
  cardNumberInnerProps,
  onCardFocus,
}) => {
  const expMonthOptionsMap = getCreditCardExpirationOptionMap().monthsMap;
  const expYearOptionsMap = getCreditCardExpirationOptionMap().yearsMap;
  return (
    <Row fullBleed className={className} syncErrors={syncErrors}>
      <Col {...cardNumbProps}>
        {cardNumberWrapper ? (
          <Row fullBleed>
            <Col {...cardNumberInnerProps}>
              {CardNumberField({
                cardTypeImgUrl,
                cardType,
                isPLCCEnabled,
                creditFieldLabels,
                onCardFocus,
              })}
            </Col>
          </Row>
        ) : (
          CardNumberField({
            cardTypeImgUrl,
            cardType,
            isPLCCEnabled,
            creditFieldLabels,
            onCardFocus,
          })
        )}
      </Col>
      {isExpirationRequired && (
        <React.Fragment>
          <Col {...expMonthProps}>
            <Field
              placeholder={creditFieldLabels.expMonth}
              name="expMonth"
              id="expMonth"
              component={Select}
              dataLocator="expMonthDropDown"
              options={expMonthOptionsMap}
              className="field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col {...expYearProps} className="exp-year-field">
            <Field
              placeholder={creditFieldLabels.expYear}
              name="expYear"
              id="expYear"
              component={Select}
              dataLocator="expYearDropDown"
              options={expYearOptionsMap}
              className="field"
              enableSuccessCheck={false}
            />
          </Col>
          {showCvv && (
            <Col {...cvvProps} className="cvv-field">
              <Field
                placeholder={creditFieldLabels.cvvCode}
                name="cvvCode"
                id="cvvCode"
                component={TextBox}
                dataLocator="cvvTxtBox"
                maxLength="4"
                enableSuccessCheck={false}
              />
              <Field name="cardType" id="cardType" component={TextBox} type="hidden" />
              <span className="cvv-icon">{cvvInfo}</span>
            </Col>
          )}
        </React.Fragment>
      )}
    </Row>
  );
};

CreditCardFields.propTypes = {
  creditFieldLabels: PropTypes.shape({}),
  onCardFocus: PropTypes.func,
  isExpirationRequired: PropTypes.bool,
  cardTypeImgUrl: PropTypes.string,
  isPLCCEnabled: PropTypes.bool,
  cardType: PropTypes.string,
  expMonthOptionsMap: PropTypes.shape([]).isRequired,
  expYearOptionsMap: PropTypes.shape([]).isRequired,
  className: PropTypes.string,
  cardNumbProps: PropTypes.shape({}).isRequired,
  expMonthProps: PropTypes.shape({}).isRequired,
  expYearProps: PropTypes.shape({}).isRequired,
  cvvProps: PropTypes.shape({}),
  cvvInfo: PropTypes.shape({}).isRequired,
  syncErrors: PropTypes.shape({}),
  showCvv: PropTypes.bool,
  cardNumberWrapper: PropTypes.bool,
  cardNumberInnerProps: PropTypes.shape({}),
};

CreditCardFields.defaultProps = {
  creditFieldLabels: {
    creditCardNumber: '',
    expMonth: '',
    expYear: '',
    cvvCode: '',
  },
  isExpirationRequired: true,
  cardTypeImgUrl: '',
  cardType: '',
  isPLCCEnabled: true,
  className: '',
  syncErrors: null,
  cvvProps: {},
  showCvv: true,
  cardNumberWrapper: false,
  cardNumberInnerProps: null,
  onCardFocus: () => {},
};

CardNumberField.propTypes = {
  cardTypeImgUrl: PropTypes.string,
  isPLCCEnabled: PropTypes.bool,
  cardType: PropTypes.string,
  onCardFocus: PropTypes.func,
  creditFieldLabels: PropTypes.shape({}),
};

CardNumberField.defaultProps = {
  creditFieldLabels: {
    creditCardNumber: '',
    expMonth: '',
    expYear: '',
    cvvCode: '',
  },
  cardTypeImgUrl: '',
  cardType: '',
  isPLCCEnabled: true,
  onCardFocus: () => {},
};

export default withStyles(CreditCardFields, styles);
export { CreditCardFields as CreditCardFieldsVanilla };
