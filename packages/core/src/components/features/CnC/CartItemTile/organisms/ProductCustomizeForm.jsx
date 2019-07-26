// TODO: Need fix unused/proptypes eslint error
/* eslint-disable */

import SelectBox from '../../../../common/atoms/Select';
import { Field, reduxForm, change } from 'redux-form';
import { getSkuId } from '../../../../../utils';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { connect } from 'react-redux';

// @flow

type Props = {
  handleSubmit: (itemId, skuId, quantity, itemPartNumber, variantNo) => void,
  colorFitsSizesMap: any,
};

export class ProductCustomizeForm extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    //const {colorFitsSizesMap} = this.props;
    const sizeList = [
      {
        displayName: 'United States',
        id: 'US',
      },
      {
        displayName: 'India',
        id: 'India',
      },
    ];

    const className = 'CartItemEditableForm';
    const { handleSubmit } = this.props;
    const itemId = '8066036228';
    const skuId = '897839';
    const quantity = '5';
    const itemPartNumber = '00889705796216';
    const variantNo = '2084644004';

    return (
      <form
        className={className}
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(itemId, skuId, quantity, itemPartNumber, variantNo);
        }}
        noValidate
      >
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 2 }}>
            <Field
              id="color"
              placeholder="Select color"
              name="Color"
              component={SelectBox}
              options={sizeList}
              dataLocator="addnewaddress-state"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 2 }}>
            <Field
              id="fit"
              placeholder="Select Fit"
              name="Fit"
              component={SelectBox}
              options={sizeList}
              dataLocator="addnewaddress-state"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 2 }}>
            <Field
              id="size"
              placeholder="Select size"
              name="Size"
              component={SelectBox}
              options={sizeList}
              dataLocator="addnewaddress-state"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 2 }}>
            <Field
              id="qty"
              placeholder="Select qty"
              name="Qty"
              component={SelectBox}
              options={sizeList}
              dataLocator="addnewaddress-state"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 3 }}>
            {/* <Button
        fill="Black"
        type="submit"
        buttonVariation="fixed-width"
        data-locator="addnewaddress-addaddress">
      Update
      </Button>
      <Button
        fill="BLUE"
        type="button"
        buttonVariation="fixed-width"
        data-locator="addnewaddress-addaddress">
      Cancel
        </Button> */}

            <Button type="submit">Update</Button>
            <Button>Cancel</Button>
          </Col>
        </Row>
      </form>
    );
  }
}
export default connect()(
  reduxForm({
    form: 'ProductCustomizeForm',
    // a unique identifier for this form
  })(ProductCustomizeForm)
);
