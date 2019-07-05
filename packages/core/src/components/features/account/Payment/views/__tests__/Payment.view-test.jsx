import React from 'react';
import { shallow } from 'enzyme';
import { PaymentViewVanilla } from '../Payment.view';
import Notification from '../../../../../common/molecules/Notification';
import BodyCopy from '../../../../../common/atoms/BodyCopy';

describe('Payment View', () => {
  it('should render correctly', () => {
    const tree = shallow(<PaymentViewVanilla labels={{ giftCard: 'Payment' }} className="" />);
    expect(tree).toMatchSnapshot();
    expect(tree.find(BodyCopy)).toHaveLength(1);
  });
  it('should render correctly with error', () => {
    const tree = shallow(
      <PaymentViewVanilla labels={{ giftCard: 'Payment' }} className="" showNotification="error" />
    );
    expect(tree).toMatchSnapshot();
    expect(tree.find(Notification)).toHaveLength(1);
  });
  it('should render correctly with success', () => {
    const tree = shallow(
      <PaymentViewVanilla
        labels={{ giftCard: 'Payment' }}
        className=""
        showNotification="success"
      />
    );
    expect(tree).toMatchSnapshot();
    expect(tree.find(Notification)).toHaveLength(1);
  });
});
