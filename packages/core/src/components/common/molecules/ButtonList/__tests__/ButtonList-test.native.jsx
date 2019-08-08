import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleN/mock';
import { ButtonListVanilla } from '../views/ButtonList.native';

describe('ButtonList', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <ButtonListVanilla
        buttonListVariation="scrollCTAList"
        linkList={mock.moduleN.composites.linkList}
      />
    );
  });

  it('ButtonList should be defined', () => {
    expect(component).toBeDefined();
  });

  it('ButtonList should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
