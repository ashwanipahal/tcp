import React from 'react';
import { shallow } from 'enzyme';
import VideoPlayer from '../VideoPlayer.native';

const props = {
  poster: '',
  videoWidth: 400,
  videoHeight: 400,
  muted: '1',
  loop: '1',
  autoplay: '1',
  controls: '1',
};
describe('testing block for VideoPlayer', () => {
  it('VideoPlayer should be rendered correclty ', () => {
    const component = shallow(<VideoPlayer {...props} />);
    expect(component).toBeDefined();
  });
  const propsTwo = { ...props, isAnchor: true };
  it('VideoPlayer should be rendered correclty ', () => {
    const component = shallow(<VideoPlayer {...propsTwo} />);
    expect(component).toMatchSnapshot();
  });
});
