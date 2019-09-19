import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import TextBox from '../../../../../../common/atoms/TextBox';
import SelectBox from '../../../../../../common/atoms/Select';
import DateInput from '../../../../../../common/molecules/DateInput';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import { BodyCopy, Image } from '../../../../../../common/atoms';
import Button from '../../../../../../common/atoms/Button';
import withStyles from '../../../../../../common/hoc/withStyles';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import styles from '../styles/PointsClaimForm.style';
import UserInfoView from './UserInfo.view';
import { TRANSACTION_TYPES } from '../../../PointsClaim.constants';
import { getIconPath } from '../../../../../../../utils';

const fieldNames = {
  TRANSACTION_TYPE: 'transactionType',
  ORDER_NUMBER: 'orderNumber',
  ORDER_DATE: 'orderDate',
  STORE_NUMBER: 'storeNumber',
  REGISTER_NUMBER: 'registerNumber',
  TRANSACTION_DATE: 'transactionDate',
  TRANSACTION_NUMBER: 'transactionNumber',
};

export class PointsClaimForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: TRANSACTION_TYPES.IN_STORE,
    };
  }

  typeChange = e => {
    this.setState({
      type: e.target.value ? e.target.value : '',
    });
  };

  fieldFormater = e => {
    const { STORE_NUMBER, TRANSACTION_NUMBER, REGISTER_NUMBER } = fieldNames;
    const { name, value } = e.target;
    const minLimit = name === STORE_NUMBER || name === TRANSACTION_NUMBER ? 4 : 2;
    const { change } = this.props;

    if (Number.isNaN(value) || value === '') {
      return;
    }

    if ([STORE_NUMBER, REGISTER_NUMBER, TRANSACTION_NUMBER].find(field => field === name)) {
      let val = value;
      while (val.length < minLimit) {
        val = `0${val}`;
      }
      change(name, val);
    }
  };

  render() {
    const {
      className,
      labels,
      pristine,
      handleSubmit,
      transactionTypesMap,
      errorMessage,
      claimPointsErrorMessage,
      ...otherprops
    } = this.props;

    const { type } = this.state;

    const isStore = type === TRANSACTION_TYPES.IN_STORE;

    return (
      <BodyCopy className={className}>
        {errorMessage && (
          <Notification
            status="error"
            colSize={{ large: 12, medium: 8, small: 6 }}
            message={claimPointsErrorMessage}
          />
        )}
        <BodyCopy fontFamily="secondary" fontWeight="regular" component="p" className="elem-mb-LRG">
          {getLabelValue(labels, 'lbl_points_claim_supporting_text', 'myPlaceRewards')}
        </BodyCopy>
        <form
          name="PointsClaimForm"
          noValidate
          onSubmit={handleSubmit}
          onBlur={this.fieldFormater}
          className={className}
        >
          <Row fullBleed>
            <Col colSize={{ small: 3, medium: 4, large: 2 }} ignoreGutter={{ small: true }}>
              <BodyCopy
                fontFamily="secondary"
                fontWeight="extrabold"
                fontSize="fs11"
                component="p"
                className="selectBox__label"
              >
                {getLabelValue(labels, 'lbl_points_claim_transaction_type', 'myPlaceRewards')}
              </BodyCopy>
              <Field
                id={fieldNames.TRANSACTION_TYPE}
                name={fieldNames.TRANSACTION_TYPE}
                component={SelectBox}
                dataLocator="points-claim-transactiontype"
                options={transactionTypesMap}
                onChange={this.typeChange}
              />
            </Col>
          </Row>
          <Row fullBleed>
            <Col colSize={{ small: 6, medium: 4, large: 5 }} ignoreGutter={{ small: true }}>
              <UserInfoView labels={labels} {...otherprops} />
            </Col>
            <Col colSize={{ small: 6, medium: 4, large: 4 }} ignoreGutter={{ small: true }}>
              {isStore && (
                <BodyCopy component="div" className="image_container">
                  <BodyCopy
                    component="p"
                    className="image_caption"
                    textAlign="center"
                    fontFamily="secondary"
                    fontWeight="semibold"
                  >
                    {getLabelValue(labels, 'lbl_points_claim_sample_receipt', 'myPlaceRewards')}
                  </BodyCopy>
                  <Image src={getIconPath('sample-receipt')} />
                </BodyCopy>
              )}
            </Col>
          </Row>

          {isStore && (
            <>
              <Row fullBleed>
                <Col colSize={{ small: 6, medium: 4, large: 3 }} ignoreGutter={{ small: true }}>
                  <Field
                    id={fieldNames.STORE_NUMBER}
                    placeholder={getLabelValue(
                      labels,
                      'lbl_points_claim_store_number',
                      'myPlaceRewards'
                    )}
                    name={fieldNames.STORE_NUMBER}
                    component={TextBox}
                    dataLocator="points-claim-storenumber"
                  />
                </Col>
                <Col colSize={{ small: 6, medium: 4, large: 3 }}>
                  <Field
                    id={fieldNames.REGISTER_NUMBER}
                    placeholder={getLabelValue(
                      labels,
                      'lbl_points_claim_register_number',
                      'myPlaceRewards'
                    )}
                    name={fieldNames.REGISTER_NUMBER}
                    component={TextBox}
                    dataLocator="points-claim-registernumber"
                  />
                </Col>
              </Row>
              <Row fullBleed>
                <Col colSize={{ small: 6, medium: 4, large: 3 }} ignoreGutter={{ small: true }}>
                  <Field
                    id="transactionDate"
                    placeholder={getLabelValue(
                      labels,
                      'lbl_points_claim_transaction_date',
                      'myPlaceRewards'
                    )}
                    name="transactionDate"
                    maxDate={new Date()}
                    component={DateInput}
                    dataLocator="points-claim-transactiondate"
                  />
                </Col>
                <Col colSize={{ small: 6, medium: 4, large: 3 }}>
                  <Field
                    id={fieldNames.TRANSACTION_NUMBER}
                    placeholder={getLabelValue(
                      labels,
                      'lbl_points_claim_transaction_number',
                      'myPlaceRewards'
                    )}
                    name={fieldNames.TRANSACTION_NUMBER}
                    component={TextBox}
                    dataLocator="points-claim-transactionnumber"
                  />
                </Col>
              </Row>
            </>
          )}

          {!isStore && (
            <>
              <Row fullBleed>
                <Col colSize={{ small: 6, medium: 4, large: 3 }}>
                  <Field
                    id={fieldNames.ORDER_NUMBER}
                    placeholder={getLabelValue(
                      labels,
                      'lbl_points_claim_order_number',
                      'myPlaceRewards'
                    )}
                    name={fieldNames.ORDER_NUMBER}
                    component={TextBox}
                    dataLocator="points-claim-ordernumber"
                  />
                </Col>
                <Col colSize={{ small: 6, medium: 4, large: 3 }} ignoreGutter={{ small: true }}>
                  <Field
                    id={fieldNames.ORDER_DATE}
                    placeholder={getLabelValue(
                      labels,
                      'lbl_points_claim_order_date',
                      'myPlaceRewards'
                    )}
                    name={fieldNames.ORDER_DATE}
                    readonly
                    maxDate={new Date()}
                    component={DateInput}
                    dataLocator="points-claim-orderdate"
                  />
                </Col>
              </Row>
            </>
          )}
          <Row fullBleed className="elem-pt-XXL">
            <Col
              className="points-claim__cancel"
              colSize={{ small: 6, medium: 3, large: 3 }}
              offsetLeft={{ medium: 1, large: 5 }}
            >
              <Button
                buttonVariation="fixed-width"
                type="button"
                data-locator="points-claim-cancel"
              >
                {labels.common.lbl_common_cancelCTACaps}
              </Button>
            </Col>
            <Col className="points-claim__submit" colSize={{ small: 6, medium: 3, large: 3 }}>
              <Button
                fill="BLUE"
                type="submit"
                buttonVariation="fixed-width"
                data-locator="points-claim-submit"
              >
                {getLabelValue(labels, 'lbl_points_claim_submit_caps', 'myPlaceRewards')}
              </Button>
            </Col>
          </Row>
        </form>
      </BodyCopy>
    );
  }
}

PointsClaimForm.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  pristine: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  change: PropTypes.func,
  transactionTypesMap: PropTypes.shape([]).isRequired,
  errorMessage: PropTypes.shape({}),
  claimPointsErrorMessage: PropTypes.string,
};

PointsClaimForm.defaultProps = {
  className: '',
  change: () => {},
  errorMessage: {},
  claimPointsErrorMessage: '',
};

const validateMethod = createValidateMethod(
  getStandardConfig([
    fieldNames.STORE_NUMBER,
    fieldNames.REGISTER_NUMBER,
    fieldNames.TRANSACTION_NUMBER,
    fieldNames.ORDER_NUMBER,
    fieldNames.ORDER_DATE,
    fieldNames.TRANSACTION_DATE,
  ])
);

export default reduxForm({
  form: 'PointsClaimForm', // a unique identifier for this form
  enableReinitialize: true,
  initialValues: {
    transactionType: TRANSACTION_TYPES.IN_STORE,
  },
  ...validateMethod,
})(withStyles(PointsClaimForm, styles));
