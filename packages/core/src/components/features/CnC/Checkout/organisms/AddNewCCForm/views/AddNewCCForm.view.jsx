import React from 'react';
import PropTypes from 'prop-types';
import CreditCardFields from '../../../../../../common/molecules/CreditCardFields';
import { getLabelValue } from '../../../../../../../utils';

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
    cvvError: PropTypes.shape({}),
    cardType: PropTypes.string,
    labels: PropTypes.shape({}),
  };

  static defaultProps = {
    cvvError: null,
    cardType: null,
    labels: {},
  };

  getCreditLabelValues = () => {
    const { labels } = this.props;
    return {
      creditCardNumber: getLabelValue(labels, 'lbl_billing_cardNumber'),
      expMonth: getLabelValue(labels, 'lbl_billing_expMonth'),
      expYear: getLabelValue(labels, 'lbl_billing_expYear'),
      cvvCode: getLabelValue(labels, 'lbl_billing_cvvCode'),
    };
  };

  render() {
    const { cvvInfo, cardType, cvvError } = this.props;
    return (
      <CreditCardFields
        {...creditCardProps}
        cvvInfo={cvvInfo}
        variation="secondary"
        cardType={cardType}
        cvvError={cvvError}
        creditFieldLabels={this.getCreditLabelValues()}
      />
    );
  }
}

export default AddNewCCForm;
