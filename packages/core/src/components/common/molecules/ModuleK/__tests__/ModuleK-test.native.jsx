import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import { ModuleKVanilla } from '../view/ModuleK.native';

const moduleKData = mock.moduleK.composites;

describe('ModuleK native component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ModuleKVanilla />);
  });

  it('Should renders correctly', () => {
    const wrapper = shallow(<ModuleKVanilla {...moduleKData} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should verify header text link click', () => {
    const wrapper = shallow(<ModuleKVanilla {...moduleKData} />);
    expect(wrapper.find('[testID="moduleK_header_text"]')).toHaveLength(0);
  });

  it('should render View', () => {
    expect(component.find('Styled(View)')).toHaveLength(2);
  });
});
