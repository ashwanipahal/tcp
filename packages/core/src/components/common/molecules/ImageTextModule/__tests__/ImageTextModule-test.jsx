import React from 'react';
import { shallow } from 'enzyme';
import { ImageTextModuleVanilla as ImageTextModule } from '../views/ImageTextModule';
import mock from '../../../../../services/abstractors/common/ImageTextModule/mock';

describe('ImageTextModule Componenet', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ImageTextModule {...mock.composites} set={mock.set} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
