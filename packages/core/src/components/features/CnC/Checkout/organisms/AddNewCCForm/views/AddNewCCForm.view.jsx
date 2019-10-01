import React from 'react';
import PropTypes from 'prop-types';
import { Field, change } from 'redux-form';
import CreditCardFields from '../../../../../../common/molecules/CreditCardFields';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';

const creditCardProps = {
  cardNumbProps: {
    colSize: {
      small: 6,
      medium: 8,
      large: 6,
    },
  },
  expMonthProps: {
    colSize: {
      small: 2,
      medium: 3,
      large: 2,
    },
    ignoreGutter: {
      small: false,
    },
  },
  expYearProps: {
    colSize: {
      small: 2,
      medium: 3,
      large: 2,
    },
  },
  cvvProps: {
    colSize: {
      small: 2,
      medium: 2,
      large: 2,
    },
  },
};

class AddNewCCForm extends React.PureComponent {
  static propTypes = {
    cvvInfo: PropTypes.func.isRequired,
    editMode: PropTypes.bool,
    cvvError: PropTypes.shape({}),
    cardType: PropTypes.string,
    labels: PropTypes.shape({}),
    isGuest: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    formName: PropTypes.string.isRequired,
    cardList: PropTypes.shape({}),
    isSaveToAccountChecked: PropTypes.bool,
    isExpirationRequired: PropTypes.bool,
    creditFieldLabels: PropTypes.shape({}),
  };

  static defaultProps = {
    cvvError: null,
    editMode: false,
    cardType: null,
    labels: {},
    isGuest: null,
    cardList: null,
    isSaveToAccountChecked: true,
    isExpirationRequired: true,
    creditFieldLabels: {},
  };

  getCreditLabelValues = () => {
    const { creditFieldLabels } = this.props;
    return {
      creditCardNumber: creditFieldLabels.cardNumber,
      expMonth: creditFieldLabels.expMonth,
      expYear: creditFieldLabels.expYear,
      cvvCode: creditFieldLabels.cvvCode,
    };
  };

  onSaveToAccountChange = (e, value) => {
    const { dispatch, formName } = this.props;
    /* istanbul ignore else */
    if (!value) {
      dispatch(change(formName, 'defaultPayment', value));
    }
  };

  renderSaveToAccountOptions = () => {
    const { labels, cardList, isSaveToAccountChecked } = this.props;
    return (
      <>
        <Row fullBleed>
          <Col colSize={{ large: 6, medium: 4, small: 6 }}>
            <Field
              showDefaultCheckbox={false}
              component={InputCheckbox}
              name="saveToAccount"
              className="elem-mb-LRG elem-mt-LRG"
              onChange={this.onSaveToAccountChange}
            >
              <BodyCopy fontSize="fs16" fontFamily="secondary">
                {labels.saveToAccount}
              </BodyCopy>
            </Field>
          </Col>
        </Row>
        <Row fullBleed>
          <Col colSize={{ large: 6, medium: 4, small: 6 }}>
            <Field
              showDefaultCheckbox={false}
              component={InputCheckbox}
              name="defaultPayment"
              className="elem-mb-LRG"
              disabled={!cardList && !isSaveToAccountChecked}
            >
              <BodyCopy fontSize="fs16" fontFamily="secondary">
                {labels.defaultPayment}
              </BodyCopy>
            </Field>
          </Col>
        </Row>
      </>
    );
  };

  render() {
    const {
      cvvInfo,
      cardType,
      cvvError,
      editMode,
      onCardFocus,
      isGuest,
      isExpirationRequired,
    } = this.props;
    return (
      <>
        <CreditCardFields
          {...creditCardProps}
          cvvInfo={cvvInfo}
          variation="secondary"
          cardType={cardType}
          cvvError={cvvError}
          onCardFocus={onCardFocus}
          showCvv={!editMode}
          creditFieldLabels={this.getCreditLabelValues()}
          isExpirationRequired={isExpirationRequired}
        />
        {!isGuest && !editMode && this.renderSaveToAccountOptions()}
      </>
    );
  }
}

export default AddNewCCForm;
