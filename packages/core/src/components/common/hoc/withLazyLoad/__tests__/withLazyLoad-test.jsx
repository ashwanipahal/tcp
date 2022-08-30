import React from 'react';
import { shallow } from 'enzyme';
import { withLazyLoad } from '../withLazyLoad';

describe('withLazyLoad', () => {
  beforeEach(() => {});

  it('should render correctly', () => {
    const WrappedComponent = props => (
      <img src="https://picsum.photos/id/252/200/300" alt="Test lazy load" {...props} />
    );

    WrappedComponent.lazyLoadConfig = {};
    const LazyLoadWrapper = withLazyLoad(<WrappedComponent />);
    const component = shallow(<LazyLoadWrapper />);
    expect(component).toMatchSnapshot();
  });
});
