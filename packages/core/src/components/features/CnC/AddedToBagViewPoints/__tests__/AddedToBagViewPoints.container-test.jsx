import React from 'react';
import { shallow } from 'enzyme';
import { AddedToBagViewPointsContainer } from '../containers/AddedToBagViewPoints.container';
import AddedToBagViewPoints from '../views/AddedToBagViewPoints.view';
import AddedToBagSkeleton from '../../AddedToBag/skeleton/AddedToBagSkeleton.view';

describe('Added To Bag View Points', () => {
  it('should render AddedToBag view section', () => {
    const props = {
      pointsSummary: { totalItems: 1 },
      labels: {},
      isPlcc: true,
      currencySymbol: '$',
      isInternationalShipping: false,
      isUserLoggedIn: true,
      inheritedStyles: '',
    };
    const tree = shallow(
      <AddedToBagViewPointsContainer {...props} getOrderDetailsAction={jest.fn()} />
    );
    expect(tree.is(AddedToBagViewPoints)).toBeFalsy();
  });
});

describe('Added To Bag View Points', () => {
  it('should render AddedToBag view section', () => {
    const props = {
      pointsSummary: { totalItems: 0 },
      labels: {},
      isPlcc: true,
      currencySymbol: '$',
      isInternationalShipping: false,
      isUserLoggedIn: true,
      inheritedStyles: '',
    };
    const tree = shallow(
      <AddedToBagViewPointsContainer {...props} getOrderDetailsAction={jest.fn()} />
    );
    expect(tree.is(AddedToBagSkeleton)).toBeFalsy();
  });
});
