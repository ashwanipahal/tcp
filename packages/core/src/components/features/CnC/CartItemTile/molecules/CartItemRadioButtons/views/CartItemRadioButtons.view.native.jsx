import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LabeledRadioButton, BodyCopy, Anchor } from '../../../../../../common/atoms';
import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';
import CollapsibleContainer from '../../../../../../common/molecules/CollapsibleContainer';
import {
  StyledWrapper,
  StyledTopRow,
  StyledBottomRow,
  StyledRadioButtonItem,
  StyledDatesWrapper,
  StyledStoreWrapper,
  StyledChangeStore,
  labelStyle,
  disabledLabelStyle,
} from '../styles/CartItemRadioButtons.style.native';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';

class CartItemRadioButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExpandedState: true,
    };
  }

  getExpandedState = ({ state, index }) => {
    const { setSelectedProductTile } = this.props;
    this.setState({ currentExpandedState: state }, () => {
      if (setSelectedProductTile && state) {
        setSelectedProductTile({ index });
      }
    });
  };

  /**
   * @function renderBossDates Renders the boss dates values in the format as required.
   * @param {bool} isBossItem Represents if the current item is Boss Item or not
   * @returns {JSX} renders the boss dates unit
   * @memberof CartItemRadioButtons
   */
  renderBossDates = isBossItem => {
    const {
      labels,
      productDetail: {
        miscInfo: { bossStartDate, bossEndDate },
      },
    } = this.props;
    return isBossItem ? (
      <StyledDatesWrapper>
        <BodyCopy fontFamily="secondary" fontSize="fs10" color="gray[800]" text={labels.by} />
        <BodyCopyWithSpacing
          fontWeight="extrabold"
          fontFamily="secondary"
          fontSize="fs10"
          color="gray[800]"
          spacingStyles="padding-left-XXS"
          text={`${bossStartDate.get('day')}. ${bossStartDate.get('month')} ${bossStartDate.get(
            'date'
          )} - ${bossEndDate.get('day')}. ${bossEndDate.get('month')} ${bossEndDate.get('date')}`}
        />
      </StyledDatesWrapper>
    ) : null;
  };

  renderStore = () => {
    const {
      labels,
      productDetail: {
        miscInfo: { store },
      },
    } = this.props;
    return store ? (
      <StyledStoreWrapper>
        <BodyCopy fontFamily="secondary" fontSize="fs10" color="gray[800]" text={labels.at} />
        <BodyCopyWithSpacing
          fontWeight="extrabold"
          fontFamily="secondary"
          fontSize="fs10"
          color="gray[800]"
          spacingStyles="padding-left-XXS"
          text={store}
        />
      </StyledStoreWrapper>
    ) : null;
  };

  /**
   * @function hideChangeStore Method use to handle various conditions for show hide the change store link
   * @param {bool} isBossItem Represents if the current item is Boss Item or not
   * @returns {bool} Whether to hide the change store
   * @memberof CartItemRadioButtons
   */
  hideChangeStore = isBossItem => {
    const {
      isBossEnabled,
      isBopisEnabled,
      productDetail: {
        miscInfo: { isBossEligible, isBopisEligible, availability },
      },
    } = this.props;

    if (isBossItem) {
      return !(
        !isBossEnabled ||
        !isBossEligible ||
        availability !== CARTPAGE_CONSTANTS.AVAILABILITY.OK
      );
    }
    return !(!isBopisEnabled || !isBopisEligible);
  };

  /**
   * @function renderChangeStore
   * @param {bool} disabled Represents with the current item is disabled or not
   * @param {bool} isBossItem Represents if the current item is Boss Item or not
   * @returns {JSX} Render Change store link.
   * @memberof CartItemRadioButtons
   */
  renderChangeStore = (disabled, isBossItem) => {
    const { labels } = this.props;
    return !disabled || this.hideChangeStore(isBossItem) ? (
      <Anchor fontSizeVariation="small">
        <StyledChangeStore>
          <BodyCopy
            fontSize="fs12"
            fontFamily="secondary"
            color="gray[900]"
            text={`${labels.changeStore}`}
          />
        </StyledChangeStore>
      </Anchor>
    ) : null;
  };

  renderRadioButton = ({
    isSelected,
    disabled,
    radioText,
    onlineClearanceMessage,
    isBossItem,
    isEcomItem,
  }) => {
    return (
      <StyledRadioButtonItem disabled={disabled}>
        <StyledTopRow>
          <LabeledRadioButton
            obj={{
              label: radioText,
              value: isSelected,
            }}
            index={0}
            labelStyle={disabled ? disabledLabelStyle : labelStyle}
            // onPress={e => this.handleToggle(e, key)}
            checked={isSelected}
            disabled={disabled}
            disabledWithAlert={disabled && isSelected}
          />
          {onlineClearanceMessage && (
            <BodyCopyWithSpacing
              fontFamily="secondary"
              fontSize="fs12"
              color="gray[800]"
              spacingStyles="padding-left-MED"
              text={onlineClearanceMessage}
            />
          )}
        </StyledTopRow>
        {!isEcomItem && isSelected && !onlineClearanceMessage && (
          <StyledBottomRow>
            <View>
              {this.renderStore()}
              {this.renderBossDates(isBossItem)}
            </View>
            {this.renderChangeStore(disabled, isBossItem)}
          </StyledBottomRow>
        )}
      </StyledRadioButtonItem>
    );
  };

  showHeaderBossRadioButton = (currentExpandedState, isOpened) => {
    const { isBOSSOrder, isBossEnabled } = this.props;
    return (
      ((!isOpened || !currentExpandedState) && isBOSSOrder) ||
      (currentExpandedState && isOpened && (isBossEnabled || isBOSSOrder))
    );
  };

  showHeaderBopisRadioButton = (currentExpandedState, isOpened) => {
    const { isBOSSOrder, isBOPISOrder, isBossEnabled, isBopisEnabled } = this.props;
    return (
      ((!isOpened || !currentExpandedState) && isBOPISOrder) ||
      (currentExpandedState && isOpened && !(isBossEnabled || isBOSSOrder) && isBopisEnabled)
    );
  };

  showHeaderEcomRadioButton = (currentExpandedState, isOpened) => {
    const { isECOMOrder } = this.props;
    return (!isOpened || !currentExpandedState) && isECOMOrder;
  };

  renderHeaderRadioButtons = () => {
    const {
      isECOMOrder,
      isBOSSOrder,
      isBOPISOrder,
      bossDisabled,
      bopisDisabled,
      isEcomSoldout,
      index,
      openedTile,
      noBossMessage,
      noBopisMessage,
      productDetail: {
        miscInfo: { store },
      },
      labels,
    } = this.props;
    const { currentExpandedState } = this.state;
    const isOpened = index === openedTile;
    return (
      <>
        {this.showHeaderBossRadioButton(currentExpandedState, isOpened) &&
          this.renderRadioButton({
            isSelected: isBOSSOrder,
            disabled: bossDisabled,
            radioText: labels.bossPickUp,
            onlineClearanceMessage: noBossMessage,
            isBossItem: true,
            isEcomItem: false,
            store,
          })}
        {this.showHeaderBopisRadioButton(currentExpandedState, isOpened) &&
          this.renderRadioButton({
            isSelected: isBOPISOrder,
            disabled: bopisDisabled,
            radioText: labels.bopisPickUp,
            onlineClearanceMessage: noBopisMessage,
            isBossItem: false,
            isEcomItem: false,
            store,
          })}
        {this.showHeaderEcomRadioButton(currentExpandedState, isOpened) &&
          this.renderRadioButton({
            isSelected: isECOMOrder,
            disabled: isEcomSoldout,
            radioText: labels.ecomShipping,
            onlineClearanceMessage: false,
            isBossItem: false,
            isEcomItem: true,
          })}
      </>
    );
  };

  renderBodyRadioButtons = () => {
    const {
      isECOMOrder,
      isBOPISOrder,
      isBopisEnabled,
      bopisDisabled,
      isEcomSoldout,
      noBopisMessage,
      productDetail: {
        miscInfo: { store },
      },
      index,
      openedTile,
      labels,
    } = this.props;
    const { currentExpandedState } = this.state;
    const isOpened = index === openedTile;
    return (
      <>
        {!this.showHeaderBopisRadioButton(currentExpandedState, isOpened) &&
          (isBopisEnabled || isBOPISOrder) &&
          this.renderRadioButton({
            isSelected: isBOPISOrder,
            disabled: bopisDisabled,
            radioText: labels.bopisPickUp,
            onlineClearanceMessage: noBopisMessage,
            isBossItem: false,
            isEcomItem: false,
            store,
          })}
        {this.renderRadioButton({
          isSelected: isECOMOrder,
          disabled: isEcomSoldout,
          radioText: labels.ecomShipping,
          onlineClearanceMessage: false,
          isBossItem: false,
          isEcomItem: true,
        })}
      </>
    );
  };

  render() {
    const { index, openedTile } = this.props;
    return (
      <StyledWrapper>
        <CollapsibleContainer
          header={this.renderHeaderRadioButtons()}
          body={this.renderBodyRadioButtons()}
          getExpandedState={this.getExpandedState}
          defaultOpen={index === openedTile}
          index={index}
          height="auto"
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
  isECOMOrder: PropTypes.bool.isRequired,
  isBOSSOrder: PropTypes.bool.isRequired,
  isBOPISOrder: PropTypes.bool.isRequired,
  isBossEnabled: PropTypes.bool.isRequired,
  isBopisEnabled: PropTypes.bool.isRequired,
  bossDisabled: PropTypes.bool.isRequired,
  bopisDisabled: PropTypes.bool.isRequired,
  isEcomSoldout: PropTypes.bool.isRequired,
  noBossMessage: PropTypes.bool.isRequired,
  noBopisMessage: PropTypes.bool.isRequired,
};

CartItemRadioButtons.defaultProps = {
  index: 0,
  openedTile: 0,
};

export default CartItemRadioButtons;
export { CartItemRadioButtons as CartItemRadioButtonsVanilla };
