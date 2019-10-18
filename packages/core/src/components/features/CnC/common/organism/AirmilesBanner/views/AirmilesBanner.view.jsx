import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import withStyles from '../../../../../../common/hoc/withStyles';
import { TextBox, BodyCopy, Row, Col } from '../../../../../../common/atoms';

import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import { getLocator } from '../../../../../../../utils';
import AirmilesToolTip from './AirmilesToolTip.view';
import styles from '../styles/AirmilesBanner.style';

// @flow

class AirmilesBanner extends React.PureComponent<Props> {
  state = {
    touched: false,
    expanded: false,
    isValidPromoField: false,
  };

  componentWillMount() {
    const { airmilesBannerData } = this.props;
    /* istanbul ignore else */
    if (airmilesBannerData && !!airmilesBannerData.collectorNumber) {
      this.setState({ expanded: false, isValidPromoField: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { airmilesBannerData } = this.props;
    const {
      promoField,
      syncErrorObj: { syncError },
    } = nextProps;
    const isValidPromoField = this.checkIsValidPromoField(promoField, syncError);
    /* istanbul ignore else */
    if (!airmilesBannerData.collectorNumber) {
      this.setState({
        isValidPromoField,
      });
    }
    /* istanbul ignore else */
    if (isValidPromoField) {
      const { onAddAirmilesBanner } = this.props;

      onAddAirmilesBanner();
      this.setState({
        expanded: false,
      });
    }
  }

  renderTextBox = ({ input, ...otherParams }) => {
    // eslint-disable-next-line
    input = { ...input, value: input.value.toUpperCase() };
    return <TextBox input={input} {...otherParams} />;
  };

  handleEditClick = () => this.setState({ expanded: true });

  toggleTouched = () => {
    const { touched } = this.state;
    this.setState({ touched: !touched });
  };

  checkIsValidPromoField = (promoField, syncError) => {
    return (
      !!promoField &&
      promoField.length > 10 &&
      promoField.match(/^[0-9]+$/) &&
      !(syncError && syncError.promoId)
    );
  };

  handleSubmit = () => {
    const { onAddAirmilesBanner } = this.props;
    const { touched } = this.state;
    /* istanbul ignore else */
    if (touched) {
      this.toggleTouched();
    }
    onAddAirmilesBanner();
  };

  render() {
    const {
      className,
      airmilesBannerData: { collectorNumber },
      labels,
      promoField,
    } = this.props;
    const { expanded, isValidPromoField } = this.state;

    return (
      <div className={className}>
        <div className="coupon_form_container">
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            fontSize="fs10"
            textAlign="left"
            color="secondary"
          >
            {labels.headerText}
          </BodyCopy>
          <form className="coupon_submit_form">
            <Row
              className="airmilesRow"
              data-locator={getLocator('airnmileBannerinput_item_label')}
            >
              <Col className="airmilesBannerInput" colSize={{ large: 6, medium: 8, small: 3 }}>
                {!!isValidPromoField && !expanded ? (
                  <Row className="editButton">
                    <Col className="disabledText" colSize={{ large: 10, medium: 6, small: 4 }}>
                      {!promoField ? collectorNumber : promoField}
                    </Col>
                    <Col colSize={{ large: 2, medium: 2, small: 2 }}>
                      <BodyCopy
                        bodySize="one"
                        fontFamily="secondary"
                        fontSize="fs10"
                        textAlign="left"
                        color="secondary"
                        onClick={this.handleEditClick}
                        className="editCursor"
                      >
                        Edit
                      </BodyCopy>
                    </Col>
                  </Row>
                ) : (
                  <Field
                    id="promoId"
                    placeholder={labels.collectorNumber}
                    name="promoId"
                    type="text"
                    component={TextBox}
                    maxLength={11}
                    dataLocator="airmile-banner-collectorNumber"
                    enableSuccessCheck={false}
                    onBlur={this.handleSubmit}
                    className="upperCaseOffer"
                  />
                )}
                <AirmilesToolTip toolTipText={labels.collectorFlyout} />
              </Col>
              <Col className="airmilesBannerInput" colSize={{ large: 6, medium: 8, small: 3 }}>
                <Field
                  id="offerCode"
                  placeholder={labels.offerCode}
                  name="offerCode"
                  type="text"
                  component={TextBox}
                  maxLength={50}
                  dataLocator="airmile-banner-offerCode"
                  enableSuccessCheck={false}
                  onBlur={this.handleSubmit}
                />
                <AirmilesToolTip toolTipText={labels.offerFlyout} />
              </Col>
            </Row>
          </form>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            fontSize="fs10"
            textAlign="center"
            color="secondary"
          >
            {labels.footerText}
          </BodyCopy>
        </div>
      </div>
    );
  }
}

AirmilesBanner.propTypes = {
  labels: PropTypes.shape({}),
  airmilesBannerData: PropTypes.shape({}),
  onAddAirmilesBanner: PropTypes.func,
  orderId: PropTypes.string,
  handleSubmit: PropTypes.func,
};
AirmilesBanner.defaultProps = {
  airmilesBannerData: {},
  labels: {},
  onAddAirmilesBanner: () => {},
  orderId: ' ',
  handleSubmit: () => {},
};

const validateMethod = createValidateMethod({
  rules: {
    promoId: {
      number: true,
      exactLength: 11,
    },
  },
  messages: ({ labels }) => ({
    promoId: {
      exactLength: labels.exactLength,
      number: labels.collectorOnlyNumber,
    },
  }),
});

export default reduxForm({
  form: 'AirmilesBanner',
  ...validateMethod,
  enableReinitialize: true,
  asyncBlurFields: ['promoId', 'offerCode'],
})(withStyles(AirmilesBanner, styles));

export { AirmilesBanner };
