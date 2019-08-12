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
      selectedSkuId: 0,
    };
  }

  componentDidMount() {
    const { initialValues } = this.props;
    this.setState({
      selectedColor: initialValues.color,
      selectedFit: initialValues.fit,
      selectedSize: initialValues.size,
      selectedQuantity: initialValues.qty,
    });
  }

  getSkuId = () => {
    const { selectedColor, selectedFit, selectedSize } = this.state;
    const { colorFitsSizesMap } = this.props;
    const colorItem = this.getSelectedColorData(colorFitsSizesMap, selectedColor);
    const hasFits = colorItem.getIn([0, 'hasFits']);
    let selectedSkuId;

    // eslint-disable-next-line sonarjs/no-all-duplicated-branches
    if (hasFits) {
      colorItem.getIn([0, 'fits']).map(fit => {
        if (fit.get('fitName') === selectedFit) {
          return fit.get('sizes').map(size => {
            if (size.get('sizeName') === selectedSize) {
              // this.setState({
              //   selectedSkuId : size.get('skuId')})
              selectedSkuId = size.get('skuId');
            }
          });
        }
      });
    } else {
      colorItem.getIn([0, 'fits']).map(fit => {
        // eslint-disable-next-line sonarjs/no-identical-functions
        fit.get('sizes').map(size => {
          if (size.get('sizeName') === selectedSize) {
            // eslint-disable-next-line prefer-destructuring
            // this.setState({
            //   selectedSkuId : size.get('skuId'),
            // })
            selectedSkuId = size.get('skuId');
          }
        });
      });
    }
    if (selectedSkuId.length) {
      return selectedSkuId;
    }
  };

  getSelectedColorData = (colorFitsSizesMap, color) => {
    return (
      colorFitsSizesMap &&
      colorFitsSizesMap.filter(colorItem => {
        if (colorItem.getIn(['color', 'name']) === color.name) {
          return colorItem;
        }
        return '';
      })
    );
  };

  getColorOptions = colorFitsSizesMap => {
    const colorOptions = [];
    // eslint-disable-next-line no-unused-expressions
    colorFitsSizesMap &&
      colorFitsSizesMap.map(colorItem => {
        colorOptions.push({
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
              <img
                alt=""
                src={endpoints.global.baseURI + colorItem.getIn(['color', 'imagePath'])}
              />
              {colorItem.getIn(['color', 'name'])}
            </span>
          ),
          value: colorItem.getIn(['color', 'name']),
        });
        return '';
      });
    return colorOptions;
  };

  getFitOptions = colorItem => {
    const fitOptions = [];
    // eslint-disable-next-line no-unused-expressions
    colorItem &&
      colorItem.get('fits').map(fit => {
        fitOptions.push({
          displayName: fit.get('fitName'),
          id: fit.get('fitName'),
        });
        return '';
      });
    return fitOptions;
  };

  getSizeOptions = (colorItem, selectedFit?) => {
    const sizeOptions = [];
    // eslint-disable-next-line no-unused-expressions
    colorItem &&
      colorItem.get('fits').map(fit => {
        if (selectedFit) {
          if (fit.get('fitName') === selectedFit) {
            fit.get('sizes').map(size => {
              return sizeOptions.push({
                displayName: size.get('sizeName'),
                id: size.get('sizeName'),
              });
            });
          }
        } else {
          // eslint-disable-next-line sonarjs/no-identical-functions
          return fit.get('sizes').map(size => {
            return sizeOptions.push({
              displayName: size.get('sizeName'),
              id: size.get('sizeName'),
            });
          });
        }
        return '';
      });
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
    const quantityArray = [];
    for (let i = 0; i < 15; i++) {
      const num = i;
      quantityArray.push({
        displayName: num + 1,
        id: num + 1,
      });
    }
    return quantityArray;
  };

  render() {
    const { colorFitsSizesMap, item, labels, formVisiblity } = this.props;
    const { selectedColor, selectedFit, selectedSize, selectedQuantity } = this.state;

    const colorList = this.getColorOptions(colorFitsSizesMap);
    const selectedColorElement = this.getSelectedColorData(colorFitsSizesMap, selectedColor);
    // eslint-disable-next-line prefer-destructuring
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
    const { selectedSkuId } = this.state;
    const quantity = selectedQuantity || '3';
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
                width={50}
                id="size"
                name="Size"
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
