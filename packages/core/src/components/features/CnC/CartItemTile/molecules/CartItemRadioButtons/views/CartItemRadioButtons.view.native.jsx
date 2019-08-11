import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import withStyles from '../../../../../../common/hoc/withStyles';
import style from '../styles/CartItemRadioButtons.style';
import { BodyCopy, LabeledRadioButton } from '../../../../../../common/atoms';
import { getLocator } from '../../../../../../../utils';

class CartItemRadioButtons extends React.Component {
  constructor(props) {
    super(props);
    this.selectedOrder = 'ECOM';
    if (props.productDetail.miscInfo.orderItemType === 'BOPIS') {
      this.selectedOrder = 'BOPIS';
    } else if (props.productDetail.miscInfo.orderItemType === 'BOSS') {
      this.selectedOrder = 'BOSS';
    }
    this.state = {
      selectedOrder: this.selectedOrder,
    };
  }

  handleToggle = (e, orderType) => {
    this.setState({ selectedOrder: orderType });
  };

  render() {
    const { selectedOrder } = this.state;
    const { className, labels, productDetail } = this.props;

    return (
      <View>
        <RadioForm>
          <LabeledRadioButton
            obj={{
              label: (
                <View>
                  <Text>{labels.bossPickUp}</Text>
                </View>
              ),
              value: 'BOSS',
            }}
            index={0}
            onPress={e => this.handleToggle(e, 'BOSS')}
            checked={selectedOrder === 'BOSS'}
          />
          <LabeledRadioButton
            obj={{ label: 'param2', value: 'BOPIS' }}
            onPress={e => this.handleToggle(e, 'BOPIS')}
            checked={selectedOrder === 'BOPIS'}
          />
          <LabeledRadioButton
            onPress={e => this.handleToggle(e, 'ECOM')}
            checked={selectedOrder === 'ECOM'}
            obj={{ label: labels.ecomShipping, value: 'ECOM' }}
          />
        </RadioForm>
      </View>
    );
  }
}

CartItemRadioButtons.propTypes = {
  productDetail: PropTypes.shape({
    miscInfo: {},
  }).isRequired,
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
};

export default CartItemRadioButtons;
export { CartItemRadioButtons as CartItemRadioButtonsVanilla };
