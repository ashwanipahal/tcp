import React from 'react';
import { fromJS } from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { PRODUCT_ADD_TO_BAG } from '@tcp/core/src/constants/reducer.constants';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import MiniBagSelect from '@tcp/web/src/components/features/CnC/MiniBag/molecules/MiniBagSelectBox/MiniBagSelectBox';
import { Row, Button, Image, Col } from '@tcp/core/src/components/common/atoms';
import { getIconPath } from '@tcp/core/src/utils';
import { CALL_TO_ACTION_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import ProductColorChipsSelector from '../../ProductColorChipSelector';
import ProductSizeSelector from '../../ProductSizeSelector';
import styles from '../styles/ProductAddToBag.style';

// to get Error Message displayed in case any error comes on Add To card
const ErrorComp = errorMessage => {
  return (
    <BodyCopy
      className="size-error"
      fontSize="fs12"
      component="div"
      fontFamily="secondary"
      fontWeight="regular"
    >
      <Image
        alt="Error"
        className="error-image"
        src={getIconPath('alert-triangle')}
        data-locator="productcustomizeform-error-icon"
      />
      <BodyCopy
        className="size-error-message"
        fontSize="fs12"
        component="div"
        fontFamily="secondary"
        fontWeight="regular"
      >
        {errorMessage}
      </BodyCopy>
    </BodyCopy>
  );
};

class ProductAddToBag extends React.PureComponent<Props> {
  getButtonLabel = () => {
    const { fromBagPage, plpLabels } = this.props;
    const { addToBag, update } = plpLabels;
    return fromBagPage ? update : addToBag;
  };

  render() {
    const {
      plpLabels,
      className,
      isErrorMessageDisplayed,
      fitChanged,
      quantityList,
      selectColor,
      selectFit,
      selectSize,
      displayErrorMessage,
      errorOnHandleSubmit,
      handleFormSubmit,
      showAddToBagCTA,
    } = this.props;

    let { sizeList, fitList, colorList } = this.props;

    sizeList = sizeList && fromJS(sizeList);
    fitList = fitList && fromJS(fitList);
    colorList = fromJS(colorList);
    const { errorMessage, size: sizeTitle, fit: fitTitle, color: colorTitle } = plpLabels;

    return (
      <form className={className} noValidate>
        <Row className="edit-form-css">
          <Col colSize={{ small: 10, medium: 10, large: 10 }}>
            <div className="select-value-wrapper">
              {colorList.size > 0 && (
                <div className="color-selector">
                  <Field
                    width={87}
                    id="color"
                    name="color"
                    component={ProductColorChipsSelector}
                    colorFitsSizesMap={colorList}
                    onChange={selectColor}
                    dataLocator="addnewaddress-state"
                    title={`${colorTitle}:`}
                  />
                </div>
              )}
              {fitList.size > 0 && (
                <div className="fit-selector">
                  <Field
                    width={69}
                    id="fit"
                    name="Fit"
                    component={ProductSizeSelector}
                    sizesMap={fitList}
                    onChange={selectFit}
                    dataLocator="addnewaddress-state"
                    title={`${fitTitle}:`}
                  />
                </div>
              )}
              {sizeList.size > 0 && (
                <div className="size-selector">
                  <Field
                    width={49}
                    className={isErrorMessageDisplayed ? 'size-field-error' : 'size-field'}
                    id="size"
                    name="Size"
                    component={ProductSizeSelector}
                    sizesMap={sizeList}
                    onChange={selectSize}
                    dataLocator="addnewaddress-state"
                    title={`${sizeTitle}:`}
                  />
                  {isErrorMessageDisplayed && ErrorComp(errorMessage)}
                </div>
              )}
              <div className="qty-selector">
                <Field
                  width={32}
                  id="quantity"
                  name="Quantity"
                  component={MiniBagSelect}
                  options={quantityList}
                  onChange={this.quantityChange}
                  dataLocator="addnewaddress-state"
                />
              </div>
            </div>
          </Col>
        </Row>
        {errorOnHandleSubmit && ErrorComp(errorOnHandleSubmit)}
        {showAddToBagCTA && (
          <Row fullBleed>
            <Col colSize={{ small: 12, medium: 12, large: 12 }}>
              <div className="button-wrapper">
                <Button
                  type="submit"
                  className="add-to-bag-button"
                  onClick={e => {
                    e.preventDefault();
                    // TODO: with handleSubmit
                    // eslint-disable-next-line sonarjs/no-all-duplicated-branches
                    if (fitChanged) {
                      displayErrorMessage(fitChanged);
                    } else {
                      handleFormSubmit();
                    }
                  }}
                >
                  {this.getButtonLabel()}
                </Button>
                <RenderPerf.Measure name={CALL_TO_ACTION_VISIBLE} />
              </div>
            </Col>
          </Row>
        )}
      </form>
    );
  }
}

export default compose(
  connect((state, props) => {
    const formName = props.customFormName || PRODUCT_ADD_TO_BAG;
    return {
      form: `${formName}-${props.generalProductId}`,
      enableReinitialize: true,
    };
  }),
  reduxForm()
)(withStyles(ProductAddToBag, styles));

export { ProductAddToBag as ProductAddToBagVanilla };
