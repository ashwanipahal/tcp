import React from 'react';
import { shallow } from 'enzyme';
import { OffersSectionVanilla } from '../views/OffersSection.native';

describe('Offers Component', () => {
  it('should render correctly', () => {
    const props = {
      labels: {
        offersMessage: '<p>offers</p>',
      },
      className: 'abc',
    };
    const tree = shallow(<OffersSectionVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
