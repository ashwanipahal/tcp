import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Field, change, reduxForm } from 'redux-form';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import {
  GiftServicesWrapper,
  CheckBoxWrapper,
  GiftServicesHeader,
  StyledAnchor,
  GiftServicesContent,
  RadioButtonWrapper,
  AddMessageWrapper,
  InputBoxWrapper,
  ServiceDetailWrapper,
  PriceWrapper,
  ImageBrandStyle,
  RadioButtonWrapperInner,
  StyledGiftDetails,
  AddMessageHead,
} from '../styles/GiftServices.style.native';
import InputCheckbox from '../../../../../../../../common/atoms/InputCheckbox';
import LabeledRadioButton from '../../../../../../../../common/atoms/LabeledRadioButton';
import { getLocator } from '../../../../../../../../../utils';
import GiftServicesDetailsModal from './GiftServicesDetailsModal.view.native';
import GIFT_SERVICES_CONSTANTS from '../GiftServices.constants';

const gymboreeImage = require('../../../../../../../../../assets/gymboree-logo.png');
const tcpImage = require('../../../../../../../../../assets/tcp-logo.png');

class GiftServices extends React.PureComponent {
  constructor(props) {
    super(props);
    const { isGiftServicesChecked, initialValues } = this.props;

    this.state = {
      detailStatus: false,
      isChecked: isGiftServicesChecked,
      message: initialValues.message,
      selectedGiftService: initialValues.optionId ? initialValues.optionId : 'standard',
    };
  }

  handleChange = () => {
    const { isChecked } = this.state;
    const { dispatch, giftWrapOptions } = this.props;
    this.setState({
      isChecked: !isChecked,
      message: '',
    });
    const parsedDefaultSelectedGiftService = JSON.parse(giftWrapOptions);
    const defaultSelectedGiftService = parsedDefaultSelectedGiftService.giftOptions[0].catEntryId;
    if (!isChecked && dispatch) {
      dispatch(change('GiftServices', `message`, ''));
      dispatch(change('GiftServices', `optionId`, defaultSelectedGiftService));
    }
  };

  toggleDetailsModal = () => {
    const { detailStatus } = this.state;
    this.setState({
      detailStatus: !detailStatus,
    });
  };

  getServicesOptions = (giftWrapOptions, labels) => {
    const parsedGiftWrapOptions = JSON.parse(giftWrapOptions);
    const getServicesOptionsMap = parsedGiftWrapOptions.giftOptions;
    const { currencySymbol, SelectedBrand } = this.props;
    const brand = SelectedBrand;
    const labelComponent = servicesMap => hideLongDescription => (
      <>
        <ServiceDetailWrapper>
          <View>
            <BodyCopy
              dataLocator="add-gift-services-details-lbl"
              fontSize="fs16"
              mobileFontFamily="secondary"
              fontWeight={!hideLongDescription ? 'semibold' : 'regular'}
              text={servicesMap.name}
              textAlign="left"
            />
          </View>
          <PriceWrapper>
            <BodyCopy
              dataLocator="add-gift-services-details-lbl"
              fontSize="fs16"
              mobileFontFamily="secondary"
              fontWeight={!hideLongDescription ? 'semibold' : 'regular'}
              text={
                parseInt(servicesMap.price, 10) === 0
                  ? labels.tcpOptionPrice1
                  : `${currencySymbol}${servicesMap.price}`
              }
              textAlign="right"
            />
          </PriceWrapper>
        </ServiceDetailWrapper>
        {!hideLongDescription && (
          <StyledGiftDetails>
            <Text>{servicesMap.longDescription}</Text>
          </StyledGiftDetails>
        )}
      </>
    );

    return (
      getServicesOptionsMap &&
      getServicesOptionsMap
        .filter(servicesMap => servicesMap.itemBrand === brand || servicesMap.itemBrand === 'ALL')
        .map(servicesMap => {
          return {
            label: labelComponent(servicesMap),
            value: servicesMap.catEntryId,
          };
        })
    );
  };

  handleToggle = (e, brandName) => {
    const { handleToggle, dispatch, giftWrapOptions } = this.props;
    handleToggle(e, brandName);

    const parsedDefaultSelectedGiftService = JSON.parse(giftWrapOptions);
    const defaultSelectedGiftService = parsedDefaultSelectedGiftService.giftOptions[0].catEntryId;
    this.setState({
      selectedGiftService: defaultSelectedGiftService,
    });
    dispatch(change('GiftServices', `optionId`, defaultSelectedGiftService));
  };

  giftServiceChanged = value => {
    const { dispatch, labels, giftWrapOptions } = this.props;
    this.setState({
      selectedGiftService: this.getSelectedGiftService(giftWrapOptions, value, labels),
    });
    if (dispatch) {
      dispatch(change('GiftServices', `optionId`, value));
    }
  };

  getSelectedGiftService = (giftWrapOptions, catEntryId, labels) => {
    const parsedGiftWrapOptions = JSON.parse(giftWrapOptions);
    const getServicesOptionsMap = parsedGiftWrapOptions.giftOptions;
    const { currencySymbol } = this.props;
    return (
      getServicesOptionsMap &&
      getServicesOptionsMap
        .filter(servicesMap => servicesMap.catEntryId === catEntryId)
        .map(servicesMap => {
          return {
            label: (
              <>
                <ServiceDetailWrapper>
                  <View>
                    <BodyCopy
                      dataLocator="add-gift-services-details-lbl"
                      fontSize="fs16"
                      mobileFontFamily="secondary"
                      fontWeight="semibold"
                      text={servicesMap.name}
                      textAlign="left"
                    />
                  </View>
                  <PriceWrapper>
                    <BodyCopy
                      dataLocator="add-gift-services-details-lbl"
                      fontSize="fs16"
                      mobileFontFamily="secondary"
                      fontWeight="semibold"
                      text={
                        parseInt(servicesMap.price, 10) === 0
                          ? labels.tcpOptionPrice1
                          : `${currencySymbol}${servicesMap.price}`
                      }
                      textAlign="right"
                    />
                  </PriceWrapper>
                </ServiceDetailWrapper>
              </>
            ),
            value: servicesMap.catEntryId,
          };
        })
    );
  };

  render() {
    const { labels, giftWrapOptions, SelectedBrand, dispatch, isGiftServicesChecked } = this.props;
    const giftServicesList = this.getServicesOptions(giftWrapOptions, labels);
    const brand = SelectedBrand;
    const dropDownStyle = {
      height: 30,
      border: 1,
      lightBorder: true,
    };
    const itemStyle = {
      height: 90,
      paddingLeft: 10,
      paddingRight: 10,
      color: 'black',
      border: 2,
    };
    const { detailStatus, isChecked, message, selectedGiftService } = this.state;
    return (
      <GiftServicesWrapper>
        <GiftServicesHeader>
          <CheckBoxWrapper>
            <Field
              name="hasGiftWrapping"
              component={InputCheckbox}
              dataLocator="hide-show-checkbox"
              enableSuccessCheck={false}
              onClick={this.handleChange}
              isChecked={isGiftServicesChecked}
            />
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              fontWeight="extrabold"
              text={labels.giftServices}
            />
          </CheckBoxWrapper>
          <StyledAnchor>
            <Anchor
              fontSizeVariation="medium"
              fontFamily="secondary"
              underline
              anchorVariation="primary"
              onPress={this.toggleDetailsModal}
              text={labels.details}
            />
          </StyledAnchor>
        </GiftServicesHeader>
        <GiftServicesContent>
          <BodyCopy
            dataLocator="add-gift-services-details-lbl"
            fontSize="fs14"
            mobileFontFamily="secondary"
            fontWeight="regular"
            text={labels.addAGift}
          />
        </GiftServicesContent>
        {isChecked && (
          <View>
            <GiftServicesContent>
              <BodyCopy
                dataLocator="brand-gift-services-details-lbl"
                fontSize="fs14"
                mobileFontFamily="secondary"
                fontWeight="regular"
                text={labels.selectBrand}
              />
              <RadioButtonWrapper>
                <RadioButtonWrapperInner>
                  <LabeledRadioButton
                    checked={brand === GIFT_SERVICES_CONSTANTS.TCP}
                    onPress={e => this.handleToggle(e, GIFT_SERVICES_CONSTANTS.TCP)}
                    disabled={false}
                  />
                  <ImageBrandStyle
                    data-locator={getLocator('cart_item_brand_logo')}
                    source={tcpImage}
                    resizeMode="contain"
                  />
                </RadioButtonWrapperInner>
                <RadioButtonWrapperInner>
                  <LabeledRadioButton
                    checked={brand === GIFT_SERVICES_CONSTANTS.GYM}
                    onPress={e => this.handleToggle(e, GIFT_SERVICES_CONSTANTS.GYM)}
                    disabled={false}
                  />
                  <ImageBrandStyle
                    data-locator={getLocator('cart_item_brand_logo')}
                    source={gymboreeImage}
                    resizeMode="contain"
                  />
                </RadioButtonWrapperInner>
              </RadioButtonWrapper>
            </GiftServicesContent>
            <Field
              name="giftServices"
              component={DropDown}
              customDropDownHeight={270}
              data={giftServicesList}
              dataLocator="giftServices-list"
              variation="secondary"
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
              onValueChange={this.giftServiceChanged}
              selectedValue={selectedGiftService}
            />
            <AddMessageWrapper>
              <AddMessageHead>
                <BodyCopy
                  fontSize="fs14"
                  mobileFontFamily="secondary"
                  textAlign="left"
                  text={labels.addMessage}
                  color="gray.900"
                />
              </AddMessageHead>

              <BodyCopy
                fontSize="fs10"
                mobileFontFamily="secondary"
                textAlign="right"
                text={labels.charLimit}
                color="gray.900"
              />
            </AddMessageWrapper>
            <InputBoxWrapper
              name="message"
              id="message"
              value={message}
              onChangeText={text => {
                this.setState({ message: text });
                dispatch(change('GiftServices', `message`, text));
              }}
              type="text"
              maxLength={100}
              dataLocator="gift-message"
              multiline
            />
          </View>
        )}

        <GiftServicesDetailsModal
          labels={labels}
          openState={detailStatus}
          onRequestClose={() => {
            this.setState({
              detailStatus: false,
            });
          }}
          heading={labels.giftServices}
          brand={SelectedBrand}
        />
      </GiftServicesWrapper>
    );
  }
}
GiftServices.propTypes = {
  isGiftServicesChecked: PropTypes.bool,
  labels: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func,
  giftWrapOptions: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}),
  currencySymbol: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
  SelectedBrand: PropTypes.string.isRequired,
};

GiftServices.defaultProps = {
  isGiftServicesChecked: false,
  dispatch: () => {},
  initialValues: {},
};

export { GiftServices as GiftServicesVanilla };
export default reduxForm({
  form: 'GiftServices',
  enableReinitialize: true,
})(GiftServices);
