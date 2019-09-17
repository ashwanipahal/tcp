import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Field, change } from 'redux-form';
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
  // StyledGiftDetails
} from '../styles/GiftServices.style.native';
import InputCheckbox from '../../../../../../../../common/atoms/InputCheckbox';
import LabeledRadioButton from '../../../../../../../../common/atoms/LabeledRadioButton';
import { isGymboree, getLocator } from '../../../../../../../../../utils';
import GiftServicesDetailsModal from './GiftServicesDetailsModal.view.native';

const gymboreeImage = require('../../../../../../../../../assets/gymboree-logo.png');
const tcpImage = require('../../../../../../../../../assets/tcp-logo.png');

class GiftServices extends React.PureComponent {
  constructor(props) {
    super(props);
    const { isGiftServicesChecked, initialValues } = this.props;

    this.state = {
      detailStatus: false,
      isGymboreeBrand: isGymboree(),
      isChecked: isGiftServicesChecked,
      message: initialValues.message,
      selectedGiftService: 'standard',
    };
  }

  handleChange = () => {
    const { isChecked } = this.state;
    const { dispatch } = this.props;
    this.setState({
      isChecked: !isChecked,
      message: '',
    });
    if (!isChecked && dispatch) {
      dispatch(change('GiftServices', `message`, ''));
      dispatch(change('GiftServices', `optionId`, 'standard'));
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
    const { isGymboreeBrand } = this.state;
    const brand = isGymboreeBrand ? 'GYM' : 'TCP';
    return (
      getServicesOptionsMap &&
      getServicesOptionsMap
        .filter(servicesMap => servicesMap.itemBrand === brand || servicesMap.itemBrand === 'ALL')
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
                        servicesMap.price === '0.00'
                          ? labels.tcpOptionPrice1
                          : `$${servicesMap.price}`
                      }
                      textAlign="right"
                    />
                  </PriceWrapper>
                </ServiceDetailWrapper>
                {/* <StyledGiftDetails>
                  <Text>{servicesMap.longDescription}</Text>
                </StyledGiftDetails> */}
              </>
            ),
            value: servicesMap.catEntryId,
          };
        })
    );
  };

  handleToggle = (e, isGymboreeBrand) => {
    this.setState({ isGymboreeBrand });
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
                        servicesMap.price === '0.00'
                          ? labels.tcpOptionPrice1
                          : `$${servicesMap.price}`
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
    const { labels, giftWrapOptions } = this.props;
    const giftServicesList = this.getServicesOptions(giftWrapOptions, labels);
    const dropDownStyle = {
      height: 30,
      border: 2,
      borderColor: '#1a1a1a',
    };
    const itemStyle = {
      height: 90,
      paddingLeft: 10,
      paddingRight: 10,
      color: 'black',
      border: 2,
      borderColor: '#1a1a1a',
    };
    const { detailStatus, isGymboreeBrand, isChecked, message, selectedGiftService } = this.state;
    return (
      <GiftServicesWrapper>
        <GiftServicesHeader>
          <CheckBoxWrapper>
            <Field
              name="hasGiftWrapping"
              component={InputCheckbox}
              dataLocator="hide-show-checkbox"
              enableSuccessCheck={false}
              onChange={this.handleChange}
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
        {!!isChecked && (
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
                    checked={isGymboreeBrand === isGymboree()}
                    onPress={e => this.handleToggle(e, isGymboree())}
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
                    checked={isGymboreeBrand === !isGymboree()}
                    onPress={e => this.handleToggle(e, !isGymboree())}
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
              data={giftServicesList}
              dataLocator="giftServices-list"
              variation="secondary"
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
              onValueChange={this.giftServiceChanged}
              selectedValue={selectedGiftService}
            />
            <AddMessageWrapper>
              <BodyCopy
                fontSize="fs14"
                mobileFontFamily="secondary"
                textAlign="left"
                text={labels.addMessage}
                color="gray.900"
              />

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
              onChangeText={text => this.setState({ message: text })}
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
};

GiftServices.defaultProps = {
  isGiftServicesChecked: false,
  dispatch: () => {},
  initialValues: {},
};
export default GiftServices;
