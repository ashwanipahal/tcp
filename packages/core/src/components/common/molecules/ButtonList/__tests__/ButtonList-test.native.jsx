import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleN/mock';
import { ButtonListVanilla } from '../views/ButtonList.native';
import { Container } from '../ButtonList.styles.native';

describe('ButtonList', () => {
  let stackedCTAList;
  let scrollCTAList;

  beforeEach(() => {
    stackedCTAList = shallow(
      <ButtonListVanilla
        buttonListVariation="stackedCTAList"
        stackedCTAButtons={mock.moduleN.composites.stackedCTAButtons}
      />
    );

    scrollCTAList = shallow(
      <ButtonListVanilla
        buttonListVariation="scrollCTAList"
        scrollCTAButtons={mock.moduleN.composites.scrollCTAButtons}
      />
    );
  });

  it('ButtonList should be defined', () => {
    expect(stackedCTAList).toBeDefined();
  });

  it('ButtonList should render correctly', () => {
    expect(stackedCTAList).toMatchSnapshot();
  });

  it('should render Container', () => {
    expect(stackedCTAList.find(Container)).toHaveLength(2);
  });

  it('should render View', () => {
    expect(stackedCTAList.find('Styled(View)')).toHaveLength(2);
  });

  it('should render CustomButton', () => {
    expect(stackedCTAList.find('Styled(CustomButton)')).toHaveLength(1);
  });

  it('should render CustomButton', () => {
    expect(stackedCTAList.find('FlatList')).toHaveLength(1);
  });

  it('ButtonList should be defined', () => {
    expect(scrollCTAList).toBeDefined();
  });

  it('ButtonList should render correctly', () => {
    expect(scrollCTAList).toMatchSnapshot();
  });

  it('should render Container', () => {
    expect(scrollCTAList.find(Container)).toHaveLength(1);
  });
});
