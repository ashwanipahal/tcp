import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../RelatedOutfits.style';
import { getLocator } from '../../../../../../../utils';
import ModuleQ from '../../../../../../common/molecules/ModuleQ';

class RelatedOutfits extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAccordionOpen: true,
      showHeader: false,
    };
  }

  getAccordionClass = isAccordionOpen => {
    return isAccordionOpen ? 'show-accordion-toggle' : '';
  };

  getRelatedOutfitSlots = () => {
    const { selectedColorProductId } = this.props;
    return (
      <ModuleQ
        selectedColorProductId={selectedColorProductId}
        hideTabs
        divTabs={[]}
        showRelatedOutfitHeader={this.setShowHeader}
        isRelatedOutfit
      />
    );
  };

  setShowHeader = value => {
    const { showHeader } = this.state;
    if (!showHeader) {
      this.setState({ showHeader: value });
    }
  };

  render() {
    const { pdpLabels, className } = this.props;
    const { completeTheLook } = pdpLabels;
    const { isAccordionOpen, showHeader } = this.state;
    const accordionToggleClass = this.getAccordionClass(isAccordionOpen);

    return (
      <div className={`${className} product-description-list`}>
        {showHeader && (
          <BodyCopy
            className={`product-desc-heading ${accordionToggleClass}`}
            fontSize="fs14"
            component="div"
            fontFamily="secondary"
            fontWeight="black"
            data-locator={getLocator('pdp_anchor_complete_the_look')}
          >
            {completeTheLook}
          </BodyCopy>
        )}

        {this.getRelatedOutfitSlots()}
      </div>
    );
  }
}

RelatedOutfits.propTypes = {
  className: PropTypes.string,
  pdpLabels: PropTypes.shape({}),
  selectedColorProductId: PropTypes.string.isRequired,
};

RelatedOutfits.defaultProps = {
  className: '',
  pdpLabels: {},
};

export default withStyles(errorBoundary(RelatedOutfits), style);
export { RelatedOutfits as RelatedOutfitsVanilla };
