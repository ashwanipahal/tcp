import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { isCanada } from '@tcp/core/src/utils';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import CouponDetailModal from '../../../../common/organism/CouponAndPromos/views/CouponDetailModal.view';
import PersonalizedCoupon from '../../../molecules/PersonalizedCoupon';
import ModalTextWrapper from '../styles/PersonalizedCoupons.style.native';
import CONSTANTS from '../../../../Checkout/Checkout.constants';

export const PersonalizedCoupons = ({ coupons, couponLabels, labels }) => {
  const [selectedCoupon, selectCoupon] = useState(null);
  const [openPrintModal, setPrintModal] = useState(false);
  const [openDetailsModal, setDetailsModal] = useState(false);

  const printCoupon = ({ code, description, endDate, disclaimer }) => {
    selectCoupon({
      id: code,
      title: description,
      expirationDate: endDate,
      legalText: disclaimer,
      status: '',
    });
    setPrintModal(true);
  };

  const detailCoupon = ({ code, description, endDate, disclaimer }) => {
    selectCoupon({
      id: code,
      title: description,
      expirationDate: endDate,
      legalText: disclaimer,
      status: '',
    });
    setDetailsModal(true);
  };

  let couponsList = coupons;
  if (isCanada()) {
    couponsList =
      couponsList &&
      couponsList.filter(coupon => coupon.categoryType !== CONSTANTS.LOYALITY_OFFERS);
  }

  return couponsList ? (
    <View>
      <BodyCopy
        mobilefontFamily="secondary"
        fontSize="fs12"
        color="gray[800]"
        textAlign="center"
        text={labels.heading1}
      />
      <BodyCopy
        mobilefontFamily="secondary"
        fontSize="fs12"
        color="gray[800]"
        textAlign="center"
        text={labels.heading2}
      />
      {couponsList.map(coupon => (
        <PersonalizedCoupon
          key={coupon.code}
          coupon={coupon}
          printCoupon={printCoupon}
          detailCoupon={detailCoupon}
          labels={labels}
        />
      ))}
      {selectedCoupon && (
        <CouponDetailModal
          coupon={selectedCoupon}
          openState={openPrintModal}
          onRequestClose={() => setPrintModal(false)}
          labels={couponLabels}
          isConfirmation
        />
      )}

      {selectedCoupon && (
        <Modal
          isOpen={openDetailsModal}
          onRequestClose={() => setDetailsModal(false)}
          horizontalBar={false}
          heading=" "
          headingFontFamily="secondary"
          headingFontWeight="semibold"
        >
          <ModalTextWrapper>
            <BodyCopy
              mobilefontFamily="secondary"
              fontSize="fs14"
              color="gray[900]"
              text={selectedCoupon.legalText}
            />
          </ModalTextWrapper>
        </Modal>
      )}
    </View>
  ) : null;
};

PersonalizedCoupons.propTypes = {
  coupons: PropTypes.shape([]).isRequired,
  couponLabels: PropTypes.shape({}),
  labels: PropTypes.shape({
    heading1: PropTypes.string,
    heading2: PropTypes.string,
    webCode: PropTypes.string,
    validTill: PropTypes.string,
    nowThrough: PropTypes.string,
    detailsLink: PropTypes.string,
  }),
};

PersonalizedCoupons.defaultProps = {
  couponLabels: {},
  labels: {
    heading1: '',
    heading2: '',
    webCode: '',
    validTill: '',
    nowThrough: '',
    detailsLink: '',
  },
};

export default PersonalizedCoupons;
