import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import withStyles from '../../../../../../common/hoc/withStyles';
import ReactToolTip from '../../../../../../common/atoms/ReactToolTip';
import { TextBox, BodyCopy, Image, Row, Col } from '../../../../../../common/atoms';

import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import { getIconPath, getLocator } from '../../../../../../../utils';

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
    if (!airmilesBannerData.collectorNumber) {
      this.setState({
        isValidPromoField,
      });
    }

    if (isValidPromoField) {
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
    return !!promoField && promoField.length > 2 && !(syncError && syncError.promoId);
  };

  handleSubmit = (data: { promoId: string, orderId: string }) => {
    const { onAddAirmilesBanner } = this.props;
    const { touched } = this.state;
    if (touched) {
      this.toggleTouched();
    }
    onAddAirmilesBanner(data);
  };

  render() {
    const {
      className,
      airmilesBannerData: { collectorNumber },
      labels,
      handleSubmit,
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
          <form
            onSubmit={handleSubmit(this.handleSubmit.bind(this))}
            className="coupon_submit_form"
          >
            <Row
              className="items-total rowMargin"
              data-locator={getLocator('order_ledger_item_label')}
            >
              <Col className="airmilesBannerInput" colSize={{ large: 6, medium: 4, small: 3 }}>
                {!!isValidPromoField && !expanded ? (
                  <div>
                    {!!collectorNumber && !!promoField && promoField === collectorNumber
                      ? collectorNumber
                      : promoField}
                    <BodyCopy
                      bodySize="one"
                      fontFamily="secondary"
                      fontSize="fs10"
                      textAlign="left"
                      color="secondary"
                      onClick={this.handleEditClick}
                    >
                      Edit
                    </BodyCopy>
                  </div>
                ) : (
                  <Field
                    id="promoId"
                    placeholder={labels.collectorNumber}
                    name="promoId"
                    type="text"
                    component={TextBox}
                    maxLength={11}
                    dataLocator="airmile-banner-collectorNumber"
                  />
                )}
                <span className="airmileBannerTooltip">
                  <span className="info-icon-img-wrapper">
                    <ReactToolTip message={labels.collectorFlyout} aligned="right">
                      <Image
                        className="tcp_carousel__play tooltip"
                        src={getIconPath('info-icon')}
                      />
                    </ReactToolTip>
                  </span>
                </span>
              </Col>
              <Col className="airmilesBannerInput" colSize={{ large: 6, medium: 4, small: 3 }}>
                <Field
                  id="offerCode"
                  placeholder={labels.offerCode}
                  name="offerCode"
                  type="text"
                  component={TextBox}
                  maxLength={50}
                  dataLocator="airmile-banner-offerCode"
                />

                <span className="airmileBannerTooltip">
                  <span className="info-icon-img-wrapper">
                    <ReactToolTip message={labels.offerFlyout} aligned="right">
                      <Image
                        className="tcp_carousel__play tooltip"
                        src={getIconPath('info-icon')}
                      />
                    </ReactToolTip>
                  </span>
                </span>
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
};
AirmilesBanner.defaultProps = {
  airmilesBannerData: {},
  labels: {},
  onAddAirmilesBanner: () => {},
  orderId: ' ',
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
})(withStyles(AirmilesBanner, styles));

export { AirmilesBanner };
