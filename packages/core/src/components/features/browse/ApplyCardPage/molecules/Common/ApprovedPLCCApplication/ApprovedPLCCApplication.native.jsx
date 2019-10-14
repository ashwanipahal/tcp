/* eslint-disable react-native-a11y/has-accessibility-props */
import React, { useRef, useEffect, useState } from 'react';
import { TouchableOpacity, Clipboard } from 'react-native';
import PropTypes from 'prop-types';
import { Button, RichText } from '../../../../../../common/atoms';
import {
  ImageContainer,
  StyledImage,
  ScrollViewContainer,
  StyledBodyCopy,
  CouponCodeWrapper,
  RichTextContainer,
  CheckoutButtonWrapper,
  ButtonWrapper,
  BottomContainer,
  StyledAnchor,
  ShippingInfoWrapper,
  SavingAmountWrapper,
  HorizontalLine,
  PSContainer,
  CopyToClipBoardWrapper,
} from './style/ApprovedPLCCApplication.style.native';
import { getLabelValue } from '../../../../../../../utils/utils';
import { readCookieMobileApp } from '../../../../../../../../../mobileapp/src/utils/utils';

const headerImage = require('../../../../../../../assets/tcp-cc.png');
const couponImage = require('../../../../../../../assets/promo.png');

/**
 * @function - fetchTotalSavingOnOrder
 *
 * @param {*} plccData - richtext data.
 * @param {*} approvedPLCCData - successful WIC data.
 */
const fetchTotalSavingOnOrder = (plccData = {}, approvedPLCCData = {}) => {
  return (
    plccData && plccData.total_savings_amount.replace('amount', `$${approvedPLCCData.savingAmount}`)
  );
};

/**
 * @function - copyToClipboard
 *
 * @param {*} couponCode - text data.
 */
const copyToClipboard = async couponCode => {
  await Clipboard.setString(couponCode);
};

/**
 * @const getCouponBody
 *
 * @param - labels
 * @param - plccData - comprehensive plcc data for forming view of approved plcc customer.
 * @param - approvedPLCCData - data of successful WIC
 *
 * @description - showcases user already holds a plcc card.
 */

const getCouponBody = (plccData, labels, approvedPLCCData) => {
  return approvedPLCCData && approvedPLCCData.couponCode ? (
    <React.Fragment>
      <HorizontalLine />
      <StyledBodyCopy
        color="gray.900"
        fontFamily="secondary"
        fontWeight="extrabold"
        fontSize="fs22"
        textAlign="center"
        text={getLabelValue(labels, 'lbl_PLCCForm_welcomeOffer')}
        paddingBottom="16px"
      />
      <CouponCodeWrapper
        color="black"
        fontFamily="secondary"
        fontWeight="regular"
        fontSize="fs22"
        textAlign="center"
        paddingTop="16px"
        paddingBottom="16px"
        marginLeft="60px"
        text={approvedPLCCData && approvedPLCCData.couponCode}
      />
      <TouchableOpacity onPress={() => copyToClipboard(approvedPLCCData.couponCode)}>
        <CopyToClipBoardWrapper
          color="gray.900"
          fontFamily="secondary"
          fontWeight="regular"
          fontSize="fs18"
          textAlign="center"
          text={getLabelValue(labels, 'lbl_PLCCForm_copyToClipboard')}
          paddingTop="16px"
          paddingBottom="24px"
        />
      </TouchableOpacity>
      <ImageContainer>
        <StyledImage source={couponImage} width="158px" height="125px" />
      </ImageContainer>
      <PSContainer>
        <RichText source={{ html: plccData && plccData.plcc_approved_ps }} />
      </PSContainer>
      <HorizontalLine />
    </React.Fragment>
  ) : null;
};

/**
 * @const footerContainer
 *
 * @param - labels
 * @param - plccData - comprehensive plcc data for forming view of approved plcc customer.
 * @param - approvedPLCCData - data of successful WIC
 * @param - bagItems - bag items contained
 * @param - navigation - helper to navigate between screens
 * @param - toggleModal - toggles modal
 *
 * @description - showcases user already holds a plcc card.
 */

const footerBottom = (plccData, labels, approvedPLCCData, bagItems, navigation, toggleModal) => {
  const totalSavings = fetchTotalSavingOnOrder(plccData, approvedPLCCData);
  return (
    <React.Fragment>
      {approvedPLCCData && approvedPLCCData.savingAmount > 0 ? (
        <SavingAmountWrapper>
          <RichText
            source={{
              html: totalSavings,
            }}
          />
        </SavingAmountWrapper>
      ) : null}
      {bagItems ? (
        <ButtonWrapper>
          <Button
            fill="BLUE"
            type="submit"
            fontWeight="regular"
            color="white"
            text={getLabelValue(labels, 'lbl_PLCCForm_checkout')}
            onPress={() => {
              toggleModal();
              navigation.navigate('bag');
            }}
            width="100%"
          />
        </ButtonWrapper>
      ) : null}
      <CheckoutButtonWrapper>
        <Button
          fill={bagItems ? 'WHITE' : 'BLUE'}
          type="submit"
          color={bagItems ? 'black' : 'white'}
          text={getLabelValue(labels, 'lbl_PLCCForm_continueShopping')}
          onPress={() => {
            navigation.navigate('Home');
          }}
          width="100%"
        />
      </CheckoutButtonWrapper>
      <BottomContainer>
        <StyledBodyCopy
          fontSize="fs10"
          fontFamily="secondary"
          text={getLabelValue(labels, 'lbl_PLCCModal_linksTextPrefix')}
          paddingRight="4px"
        />
        <StyledAnchor
          url={getLabelValue(labels, 'lbl_PLCCModal_detailsLink')}
          fontSizeVariation="medium"
          anchorVariation="primary"
          underline
          text={getLabelValue(labels, 'lbl_PLCCForm_details')}
          paddingRight="28px"
        />
      </BottomContainer>
    </React.Fragment>
  );
};

/**
 * @const ApprovedPLCCApplicationView
 *
 * @param - labels
 * @param - plccData - comprehensive plcc data for forming view of approved plcc customer.
 * @description - showcases user already holds a plcc card.
 */

const ApprovedPLCCApplicationView = ({
  plccData,
  labels,
  approvedPLCCData,
  isGuest,
  navigation,
  toggleModal,
}) => {
  const viewRef = useRef(null);
  const [bagItems, setBagItems] = useState(0);
  const setCount = () => {
    const cartValuePromise = readCookieMobileApp('cartItemsCount');
    cartValuePromise.then(res => {
      setBagItems(parseInt(res || 0, 10));
    });
  };
  useEffect(() => {
    viewRef.current.scrollTo({ x: 0, y: 0 });
    setCount();
  }, []);
  return (
    <ScrollViewContainer ref={viewRef}>
      <ImageContainer>
        <StyledImage source={headerImage} width="70%" height="166px" />
      </ImageContainer>
      <StyledBodyCopy
        color="gray.900"
        fontFamily="secondary"
        fontWeight="regular"
        fontSize="fs22"
        textAlign="center"
        text={`${getLabelValue(labels, 'lbl_PLCCForm_congratulations')}${approvedPLCCData &&
          approvedPLCCData.address.firstName}!`}
        paddingTop="32px"
      />
      <StyledBodyCopy
        color="gray.900"
        fontFamily="secondary"
        fontWeight="regular"
        fontSize="fs22"
        textAlign="center"
        text={`${getLabelValue(labels, 'lbl_PLCCForm_creditLimit')} $${approvedPLCCData &&
          approvedPLCCData.creditLimit}`}
      />
      <RichTextContainer>
        <RichText source={{ html: plccData && plccData.rewards_card_welcome }} />
      </RichTextContainer>
      <ShippingInfoWrapper>
        {!isGuest ? (
          <RichText source={{ html: plccData && plccData.plcc_shipping_info }} />
        ) : (
          <RichText source={{ html: plccData && plccData.guest_shipping_info }} />
        )}
      </ShippingInfoWrapper>
      {getCouponBody(plccData, labels, approvedPLCCData)}
      {footerBottom(plccData, labels, approvedPLCCData, bagItems, navigation, toggleModal)}
    </ScrollViewContainer>
  );
};

ApprovedPLCCApplicationView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  approvedPLCCData: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool.isRequired,
  plccData: PropTypes.shape({}).isRequired,
  navigation: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ApprovedPLCCApplicationView;
