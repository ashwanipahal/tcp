import React from 'react';
import { fromJS } from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import MiniBagSelect from '@tcp/web/src/components/features/CnC/MiniBag/molecules/MiniBagSelectBox/MiniBagSelectBox';
import { Row, Button, Image, Col } from '@tcp/core/src/components/common/atoms';
import { getIconPath } from '@tcp/core/src/utils';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import ProductColorChipsSelector from '../../ProductColorChipSelector';
import ProductSizeSelector from '../../ProductSizeSelector';
import styles from '../styles/ProductAddToBag.style';

class ProductAddToBag extends React.PureComponent<Props> {
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
    } = this.props;

    let { sizeList, fitList, colorList } = this.props;

    sizeList = sizeList && fromJS(sizeList);
    fitList = fitList && fromJS(fitList);
    colorList = fromJS(colorList);
    const { addToBag, errorMessage, size: sizeTitle, fit: fitTitle, color: colorTitle } = plpLabels;

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
                  {isErrorMessageDisplayed && (
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
                  )}
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
                    displayErrorMessage(fitChanged);
                    // eslint-disable-next-line extra-rules/no-commented-out-code
                    // handleSubmit(itemId, this.getSkuId(), quantity, itemPartNumber, variantNo);
                  }
                }}
              >
                {addToBag}
              </Button>
              <RenderPerf.Measure name="render_cart_cta" />
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}

export default compose(
  connect((state, props) => ({
    form: `ProductAddToBag-${props.generalProductId}`,
    enableReinitialize: true,
  })),
  reduxForm()
)(withStyles(ProductAddToBag, styles));

export { ProductAddToBag as ProductAddToBagVanilla };
