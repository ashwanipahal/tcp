import React from 'react';
import { shallow } from 'enzyme';
import { DetailedCouponTile } from '../DetailedCouponTile.view';
import Barcode from '../../../../../../../common/molecules/Barcode';

import { COUPON_STATUS } from '../../../../../../../../services/abstractors/CnC/CartItemTile';

const labels = {
  lbl_coupon_expiringSoon: 'expiring soon',
  lbl_coupon_couponValid: 'valid',
  lbl_coupon_couponUseBy: 'use by',
  lbl_coupon_detailsLink: 'details',
  lbl_coupon_viewPrint: 'view & print',
  lbl_coupon_removeFromBag: 'remove from bag',
  lbl_coupon_applyToBag: 'apply',
};

describe('DetailedCouponTile', () => {
  it('should render correctly', () => {
    const props = {
      labels,
      coupon: {},
      isMobile: false,
    };
    const tree = shallow(<DetailedCouponTile {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render Barcode component if isMobile is true', () => {
    const props = {
      labels,
      coupon: {},
    };
    const component = shallow(<DetailedCouponTile {...props} />);
    expect(component.find(Barcode)).toHaveLength(1);
  });

  it('should render expiring soon notification if coupon isExpiring is true', () => {
    const props = {
      labels,
      coupon: {
        isExpiring: true,
      },
    };

    const tree = shallow(<DetailedCouponTile {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly for applied coupon', () => {
    const props = {
      labels,
      coupon: {
        status: COUPON_STATUS.APPLIED,
      },
    };

    const tree = shallow(<DetailedCouponTile {...props} />);
    expect(tree).toMatchSnapshot();
  });

  describe('#instances', () => {
    const onApplyCouponToBag = jest.fn();
    const onRemove = jest.fn();
    const onViewCouponDetails = jest.fn();
    let componentInstance;
    beforeEach(() => {
      const props = {
        labels: {},
        coupon: {},
        onApplyCouponToBag,
        onRemove,
        onViewCouponDetails,
      };
      const component = shallow(<DetailedCouponTile {...props} />);
      componentInstance = component.instance();
    });

    it('#handleApplyToBag should call onApplyCouponToBag prop', () => {
      componentInstance.handleApplyToBag();
      expect(onApplyCouponToBag).toBeCalled();
    });

    it('#handleRemove should call onRemove prop', () => {
      componentInstance.handleRemove();
      expect(onRemove).toBeCalled();
    });

    it('#handleViewCouponDetails should call onViewCouponDetails prop', () => {
      componentInstance.handleViewCouponDetails();
      expect(onViewCouponDetails).toBeCalled();
    });
  });
});
