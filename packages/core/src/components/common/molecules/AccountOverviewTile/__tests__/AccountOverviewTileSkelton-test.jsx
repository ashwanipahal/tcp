import React from 'react';
import { shallow } from 'enzyme';
import AccountOverviewTileSkelton from '../skelton/AccountOverviewTileSkelton.view';

describe('AccountOverviewTileSkelton component', () => {
  it('should renders correctly', () => {
    const props = {
      className: 'sample-class',
    };
    const component = shallow(<AccountOverviewTileSkelton {...props} />);
    expect(component).toMatchSnapshot();
  });
});
