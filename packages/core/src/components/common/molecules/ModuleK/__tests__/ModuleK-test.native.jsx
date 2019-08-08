import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import ModuleK from '../view/ModuleK.native';

const moduleKData = mock.moduleK.composites;

describe('ModuleK native component', () => {
  it('Should renders correctly', () => {
    const wrapper = shallow(<ModuleK {...moduleKData} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should verify header text link click', () => {
    const wrapper = shallow(<ModuleK {...moduleKData} />);
    expect(wrapper.find('[testID="moduleK_header_text"]')).toHaveLength(0);
  });
});
