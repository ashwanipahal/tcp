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
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';

const colorPallete = createThemeColorPalette();

class CartItemRadioButtons extends React.Component {
  constructor(props) {
    super(props);
    this.selectedOrder = CARTPAGE_CONSTANTS.ECOM;
    if (props.productDetail.miscInfo.orderItemType === CARTPAGE_CONSTANTS.BOPIS) {
      this.selectedOrder = CARTPAGE_CONSTANTS.BOPIS;
    } else if (props.productDetail.miscInfo.orderItemType === CARTPAGE_CONSTANTS.BOSS) {
      this.selectedOrder = CARTPAGE_CONSTANTS.BOSS;
    }
    this.state = {
      selectedOrder: this.selectedOrder,
      currentExpandedState: true,
    };
  }

  getExpandedState = ({ state, index }) => {
    const { setSelectedProductTile } = this.props;
    this.setState({ currentExpandedState: state });
    if (setSelectedProductTile && state) {
      setSelectedProductTile({ index });
    }
  };

  handleToggle = (e, orderType) => {
    this.setState({ selectedOrder: orderType });
  };

  renderRadioButtonInput = ({ key }) => {
    const { selectedOrder } = this.state;
    return (
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
    );
  };

  renderRadioButton = ({ key, label }) => {
    const { selectedOrder } = this.state;
    const { productDetail } = this.props;
    return key !== CARTPAGE_CONSTANTS.BOPIS ? (
      <StyledLabeledRadioBtn>
        <LabeledRadioButton
          obj={{
            label,
            value: selectedOrder,
          }}
          index={0}
          onPress={e => this.handleToggle(e, key)}
          checked={selectedOrder === key}
          disabled={key !== CARTPAGE_CONSTANTS.ECOM}
        />
      </StyledLabeledRadioBtn>
    ) : (
      <StyledBopisBorder>
        {this.renderRadioButtonInput({ key, label })}
        <StyledText>{productDetail.miscInfo.store ? `${label}:` : label}</StyledText>
        {productDetail.miscInfo.store && (
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
        {this.renderRadioButton({ key: CARTPAGE_CONSTANTS.BOPIS, label: labels.bopisPickUp })}
        {this.renderRadioButton({ key: CARTPAGE_CONSTANTS.ECOM, label: labels.ecomShipping })}
      </>
    );
  };

  renderHeader = ({ key, label }) => {
    const { productDetail } = this.props;
    return (
      <StyledHeaderBtnWrapper pointerEvents={key !== CARTPAGE_CONSTANTS.ECOM ? 'none' : 'auto'}>
        {this.renderRadioButtonInput({ key, label })}
        <StyledText>{key === CARTPAGE_CONSTANTS.BOPIS ? `${label}:` : label}</StyledText>
        {key === CARTPAGE_CONSTANTS.BOPIS && productDetail.miscInfo.store && (
          <StyledStoreTextWrapper>
            <StyledStoreText>{` ${productDetail.miscInfo.store}`}</StyledStoreText>
          </StyledStoreTextWrapper>
        )}
      </StyledHeaderBtnWrapper>
    );
  };

  header = (index, openedTile) => {
    const { selectedOrder, currentExpandedState } = this.state;
    const {
      labels: { bossPickUp, bopisPickUp, ecomShipping },
    } = this.props;
    const { BOSS, BOPIS, ECOM } = CARTPAGE_CONSTANTS;
    const labelsMapping = {
      [BOSS]: bossPickUp,
      [BOPIS]: bopisPickUp,
      [ECOM]: ecomShipping,
    };
    let obj = {};
    if (index !== openedTile || !currentExpandedState) {
      obj = { key: selectedOrder, label: labelsMapping[selectedOrder] };
    } else {
      obj = { key: BOSS, label: labelsMapping[BOSS] };
    }
    return this.renderHeader(obj);
  };

  render() {
    const { index, openedTile } = this.props;
    return (
      <StyledWrapper>
        <CollapsibleContainer
          header={this.header(index, openedTile)}
          body={this.renderRadioButtons()}
          getExpandedState={this.getExpandedState}
          defaultOpen={index === openedTile}
          index={index}
          height="50px"
          openedTile={openedTile}
          arrowPos="20px"
          isBag
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
