import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { reduxForm, Field, change } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import { BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import Button from '@tcp/core/src/components/common/atoms/Button';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import {
  dropDownStyle,
  itemStyle,
  DropdownWrapper,
  SaveButtonWrapper,
  CancelButtonWrapper,
  ImageContainer,
  ImageCaption,
  FieldWrapper,
} from '../styles/PointsClaimForm.native.style';
import UserInfoView from './UserInfo.view.native';
import { TRANSACTION_TYPES } from '../../../PointsClaim.constants';

const receiptImg = require('../../../../../../../assets/sample-receipt.png');

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

  /**
   * @function fieldFormater
   * @desc This is a function to format input fields
   */

  fieldFormater = (num, name) => {
    const { dispatch } = this.props;
    const { STORE_NUMBER, TRANSACTION_NUMBER } = fieldNames;
    const minLimit = name === STORE_NUMBER || name === TRANSACTION_NUMBER ? 4 : 2;
    const zero = minLimit - num.toString().length + 1;
    let val = num;
    val = Array(+(zero > 0 && zero)).join('0') + num;
    // TODO: Remove settimout and find a better way to update values
    setTimeout(() => dispatch(change('PointsClaimForm', name, val)));
  };

  render() {
    const {
      className,
      labels,
      dispatch,
      pristine,
      handleSubmit,
      transactionTypesMap,
      errorMessage,
      claimPointsErrorMessage,
      onBack,
      ...otherprops
    } = this.props;

    const { type } = this.state;
    const isStore = type === TRANSACTION_TYPES.IN_STORE;

    return (
      <View>
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs16"
          fontWeight="regular"
          color="gray.900"
          text={getLabelValue(labels, 'lbl_points_claim_supporting_text', 'myPlaceRewards')}
        />
        <DropdownWrapper>
          <Field
            id={fieldNames.TRANSACTION_TYPE}
            name={fieldNames.TRANSACTION_TYPE}
            component={DropDown}
            dataLocator="points-claim-transactiontype"
            heading={getLabelValue(labels, 'lbl_points_claim_transaction_type', 'myPlaceRewards')}
            selectedValue={type}
            data={transactionTypesMap}
            onValueChange={itemValue => {
              dispatch(change('PointsClaimForm', fieldNames.TRANSACTION_TYPE, itemValue));
              this.setState({ type: itemValue });
            }}
            variation="secondary"
            dropDownStyle={{ ...dropDownStyle }}
            itemStyle={{ ...itemStyle }}
          />
        </DropdownWrapper>
        <UserInfoView labels={labels} {...otherprops} />
        {isStore && (
          <>
            <ImageContainer>
              <ImageCaption>
                <BodyCopy
                  text={getLabelValue(labels, 'lbl_points_claim_sample_receipt', 'myPlaceRewards')}
                  fontFamily="secondary"
                  fontSize="fs16"
                  fontWeight="extrabold"
                  color="white"
                  textAlign="center"
                />
              </ImageCaption>
              <Image height="122px" width="262px" source={receiptImg} />
            </ImageContainer>
            <FieldWrapper>
              <Field
                id={fieldNames.STORE_NUMBER}
                label={getLabelValue(labels, 'lbl_points_claim_store_number', 'myPlaceRewards')}
                name={fieldNames.STORE_NUMBER}
                component={TextBox}
                dataLocator="points-claim-storenumber"
                type="number"
                onBlur={val => this.fieldFormater(val, fieldNames.STORE_NUMBER)}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                id={fieldNames.TRANSACTION_DATE}
                label={getLabelValue(labels, 'lbl_points_claim_transaction_date', 'myPlaceRewards')}
                name={fieldNames.TRANSACTION_DATE}
                component={TextBox}
                dataLocator="points-claim-transactiondate"
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                id={fieldNames.REGISTER_NUMBER}
                label={getLabelValue(labels, 'lbl_points_claim_register_number', 'myPlaceRewards')}
                name={fieldNames.REGISTER_NUMBER}
                component={TextBox}
                dataLocator="points-claim-registernumber"
                type="number"
                onBlur={val => this.fieldFormater(val, fieldNames.REGISTER_NUMBER)}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                id={fieldNames.TRANSACTION_NUMBER}
                label={getLabelValue(
                  labels,
                  'lbl_points_claim_transaction_number',
                  'myPlaceRewards'
                )}
                name={fieldNames.TRANSACTION_NUMBER}
                component={TextBox}
                dataLocator="points-claim-transactionnumber"
                type="number"
                onBlur={val => this.fieldFormater(val, fieldNames.TRANSACTION_NUMBER)}
              />
            </FieldWrapper>
          </>
        )}

        {!isStore && (
          <>
            <FieldWrapper>
              <Field
                id={fieldNames.ORDER_NUMBER}
                label={getLabelValue(labels, 'lbl_points_claim_order_number', 'myPlaceRewards')}
                name={fieldNames.ORDER_NUMBER}
                component={TextBox}
                dataLocator="points-claim-ordernumber"
                type="number"
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                id={fieldNames.ORDER_DATE}
                label={getLabelValue(labels, 'lbl_points_claim_order_date', 'myPlaceRewards')}
                name={fieldNames.ORDER_DATE}
                component={TextBox}
                dataLocator="points-claim-orderdate"
              />
            </FieldWrapper>
          </>
        )}

        <SaveButtonWrapper>
          <Button
            fill="BLUE"
            type="submit"
            color="white"
            onPress={handleSubmit}
            buttonVariation="fixed-width"
            text={getLabelValue(labels, 'lbl_points_claim_submit_caps', 'myPlaceRewards')}
          />
        </SaveButtonWrapper>
        <CancelButtonWrapper>
          <Button
            fill="WHITE"
            onPress={onBack}
            buttonVariation="fixed-width"
            text={getLabelValue(labels, 'lbl_common_cancelCTACaps', 'common')}
          />
        </CancelButtonWrapper>
      </View>
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
  onBack: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
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
})(PointsClaimForm);
