import React from 'react';
import { shallow } from 'enzyme';
import * as utils from '@tcp/core/src/utils/utils.app';

import mock from '../../../../../services/abstractors/common/moduleK/mock';
import ModuleK from '../view/ModuleK.native';

const moduleKData = mock.moduleK.composites;

const { UrlHandler } = utils;
utils.UrlHandler = jest.fn();

describe('ModuleK native component', () => {
  beforeEach(() => {
    utils.UrlHandler.mockImplementation(UrlHandler);
  });

  it('Should renders correctly', () => {
    const wrapper = shallow(<ModuleK {...moduleKData} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should verify header text link click', () => {
    const wrapper = shallow(<ModuleK {...moduleKData} />);
    wrapper
      .find('[dataLocator="moduleK_header_text"]')
      .props()
      .onPress();
    expect(utils.UrlHandler).toHaveBeenCalledTimes(1);
    expect(utils.UrlHandler).toHaveBeenCalledWith(moduleKData.headerText[0].link.url);
  });
});
