import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import withStyles from '../../../../../../common/hoc/withStyles';
import ReactToolTip from '../../../../../../common/atoms/ReactToolTip';
import { TextBox, BodyCopy, Image, Row, Col } from '../../../../../../common/atoms';

import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import { getIconPath, getLocator } from '../../../../../../../utils';

import styles from '../styles/AirmilesBanner.style';

class AirmilesBanner extends React.PureComponent<Props> {
  state = { touched: false };

  renderTextBox = ({ input, ...otherParams }) => {
    // eslint-disable-next-line
    input = { ...input, value: input.value.toUpperCase() };
    return <TextBox input={input} {...otherParams} />;
  };

  toggleTouched = () => {
    const { touched } = this.state;
    this.setState({ touched: !touched });
  };

  handleSubmit = e => {
    const { handleSubmit } = this.props;
    const { touched } = this.state;

    if (touched) {
      this.toggleTouched();
    }
    return handleSubmit(e);
  };

  render() {
    const { className, airmilesBannerData, labels } = this.props;

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
          <form onSubmit={this.handleSubmit} className="coupon_submit_form">
            <Row
              className="items-total rowMargin"
              data-locator={getLocator('order_ledger_item_label')}
            >
              <Col className="airmilesBannerInput" colSize={{ large: 6, medium: 4, small: 3 }}>
                <Field
                  id="collectorNumber"
                  placeholder={labels.collectorNumber}
                  name="collectorNumber"
                  type="text"
                  component={TextBox}
                  maxLength={11}
                  value={airmilesBannerData.collectorNumber}
                  dataLocator="airmile-banner-collectorNumber"
                />
                <ReactToolTip
                  id="tool"
                  className="coupon_submit_button"
                  direction="top"
                  message={labels.collectorFlyout}
                >
                  <Image alt="info" className="circle-info-image" src={getIconPath(`info-icon`)} />
                </ReactToolTip>
              </Col>
              <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                <Field
                  id="offerCode"
                  placeholder={labels.offerCode}
                  name="offerCode"
                  type="text"
                  component={TextBox}
                  maxLength={50}
                  dataLocator="airmile-banner-offerCode"
                  value={airmilesBannerData.offerCode}
                />
                <ReactToolTip
                  id="tool"
                  className="coupon_submit_button"
                  direction="top"
                  message={labels.offerFlyout}
                >
                  <Image alt="info" className="circle-info-image" src={getIconPath(`info-icon`)} />
                </ReactToolTip>
              </Col>
            </Row>
          </form>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            fontSize="fs10"
            textAlign="left"
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
};
AirmilesBanner.defaultProps = {
  airmilesBannerData: {},
  labels: {},
};
const validateMethod = createValidateMethod(getStandardConfig(['collectorNumber', 'offerCode']));
export default reduxForm({
  form: 'AirmilesBanner',
  ...validateMethod,
  enableReinitialize: true,
})(withStyles(AirmilesBanner, styles));

export { AirmilesBanner };
