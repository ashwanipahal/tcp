import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';
import styles from '../styles/CouponCard.style';
import Anchor from '../../../atoms/Anchor';
import Button from '../../../atoms/Button';

const CouponCard = ({ coupon, className }) =>
  coupon && (
    <div className={className}>
      <div className="couponCard__container">
        <BodyCopy className="couponCard__header" component="p" fontSize="fs12">
          Heading
        </BodyCopy>
        <div className="couponCard__body">
          <div className="couponCard__row">
            <div className="couponCard__col">
              <BodyCopy component="div" color="text.primary">
                <BodyCopy component="p" fontSize="fs12" fontWeight="black" fontFamily="secondary">
                  {`${coupon.title}`}
                </BodyCopy>
                <BodyCopy component="p" fontSize="fs10" fontFamily="secondary">
                  {`Valid ${coupon.effectiveDate} ${coupon.expirationDate}`}
                </BodyCopy>
              </BodyCopy>
              <Anchor
                fontSizeVariation="small"
                underline
                anchorVariation="primary"
                handleLinkClick={() => {}}
                noLink
                to=""
                fontSize="fs10"
                data-locator="couponcard-makedefault"
              >
                Detail
              </Anchor>
            </div>
            <div className="couponCard__col">
              <Button
                onClick={() => {}}
                className="coupon__button"
                buttonVariation="variable-width"
                type="submit"
                data-locator="gift-card-checkbalance-btn"
                fullWidth="true"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

CouponCard.propTypes = {
  coupon: PropTypes.shape({}).isRequired,
};

export default withStyles(CouponCard, styles);
export { CouponCard as CouponCardVanilla };
