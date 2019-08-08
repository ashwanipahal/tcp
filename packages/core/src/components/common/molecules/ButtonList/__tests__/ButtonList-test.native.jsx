import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleN/mock';
import { ButtonListVanilla } from '../views/ButtonList.native';
import { Container, ScrollViewContainer } from '../ButtonList.styles.native';

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
  });

  it('should render Container', () => {
    expect(stackedCTAList.find(ScrollViewContainer)).toHaveLength(0);
  });
});
