import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isCanada } from '@tcp/core/src/utils';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CouponDetailModal from '../../../../common/organism/CouponAndPromos/views/CouponDetailModal.view';
import PersonalizedCoupon from '../../../molecules/PersonalizedCoupon';
import styles from '../styles/PersonalizedCoupons.style';

export const PersonalizedCoupons = ({ className, coupons, couponLabels, labels }) => {
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
      couponsList && couponsList.filter(coupon => coupon.categoryType !== 'Loyalty_Offers');
  }

  return couponsList ? (
    <div className={className}>
      <BodyCopy className="heading" component="div">
        <BodyCopy
          fontFamily="secondary"
          fontSize={['fs12', 'fs10', 'fs12']}
          color="gray[800]"
          textAlign="center"
        >
          {labels.heading1}
        </BodyCopy>
        <BodyCopy
          fontFamily="secondary"
          fontSize={['fs12', 'fs10', 'fs12']}
          color="gray[800]"
          textAlign="center"
        >
          {labels.heading2}
        </BodyCopy>
      </BodyCopy>
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
          fixedWidth
          isOpen={openDetailsModal}
          onRequestClose={() => setDetailsModal(false)}
          overlayClassName="TCPModal__Overlay"
          className={`TCPModal__Content, ${className}`}
          maxWidth="616px"
          closeIconDataLocator="coupondetailsmodalcrossicon"
        >
          <div className={className}>
            <BodyCopy
              className="details-modal-content"
              fontFamily="secondary"
              fontSize="fs14"
              color="gray[900]"
              letterSpacing="0.25px"
            >
              {selectedCoupon.legalText}
            </BodyCopy>
          </div>
        </Modal>
      )}
    </div>
  ) : null;
};

PersonalizedCoupons.propTypes = {
  coupons: PropTypes.shape([]).isRequired,
  couponLabels: PropTypes.shape({}),
  className: PropTypes.string,
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
  className: '',
  labels: {
    heading1: '',
    heading2: '',
    webCode: '',
    validTill: '',
    nowThrough: '',
    detailsLink: '',
  },
};

export default withStyles(PersonalizedCoupons, styles);
