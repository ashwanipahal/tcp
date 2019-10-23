import React from 'react';
import { shallow } from 'enzyme';
import {
  EarnExtraPointsOverviewContainer,
  mapStateToProps,
} from '../EarnExtraPointsOverview.container';
import EarnExtraPointsOverview from '../../views/EarnExtraPointsOverview.view';

describe('EarnExtraPointsOverview container', () => {
  it('should render EarnExtraPointsOverview', () => {
    const props = {
      labels: {},
    };
    const component = shallow(<EarnExtraPointsOverviewContainer {...props} />);
    expect(component.is(EarnExtraPointsOverview)).toBeTruthy();
  });

  it('mapStateToProps should return label props', () => {
    const stateProps = mapStateToProps({
      Labels: {
        account: {
          common: {
            lbl_common_earnExtraPoints: 'earnExtraPoints',
          },
        },
      },
    });
    expect(stateProps.labels).toBeDefined();
  });
});
