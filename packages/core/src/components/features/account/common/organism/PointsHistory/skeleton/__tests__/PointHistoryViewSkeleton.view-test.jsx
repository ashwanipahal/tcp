import React from 'react';
import { shallow } from 'enzyme';
import PointHistoryViewSkeleton from '../PointHistoryViewSkeleton.view';

describe('PointHistoryViewSkeleton component', () => {
  it('should renders correctly', () => {
    const props = {
      className: 'sample-class',
    };
    const component = shallow(<PointHistoryViewSkeleton {...props} />);
    expect(component).toMatchSnapshot();
  });
});
