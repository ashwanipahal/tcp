import React from 'react';
import PropTypes from 'prop-types';
import { RadioButtonInput } from 'react-native-simple-radio-button';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import { LabeledRadioButton } from '../../../../../../common/atoms';
import CollapsibleContainer from '../../../../../../common/molecules/CollapsibleContainer';
import {
  StyledWrapper,
  StyledLabeledRadioBtn,
  StyledText,
  StyledHeaderBtnWrapper,
} from '../styles/CartItemRadioButtons.style.native';

const colorPallete = createThemeColorPalette();

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
      expandedState: false,
    };
  }

  getExpandedState = state => {
    this.setState({ expandedState: state });
  };

  handleToggle = (e, orderType) => {
    this.setState({ selectedOrder: orderType });
  };

  renderRadioButton = ({ key, label }) => {
    const { selectedOrder } = this.state;
    return (
      <StyledLabeledRadioBtn>
        <LabeledRadioButton
          obj={{
            label,
            value: selectedOrder,
          }}
          index={0}
          onPress={e => this.handleToggle(e, key)}
          checked={selectedOrder === key}
        />
      </StyledLabeledRadioBtn>
    );
  };

  renderRadioButtons = () => {
    const { labels } = this.props;
    return (
      <>
        {this.renderRadioButton({ key: 'BOPIS', label: labels.bopisPickUp })}
        {this.renderRadioButton({ key: 'ECOM', label: labels.ecomShipping })}
      </>
    );
  };

  renderHeader = ({ key, label }) => {
    const { selectedOrder } = this.state;
    return (
      <StyledHeaderBtnWrapper>
        <RadioButtonInput
          isSelected={selectedOrder === key}
          borderWidth={1}
          buttonInnerColor={colorPallete.black}
          buttonOuterColor={colorPallete.black}
          buttonSize={10}
          buttonOuterSize={20}
          buttonStyle={{}}
        />
        <StyledText>{label}</StyledText>
      </StyledHeaderBtnWrapper>
    );
  };

  header = () => {
    const { selectedOrder, expandedState } = this.state;
    const { labels } = this.props;
    if (!expandedState) {
      switch (selectedOrder) {
        case 'BOSS':
          return this.renderHeader({ key: 'BOSS', label: labels.bossPickUp });
        case 'BOPIS':
          return this.renderHeader({ key: 'BOPIS', label: labels.bopisPickUp });
        case 'ECOM':
          return this.renderHeader({ key: 'ECOM', label: labels.ecomShipping });
        default:
          return this.renderHeader({ key: 'BOSS', label: labels.bossPickUp });
      }
    } else return this.renderHeader({ key: 'BOSS', label: labels.bossPickUp });
  };

  render() {
    const header = this.header();
    return (
      <StyledWrapper>
        <CollapsibleContainer
          header={header}
          body={this.renderRadioButtons()}
          getExpandedState={this.getExpandedState}
          style={{ width: '100%' }}
        />
      </StyledWrapper>
    );
  }
}

CartItemRadioButtons.propTypes = {
  productDetail: PropTypes.shape({
    miscInfo: {},
  }).isRequired,
  labels: PropTypes.shape({}).isRequired,
};

export default CartItemRadioButtons;
export { CartItemRadioButtons as CartItemRadioButtonsVanilla };
