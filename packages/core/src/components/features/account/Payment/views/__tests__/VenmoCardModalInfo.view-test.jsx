import React from 'react';
// import { List } from 'immutable';
import { shallow } from 'enzyme';
import { VenmoCardModalInfoVanilla } from '../VenmoCardModalInfo.view';

describe('VenmoCardModalInfo Component', () => {
  it('should render correctly', () => {
    const props = {
      data: { description: { properties: { venmoUserId: '@test' } } },
    };
    const tree = shallow(<VenmoCardModalInfoVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
