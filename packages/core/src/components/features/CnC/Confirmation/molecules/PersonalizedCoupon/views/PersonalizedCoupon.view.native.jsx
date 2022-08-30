import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import Barcode from '@tcp/core/src/components/common/molecules/Barcode';
import {
  CouponWrapper,
  CouponHeadingWrapper,
  CouponRow,
  LeftTopRibbon,
  LeftTopTriangle,
  RightBottomRibbon,
  RightBottomTriangle,
  ArrowImage,
  PrintImage,
} from '../styles/PersonalizedCoupon.style.native';

const downIcon = require('../../../../../../../assets/carrot-small-down.png');
const upIcon = require('../../../../../../../assets/carrot-small-up.png');
const iconPrinter = require('../../../../../../../assets/icon-printer.png');

const getValidityText = ({ endDate, startDate, isPastStartDate }, { validTill, nowThrough }) => {
  if (!endDate && !startDate) {
    return ''; // Do we want some default text here?
  }
  /* istanbul ignore else */
  if (isPastStartDate) {
    return `${nowThrough} ${endDate}`;
  }
  return `${validTill} ${startDate} - ${endDate}`;
};

const renderCoupon = (coupon, detailCoupon, labels) => {
  const { code, disclaimer } = coupon;
  const validityText = getValidityText(coupon, labels);
  return (
    <>
      {!!code && (
        <View>
          <Barcode value={code} barcodeId={code} width="2" displayValue={false} margin={0} />
          <BodyCopy
            mobilefontFamily="secondary"
            fontSize="fs16"
            fontWeight="extrabold"
            textAlign="center"
            text={`${labels.webCode} ${code}`}
          />
        </View>
      )}
      {!!validityText && (
        <CouponRow>
          <BodyCopy
            mobilefontFamily="secondary"
            fontSize="fs14"
            textAlign="center"
            text={validityText}
            color="gray[900]"
          />
        </CouponRow>
      )}
      {!!disclaimer && (
        <CouponRow>
          <Anchor
            underline
            anchorVariation="primary"
            fontSizeVariation="small"
            noLink
            href="#"
            target="_blank"
            dataLocator="odm-anchor"
            text={labels.detailsLink}
            onPress={() => detailCoupon(coupon)}
          />
        </CouponRow>
      )}
    </>
  );
};

const shouldShowArrowIcon = ({ startDate, endDate, code, disclaimer }) =>
  startDate || endDate || code || disclaimer;

export const PersonalizedCoupon = ({ coupon, printCoupon, detailCoupon, labels }) => {
  const { description } = coupon;
  const [showDetail, setShowDetail] = useState(false);
  return (
    <CouponWrapper>
      <LeftTopRibbon />
      <LeftTopTriangle />
      {!!description && (
        <CouponHeadingWrapper>
          <BodyCopy fontSize="fs22" textAlign="center" color="gray[900]" text={description} />
        </CouponHeadingWrapper>
      )}
      {showDetail && renderCoupon(coupon, detailCoupon, labels)}
      {!!shouldShowArrowIcon(coupon) && (
        <TouchableOpacity
          accessible
          accessibilityLabel="Tap to show details"
          accessibilityRole="none"
          onPress={() => {
            setShowDetail(!showDetail);
          }}
        >
          <ArrowImage source={showDetail ? upIcon : downIcon} />
        </TouchableOpacity>
      )}
      <RightBottomRibbon />
      <RightBottomTriangle />
      <TouchableOpacity
        accessible
        accessibilityLabel="Click here to print coupon"
        accessibilityRole="none"
        onPress={() => printCoupon(coupon)}
      >
        <PrintImage source={iconPrinter} />
      </TouchableOpacity>
    </CouponWrapper>
  );
};

PersonalizedCoupon.propTypes = {
  coupon: PropTypes.shape({
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    code: PropTypes.string,
    disclaimer: PropTypes.string,
    categoryType: PropTypes.string.isRequired,
  }).isRequired,
  printCoupon: PropTypes.func.isRequired,
  detailCoupon: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    heading1: PropTypes.string,
    heading2: PropTypes.string,
    webCode: PropTypes.string,
    validTill: PropTypes.string,
    nowThrough: PropTypes.string,
    detailsLink: PropTypes.string,
  }),
};

PersonalizedCoupon.defaultProps = {
  labels: {
    heading1: '',
    heading2: '',
    webCode: '',
    validTill: '',
    nowThrough: '',
    detailsLink: '',
  },
};

export default PersonalizedCoupon;
