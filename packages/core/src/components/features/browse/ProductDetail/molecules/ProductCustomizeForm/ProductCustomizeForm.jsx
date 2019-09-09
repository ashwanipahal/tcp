/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Button, Image, Col } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import endpoints from '@tcp/core/src/service/endpoint';
import { getIconPath } from '@tcp/core/src/utils';
import MiniBagSelect from '../ProductSelect/ProductSelect';
import FitSizeSelect from '../FitSizeSelect/FitSizeSelect';
import ProductColorChipsSelector from '../ColorSelect/views/ColorSelect.view';
import style from './ProductCustomizeForm.style';

// @flow

type Props = {
  handleSubmit: (itemId, skuId, quantity, itemPartNumber, variantNo) => void,
  colorFitsSizesMap: any,
  initialValues: any,
  item: any,
  className: any,
};

export class ProductCustomizeForm extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedColor: '',
      selectedFit: '',
      selectedSize: '',
      selectedQuantity: '',
      isErrorMessageDisplayed: false,
      fitChanged: false,
      persistSelectedFit: '',
    };
  }

  componentDidMount() {
    const { initialValues } = this.props;
    this.setState({
      selectedColor: initialValues.color,
      selectedFit: initialValues.Fit,
      selectedSize: initialValues.Size,
      selectedQuantity: initialValues.Qty,
      persistSelectedFit: initialValues.Fit,
    });
  }

  getSkuId = () => {
    const { selectedColor, selectedFit, selectedSize } = this.state;
    const { colorFitsSizesMap } = this.props;
    const colorItem = this.getSelectedColorData(colorFitsSizesMap, selectedColor);
    const hasFits = colorItem.getIn([0, 'hasFits']);
    let fit;
    let sizeItem;
    if (hasFits) {
      fit = colorItem.getIn([0, 'fits']).find(fitItems => fitItems.get('fitName') === selectedFit);
      sizeItem = fit && fit.get('sizes');
    } else {
      fit = colorItem.getIn([0, 'fits']);
      sizeItem = fit && fit.getIn([0, 'sizes']);
    }
    return sizeItem && sizeItem.find(size => size.get('sizeName') === selectedSize).get('skuId');
  };

  getSelectedColorData = (colorFitsSizesMap, color) => {
    return (
      colorFitsSizesMap &&
      colorFitsSizesMap.filter(colorItem => {
        return colorItem.getIn(['color', 'name']) === color.name && colorItem;
      })
    );
  };

  getColorOptions = colorFitsSizesMap => {
    return (
      colorFitsSizesMap &&
      colorFitsSizesMap.map(colorItem => ({
        title: (
          <React.Fragment>
            <img
              alt=""
              className="selected-color-image"
              src={endpoints.global.baseURI + colorItem.getIn(['color', 'imagePath'])}
            />
            <span>{colorItem.getIn(['color', 'name'])}</span>
          </React.Fragment>
        ),
        content: (
          <React.Fragment>
            <img alt="" src={endpoints.global.baseURI + colorItem.getIn(['color', 'imagePath'])} />
            <span>{colorItem.getIn(['color', 'name'])}</span>
          </React.Fragment>
        ),
        value: colorItem.getIn(['color', 'name']),
      }))
    );
  };

  getFitOptions = colorItem => {
    return (
      (colorItem &&
        colorItem.get('fits').map(fit => ({
          displayName: fit.get('fitName'),
          id: fit.get('fitName'),
        }))) ||
      []
    );
  };

  getSizeOptions = (colorItem, selectedFit?, fitChanged) => {
    let sizeOptions = [];
    if (colorItem) {
      colorItem.get('fits').forEach(fit => {
        if (selectedFit) {
          if (fit.get('fitName') === selectedFit) {
            sizeOptions = fit.get('sizes').map(size => ({
              displayName: size.get('sizeName'),
              id: size.get('sizeName'),
            }));
            if (fitChanged) {
              sizeOptions = sizeOptions.unshift({
                displayName: 'Select',
                id: 'Select',
              });
            }
          }
        } else {
          sizeOptions = fit.get('sizes').map(size => ({
            displayName: size.get('sizeName'),
            id: size.get('sizeName'),
          }));
        }
      });
    }
    return sizeOptions;
  };

  colorChange = e => {
    this.setState({
      selectedColor: { name: e },
    });
  };

  fitChange = e => {
    const { selectedSize, persistSelectedFit } = this.state;
    if (persistSelectedFit !== e.target.value) {
      this.setState({
        selectedFit: e.target.value,
        fitChanged: true,
      });
    } else {
      this.setState({
        selectedFit: e.target.value,
        fitChanged: false,
      });
    }
    if (selectedSize !== 'Select') {
      this.displayErrorMessage(false);
    }
  };

  sizeChange = e => {
    const { selectedFit } = this.state;
    this.setState({
      persistSelectedFit: selectedFit,
      selectedSize: e.target.value,
      fitChanged: false,
    });
    if (e.target.value !== 'Select') {
      this.displayErrorMessage(false);
    }
  };

  quantityChange = e => {
    this.setState({
      selectedQuantity: e.target.value,
    });
  };

  getQuantityList = () => {
    const quantityArray = new Array(15).fill(1);
    return quantityArray.map((val, index) => ({ displayName: index + 1, id: index + 1 }));
  };

  getSizeLabel = (productDetail, labels) => {
    return productDetail.itemInfo.isGiftItem === true ? `${labels.value}` : `${labels.size}`;
  };

  getColorLabel = (productDetail, labels) => {
    return productDetail.itemInfo.isGiftItem === true ? `${labels.design}` : `${labels.color}`;
  };

  displayErrorMessage = displayError => {
    this.setState({
      isErrorMessageDisplayed: displayError,
    });
  };

  render() {
    const { colorFitsSizesMap, item } = this.props;
    const {
      selectedColor,
      selectedFit,
      selectedQuantity,
      isErrorMessageDisplayed,
      fitChanged,
    } = this.state;
    const labels = {};

    // const colorList = this.getColorOptions(colorFitsSizesMap);
    const selectedColorElement = this.getSelectedColorData(colorFitsSizesMap, selectedColor);
    const hasFits = selectedColorElement && selectedColorElement.getIn([0, 'hasFits']);
    const fitList = hasFits && this.getFitOptions(selectedColorElement.get(0));
    const sizeList =
      selectedColorElement &&
      (hasFits
        ? this.getSizeOptions(selectedColorElement.get(0), selectedFit, fitChanged)
        : this.getSizeOptions(selectedColorElement.get(0)));

    const { className } = this.props;
    // const { handleSubmit } = this.props;
    // const itemId = item.getIn(['itemInfo', 'itemId']);
    // const quantity = selectedQuantity || '1';
    // const itemPartNumber = item.getIn(['productInfo', 'itemPartNumber']);
    // const variantNo = item.getIn(['productInfo', 'variantNo']);

    return (
      <form className={className} noValidate>
        <Row fullBleed className="edit-form-css">
          {/* <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="color-selector">
              <Field
                width={87}
                id="color"
                name={selectedColor}
                component={ProductColorChipsSelector}
                options={colorFitsSizesMap}
                onChange={this.colorChange}
                dataLocator="addnewaddress-state"
              />
            </div>
          </Col> */}
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            {hasFits && (
              <div className="fit-selector">
                <Field
                  width={69}
                  id="fit"
                  name="Fit"
                  component={FitSizeSelect}
                  options={fitList}
                  onChange={this.fitChange}
                  dataLocator="addnewaddress-state"
                />
              </div>
            )}
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="size-selector">
              <Field
                width={49}
                className={isErrorMessageDisplayed ? 'size-field-error' : 'size-field'}
                id="size"
                // name={this.getSizeLabel(item, labels)}
                component={FitSizeSelect}
                options={sizeList}
                onChange={this.sizeChange}
                dataLocator="addnewaddress-state"
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
                  {labels.errorSize}
                </BodyCopy>
              )}
            </div>
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="qty-selector">
              <Field
                width={32}
                id="quantity"
                name="Qty"
                component={MiniBagSelect}
                options={this.getQuantityList()}
                onChange={this.quantityChange}
                dataLocator="addnewaddress-state"
              />
            </div>
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="button-wrapper">
              <Button
                fill="BLUE"
                buttonVariation="fixed-width"
                onPress={this.onUpdate}
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  // if (fitChanged) {
                  //   this.displayErrorMessage(fitChanged);
                  // } else {
                  //   this.displayErrorMessage(fitChanged);
                  //   // handleSubmit(itemId, this.getSkuId(), quantity, itemPartNumber, variantNo);
                  // }
                }}
              >
                Add to bag
              </Button>
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}
export default connect()(
  reduxForm({
    form: 'ProductCustomizeForm',
    enableReinitialize: true,

    // a unique identifier for this form
  })(withStyles(ProductCustomizeForm, style))
);
