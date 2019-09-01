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
  StyledStoreText,
  StyledStoreTextWrapper,
  StyledBopisBorder,
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
    const { index } = props;
    this.state = {
      selectedOrder: this.selectedOrder,
      expandedState: index === 0,
    };
  }

  getExpandedState = ({ state, index }) => {
    const { setSelectedProductTile } = this.props;
    this.setState({ expandedState: state });
    if (setSelectedProductTile && state) {
      setSelectedProductTile({ index });
    }
  };

  handleToggle = (e, orderType) => {
    this.setState({ selectedOrder: orderType });
  };

  renderRadioButton = ({ key, label }) => {
    const { selectedOrder } = this.state;
    const { productDetail } = this.props;
    return key !== 'BOPIS' ? (
      <StyledLabeledRadioBtn>
        <LabeledRadioButton
          obj={{
            label,
            value: selectedOrder,
          }}
          index={0}
          onPress={e => this.handleToggle(e, key)}
          checked={selectedOrder === key}
          disabled={key !== 'ECOM'}
        />
      </StyledLabeledRadioBtn>
    ) : (
      <StyledBopisBorder>
        <RadioButtonInput
          isSelected={selectedOrder === key}
          borderWidth={1}
          buttonInnerColor={colorPallete.black}
          buttonOuterColor={colorPallete.black}
          buttonSize={10}
          buttonOuterSize={20}
          onPress={e => this.handleToggle(e, key)}
          buttonStyle={{}}
          obj={{
            value: selectedOrder,
          }}
        />
        <StyledText>{`${label}:`}</StyledText>
        {key === 'BOPIS' && productDetail.miscInfo.store && (
          <StyledStoreTextWrapper>
            <StyledStoreText>{` ${productDetail.miscInfo.store}`}</StyledStoreText>
          </StyledStoreTextWrapper>
        )}
      </StyledBopisBorder>
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
    const { productDetail } = this.props;
    return (
      <StyledHeaderBtnWrapper pointerEvents={key !== 'ECOM' ? 'none' : 'auto'}>
        <RadioButtonInput
          isSelected={selectedOrder === key}
          borderWidth={1}
          buttonInnerColor={colorPallete.black}
          buttonOuterColor={colorPallete.black}
          buttonSize={10}
          buttonOuterSize={20}
          onPress={e => this.handleToggle(e, key)}
          buttonStyle={{}}
          obj={{
            value: selectedOrder,
          }}
        />
        <StyledText>{key === 'BOPIS' ? `${label}:` : label}</StyledText>
        {key === 'BOPIS' && productDetail.miscInfo.store && (
          <StyledStoreTextWrapper>
            <StyledStoreText>{` ${productDetail.miscInfo.store}`}</StyledStoreText>
          </StyledStoreTextWrapper>
        )}
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
    const { index, openedTile } = this.props;
    return (
      <StyledWrapper>
        <CollapsibleContainer
          header={header}
          body={this.renderRadioButtons()}
          getExpandedState={this.getExpandedState}
          defaultOpen={index === openedTile}
          index={index}
          height="50px"
          openedTile={openedTile}
          inCenter
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
  index: PropTypes.number,
  openedTile: PropTypes.number,
  setSelectedProductTile: PropTypes.func.isRequired,
};

CartItemRadioButtons.defaultProps = {
  index: 0,
  openedTile: 0,
};

export default CartItemRadioButtons;
export { CartItemRadioButtons as CartItemRadioButtonsVanilla };
