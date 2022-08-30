import React from 'react';
import { shallow } from 'enzyme';
import { ScreenViewShot } from '../views/ScreenViewShot';

describe('ScreenViewShot component', () => {
  it('ScreenViewShot capture view correctly', () => {
    const props = {
      options: { format: 'png', quality: 0.9, result: 'base64' },
    };
    const component = shallow(
      <ScreenViewShot {...props}>
        <div>Test</div>
      </ScreenViewShot>
    );

    expect(component).toMatchSnapshot();
  });
});
