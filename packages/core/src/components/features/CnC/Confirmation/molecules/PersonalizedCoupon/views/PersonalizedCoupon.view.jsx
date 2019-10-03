import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Barcode from '@tcp/core/src/components/common/molecules/Barcode';
import { getIconPath, viewport, isClient } from '@tcp/core/src/utils';
import styles from '../styles/PersonalizedCoupon.style';

const getValidityText = ({ endDate, startDate, isPastStartDate }, { validTill, nowThrough }) => {
  if (!endDate && !startDate) {
    return ''; // Do we want some default text here?
  }
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
      {code && (
        <BodyCopy className="code" component="div">
          <BodyCopy component="div" className="barcode" textAlign="center">
            <Barcode
              className="barcode"
              value={code}
              barcodeId={code}
              displayValue={false}
              margin={0}
            />
          </BodyCopy>
          <BodyCopy
            component="div"
            fontFamily="secondary"
            fontSize={['fs16', 'fs14', 'fs22']}
            fontWeight="extrabold"
            color="gray[900]"
            letterSpacing="1px"
            textAlign="center"
          >
            {`${labels.webCode} ${code}`}
          </BodyCopy>
        </BodyCopy>
      )}
      {validityText && (
        <BodyCopy
          className="validity"
          fontFamily="secondary"
          fontSize={['fs14', 'fs12', 'fs18']}
          textAlign="center"
          color="gray[900]"
        >
          {validityText}
        </BodyCopy>
      )}
      {disclaimer && (
        <BodyCopy className="details" textAlign="center" component="div">
          <Anchor
            fontSizeVariation="medium"
            underline
            noLink
            handleLinkClick={event => {
              event.preventDefault();
              detailCoupon(coupon);
            }}
            dataLocator={`coupon_details_${code}`}
          >
            {labels.detailsLink}
          </Anchor>
        </BodyCopy>
      )}
    </>
  );
};

const shouldShowArrowIcon = ({ startDate, endDate, code, disclaimer }) =>
  startDate || endDate || code || disclaimer;

const PersonalizedCoupon = ({ className, coupon, printCoupon, detailCoupon, labels }) => {
  const { description } = coupon;
  const small = isClient() && viewport().small;
  const [showDetail, setShowDetail] = useState(false);
  const carrotIcon = getIconPath('carrot-left');
  const printIcon = getIconPath('star-filled');

  return (
    <div className={className}>
      <BodyCopy className="personalized-coupon" textAlign="center">
        <BodyCopy component="span" className="ribbon top-left" />
        {description && (
          <BodyCopy
            className="description"
            fontSize={['fs22', 'fs16', 'fs28']}
            textAlign="center"
            color="gray[900]"
          >
            {description}
          </BodyCopy>
        )}
        {(!small || (small && showDetail)) && renderCoupon(coupon, detailCoupon, labels)}
        <BodyCopy className="print-icon" component="div">
          <Image
            src={printIcon}
            onClick={() => {
              printCoupon(coupon);
            }}
            width="20px"
            height="20px"
          />
        </BodyCopy>
        <BodyCopy component="span" className="ribbon bottom-right" />
        {small && shouldShowArrowIcon(coupon) && (
          <Anchor
            fontSizeVariation="medium"
            className="toggle-icon"
            noLink
            handleLinkClick={event => {
              event.preventDefault();
              setShowDetail(!showDetail);
            }}
          >
            <Image
              className={showDetail ? 'up-arrow' : 'down-arrow'}
              src={carrotIcon}
              width="7px"
              height="10px"
            />
          </Anchor>
        )}
      </BodyCopy>
    </div>
  );
};

PersonalizedCoupon.propTypes = {
  coupon: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
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

export default withStyles(PersonalizedCoupon, styles);
