import React from 'react';
import { mount } from 'enzyme';
import ServerOnly from '.';

describe(__filename, () => {
  it('renders nothing when the window global is defined', () => {
    const actual = mount(
      <ServerOnly>
        <p>child</p>
      </ServerOnly>
    );
    expect(actual.find('p')).toHaveLength(0);
  });
});
