import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import { VanillaLinkText } from '../views/LinkText';

let LinkTextComp;

beforeEach(() => {
  LinkTextComp = shallow(<VanillaLinkText headerText={mock.moduleK.composites.headerText} />);
});

describe('Promo Text Banner component', () => {
  it('renders correctly', () => {
    expect(LinkTextComp).toMatchSnapshot();
  });

  it('Module has header', () => {
    expect(LinkTextComp.find('.link-text')).toHaveLength(1);
  });
});
