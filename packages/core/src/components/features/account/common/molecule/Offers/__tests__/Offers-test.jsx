import React from 'react';
import { shallow } from 'enzyme';
import { OffersVanilla } from '../views/Offers.view';

describe('Offers Component', () => {
  it('should render correctly', () => {
    const props = {
      labels: {
        offersMessage: '<p>offers</p>',
      },
      className: 'abc',
    };
    const tree = shallow(<OffersVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
