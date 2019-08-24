import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Button } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import MiniBagSelect from '@tcp/web/src/components/features/CnC/MiniBag/molecules/MiniBagSelectBox/MiniBagSelectBox';
import ColorSelector from '@tcp/web/src/components/features/CnC/MiniBag/molecules/ColorSelect/views/ColorSelect.view';
import endpoints from '@tcp/core/src/service/endpoint';
import style, { buttonCustomStyles } from './ProductCustomizeForm.style';

// @flow

type Props = {
  handleSubmit: (itemId, skuId, quantity, itemPartNumber, variantNo) => void,
  colorFitsSizesMap: any,
  initialValues: any,
  item: any,
  className: any,
  labels: any,
  formVisiblity: () => void,
};

export class ProductCustomizeForm extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedColor: '',
      selectedFit: '',
      selectedSize: '',
      selectedQuantity: '',
    };
  }

  componentDidMount() {
    const { initialValues } = this.props;
    this.setState({
      selectedColor: initialValues.color,
      selectedFit: initialValues.Fit,
      selectedSize: initialValues.Size,
      selectedQuantity: initialValues.Qty,
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
          <span>
            <img
              alt=""
              className="selected-color-image"
              src={endpoints.global.baseURI + colorItem.getIn(['color', 'imagePath'])}
            />
            {colorItem.getIn(['color', 'name'])}
          </span>
        ),
        content: (
          <span>
            <img alt="" src={endpoints.global.baseURI + colorItem.getIn(['color', 'imagePath'])} />
            {colorItem.getIn(['color', 'name'])}
          </span>
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

  getSizeOptions = (colorItem, selectedFit?) => {
    let sizeOptions = [];
    if (colorItem) {
      colorItem.get('fits').forEach(fit => {
        if (selectedFit) {
          if (fit.get('fitName') === selectedFit) {
            sizeOptions = fit.get('sizes').map(size => ({
              displayName: size.get('sizeName'),
              id: size.get('sizeName'),
            }));
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
    this.setState({
      selectedFit: e.target.value,
    });
  };

  sizeChange = e => {
    this.setState({
      selectedSize: e.target.value,
    });
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

  render() {
    const { colorFitsSizesMap, item, labels, formVisiblity } = this.props;
    const { selectedColor, selectedFit, selectedQuantity } = this.state;

    const colorList = this.getColorOptions(colorFitsSizesMap);
    const selectedColorElement = this.getSelectedColorData(colorFitsSizesMap, selectedColor);
    const hasFits = selectedColorElement && selectedColorElement.getIn([0, 'hasFits']);
    const fitList = hasFits && this.getFitOptions(selectedColorElement.get(0));
    const sizeList =
      selectedColorElement &&
      (hasFits
        ? this.getSizeOptions(selectedColorElement.get(0), selectedFit)
        : this.getSizeOptions(selectedColorElement.get(0)));

    const { className } = this.props;
    const { handleSubmit } = this.props;
    const { itemId } = item.itemInfo;
    const quantity = selectedQuantity || '1';
    const { itemPartNumber } = item.productInfo;
    const { variantNo } = item.productInfo;

    return (
      <form className={className} noValidate>
        <Row className="edit-form-css">
          <div className="select-value-wrapper">
            <div className="color-selector">
              <Field
                width={87}
                id="color"
                name={selectedColor}
                component={ColorSelector}
                options={colorList}
                onChange={this.colorChange}
                dataLocator="addnewaddress-state"
              />
            </div>
            {hasFits && (
              <div className="fit-selector">
                <Field
                  width={69}
                  id="fit"
                  name="Fit"
                  component={MiniBagSelect}
                  options={fitList}
                  onChange={this.fitChange}
                  dataLocator="addnewaddress-state"
                />
              </div>
            )}
            <div className="size-selector">
              <Field
                width={69}
                id="size"
                name={this.getSizeLabel(item, labels)}
                component={MiniBagSelect}
                options={sizeList}
                onChange={this.sizeChange}
                dataLocator="addnewaddress-state"
              />
            </div>
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
          </div>
          <div className="button-wrapper">
            <Button
              inheritedStyles={buttonCustomStyles}
              type="submit"
              onClick={e => {
                e.preventDefault();
                handleSubmit(itemId, this.getSkuId(), quantity, itemPartNumber, variantNo);
              }}
            >
              {/* <u>{labels.update}</u> */}
              <u>Update</u>
            </Button>
            <Button
              inheritedStyles={buttonCustomStyles}
              onClick={() => {
                formVisiblity();
              }}
            >
              <u>{labels.cancel}</u>
            </Button>
          </div>
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
