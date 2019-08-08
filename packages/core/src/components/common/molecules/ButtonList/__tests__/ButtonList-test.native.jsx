import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleN/mock';
import { ButtonListVanilla } from '../views/ButtonList.native';
import { Container } from '../ButtonList.styles.native';

describe('ButtonList', () => {
  let stackedCTAList;
  let scrollCTAList;
  let linkCTAList;
  let imageCTAList;

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
        scrollCTAButtons={mock.moduleN.composites.linkList}
      />
    );

    linkCTAList = shallow(
      <ButtonListVanilla
        buttonListVariation="linkCTAList"
        linkList={mock.moduleN.composites.linkList}
      />
    );

    imageCTAList = shallow(
      <ButtonListVanilla
        buttonListVariation="imageCTAList"
        divImageCTACarousel={mock.moduleN.composites.divImageCTACarousel}
      />
    );
  });

  it('ButtonList should be defined', () => {
    expect(stackedCTAList).toBeDefined();
    expect(scrollCTAList).toBeDefined();
    expect(linkCTAList).toBeDefined();
    expect(imageCTAList).toBeDefined();
  });

  it('ButtonList should render correctly', () => {
    expect(stackedCTAList).toMatchSnapshot();
    expect(scrollCTAList).toMatchSnapshot();
    expect(linkCTAList).toMatchSnapshot();
    expect(imageCTAList).toMatchSnapshot();
  });

  it('should render Container', () => {
    expect(stackedCTAList.find(Container)).toHaveLength(2);
    expect(scrollCTAList.find(Container)).toHaveLength(1);
    expect(linkCTAList.find(Container)).toHaveLength(1);
    expect(imageCTAList.find(Container)).toHaveLength(1);
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

  it('should render scrollCTAListContainer', () => {
    expect(imageCTAList.find(Container)).toHaveLength(1);
  });

  it('should render scrollCTAList View', () => {
    expect(imageCTAList.find('Styled(View)')).toHaveLength(1);
  });

  it('should render scrollCTAList CustomButton', () => {
    expect(imageCTAList.find('Styled(CustomButton)')).toHaveLength(0);
  });

  it('should render scrollCTAList FlatList', () => {
    expect(imageCTAList.find('FlatList')).toHaveLength(1);
  });

  it('should render linkCTAList Container', () => {
    expect(linkCTAList.find(Container)).toHaveLength(1);
  });
});
