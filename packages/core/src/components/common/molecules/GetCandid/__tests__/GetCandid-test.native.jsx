import React from 'react';
import { shallow } from 'enzyme';
import { GetCandidVanilla } from '../views/GetCandid.native';

describe('GetCandidGallery component', () => {
  const props = {
    candidData: {
      Views: [
        {
          Media: {
            Images: {
              StandardResolution: {
                Url:
                  'https://api.getcandid.com/image/s/candid.azureedge.net%2fstream-media%2f070167ca-8287-4d41-a9bb-6b3850cae9b1_17900969359357824_standard.jpg',
              },
            },
          },
        },
        {
          Media: {
            Images: {
              StandardResolution: {
                Url:
                  'https://api.getcandid.com/image/s/candid.azureedge.net%2fstream-media%2f070167ca-8287-4d41-a9bb-6b3850cae9b1_17881783609395879_standard.jpg',
              },
            },
          },
        },
      ],
    },
    labels: {
      lbl_getCandid_title: '#MyStylePlace',
      lbl_getCandid_titleDescription: 'Title Description',
      lbl_getCandid_btnSeeMore: 'See More',
    },
    navigation: {
      dispatch: jest.fn(),
    },
  };

  it('renders correctly', () => {
    const component = shallow(<GetCandidVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call getSize func', () => {
    const component = shallow(<GetCandidVanilla {...props} />);
    component.instance().getImageSize();
  });

  it('should call keyExtractor func', () => {
    const component = shallow(<GetCandidVanilla {...props} />);
    expect(component.instance().keyExtractor('', 1)).toBe('1');
  });

  it('should call navigateToGallery func', () => {
    const component = shallow(<GetCandidVanilla {...props} />);
    component.instance().navigateToGallery();
  });

  it('should call renderItem func', () => {
    const component = shallow(<GetCandidVanilla {...props} />);
    component.instance().renderItem({ item: props.candidData.Views[0], index: 1 });
  });
});
