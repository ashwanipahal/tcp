import React from 'react';
import { shallow } from 'enzyme';
import { ReviewPageVanilla } from '../views/ReviewPage.view';

describe('ReviewPageVanilla component', () => {
  it('should renders correctly props not present', () => {
    const props = { labels: {}, reviewDidMount: () => {} };
    const component = shallow(<ReviewPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
