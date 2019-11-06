import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import React from 'react';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import HomePageSlots from '@tcp/core/src/components/common/molecules/HomePageSlots';
import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid';
import ModuleM from '@tcp/core/src/components/common/molecules/ModuleM';
import mockG from '@tcp/core/src/services/abstractors/common/moduleG/mock';
import mockM from '@tcp/core/src/components/common/molecules/ModuleM/moduleM.mock';
import ModuleG from '@tcp/core/src/components/common/molecules/ModuleG';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import AddedToBagContainer from '@tcp/core/src/components/features/CnC/AddedToBag';
import Recommendations from '../../../../common/molecules/Recommendations';

class HomePageWrapper extends React.Component {
  componentDidMount() {
    const { openCountrySelectorModal, router } = this.props;
    if (router.query.target === 'ship-to') {
      openCountrySelectorModal();
    }
  }

  render() {
    const { children } = this.props;
    return [children];
  }
}

const HomePageWithRouter = withRouter(HomePageWrapper);

const returnModule = mod => mod.default;
const HomePageView = dynamic({
  modules: () => ({
    moduleA: () => import('@tcp/core/src/components/common/molecules/ModuleA').then(returnModule),
    moduleB: () => import('@tcp/core/src/components/common/molecules/ModuleB').then(returnModule),
    moduleD: () => import('@tcp/core/src/components/common/molecules/ModuleD').then(returnModule),
    moduleH: () => import('@tcp/core/src/components/common/molecules/ModuleH').then(returnModule),
    moduleJ: () => import('@tcp/core/src/components/common/molecules/ModuleJ').then(returnModule),
    moduleK: () => import('@tcp/core/src/components/common/molecules/ModuleK').then(returnModule),
    moduleL: () => import('@tcp/core/src/components/common/molecules/ModuleL').then(returnModule),
    moduleN: () => import('@tcp/core/src/components/common/molecules/ModuleN').then(returnModule),
    moduleQ: () => import('@tcp/core/src/components/common/molecules/ModuleQ').then(returnModule),
    moduleR: () => import('@tcp/core/src/components/common/molecules/ModuleR').then(returnModule),
    moduleX: () => import('@tcp/core/src/components/common/molecules/ModuleX').then(returnModule),
    moduleS: () => import('@tcp/core/src/components/common/molecules/ModuleS').then(returnModule),
    moduleT: () => import('@tcp/core/src/components/common/molecules/ModuleT').then(returnModule),
    module2columns: () =>
      import('@tcp/core/src/components/common/molecules/ModuleTwoCol').then(returnModule),
    moduleG: () => import('@tcp/core/src/components/common/molecules/ModuleG').then(returnModule),
  }),
  render: (compProps, modules) => {
    const { slots, openCountrySelectorModal } = compProps;

    return (
      <HomePageWithRouter openCountrySelectorModal={openCountrySelectorModal}>
        <HomePageSlots slots={slots} modules={modules} />
        <GetCandid />
        <ModuleM {...mockM.moduleM.composites} type={mockM.moduleM.set[0].val} />
        <Recommendations
          page={Constants.RECOMMENDATIONS_PAGES_MAPPING.HOMEPAGE}
          variations="moduleO,moduleP"
        />
        <ModuleG {...mockG.moduleG.composites} />
        <AddedToBagContainer />
      </HomePageWithRouter>
    );
  },
});

HomePageView.defaultProps = {
  name: null,
};

HomePageWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  openCountrySelectorModal: PropTypes.func.isRequired,
  router: PropTypes.element.isRequired,
};

HomePageView.propTypes = {
  name: PropTypes.string,
  slots: PropTypes.arrayOf(PropTypes.object),
  openCountrySelectorModal: PropTypes.func.isRequired,
};

export default errorBoundary(HomePageView);
export { HomePageView as HomePageViewVanilla };
