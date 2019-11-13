import React from 'react';
import { shallow } from 'enzyme';
import { JeansModuleVanilla } from '../views/JeansModule.view.native';

describe('JeansModuleVanilla', () => {
  let component;
  const props = {
    navigation: {},
    data: {
      headLine: [
        {
          text: 'YOUR DENIM PLACE',
          style: '',
        },
      ],
      imageTileWrapper: [
        {
          imageStyled: [
            {
              image: {
                url: '/Overlay_jneg6g.jpg',
                alt: 'Jeans 1',
                title: 'Jeans 1',
              },
              styled: {
                text: 'FASHION',
              },
              __typename: 'StyledLinkedImage',
            },
          ],
          headLine: [
            {
              text: 'Headline 1',
              style: '',
            },
          ],
          subHeadLine: [
            {
              text: 'Sub headline 2',
              style: '',
            },
          ],
          textList: [
            {
              text: 'text text text',
              __typename: 'Text',
            },
          ],
          singleCTAButton: {
            url: '/dummy/dummy',
            text: 'Abc',
            target: '',
            title: '',
            __typename: 'Button',
          },
          __typename: 'ImageTileWrapper',
        },
        {
          imageStyled: [
            {
              image: {
                url: '/Overlay_jneg6g.jpg',
                alt: 'test',
                title: 'test',
              },
              styled: {
                text: 'SUPER SKINNY',
              },
            },
          ],
          headLine: [
            {
              text: 'Headline 2',
              style: '',
            },
          ],
          subHeadLine: [
            {
              text: 'Subheadline 2',
              style: '',
            },
          ],
          textList: [
            {
              text: 'dummy 2',
              __typename: 'Text',
            },
            {
              text: 'more dummy text',
              __typename: 'Text',
            },
          ],
          singleCTAButton: {
            url: '/dummy',
            text: 'SHOP NOW',
            target: '',
            title: '',
            __typename: 'Button',
          },
          __typename: 'ImageTileWrapper',
        },
      ],
      __typename: 'Composite',
      moduleName: 'jeans',
      set: [
        {
          val: 'left',
          key: 'moduleClassName',
          __typename: 'KeyValPair',
        },
        {
          val: 'black',
          key: 'bgColor',
          __typename: 'KeyValPair',
        },
      ],
      moduleClassName: 'left',
      bgColor: 'black',
    },
  };

  beforeEach(() => {
    component = shallow(<JeansModuleVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return styled view component value', () => {
    expect(component.find('Styled(View)')).toHaveLength(2);
  });

  it('should return BannerCarousel component value one', () => {
    expect(component.find('BannerCarousel')).toHaveLength(1);
  });

  it('should return styled BodyCopy component value one', () => {
    expect(component.find('Styled(BodyCopy)')).toHaveLength(1);
  });
});
