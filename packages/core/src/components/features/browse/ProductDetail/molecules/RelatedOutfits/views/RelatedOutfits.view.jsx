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
    };

    this.handleAccordionToggle = this.handleAccordionToggle.bind(this);
  }

  getAccordionClass = isAccordionOpen => {
    return isAccordionOpen ? 'show-accordion-toggle' : '';
  };

  handleAccordionToggle() {
    const { isAccordionOpen } = this.state;
    this.setState({ isAccordionOpen: !isAccordionOpen });
  }

  render() {
    const { pdpLabels, className, selectedColorProductId } = this.props;
    const { completeTheLook } = pdpLabels;
    const { isAccordionOpen } = this.state;
    const accordionToggleClass = this.getAccordionClass(isAccordionOpen);

    const RelatedOutfitsSlots = () => {
      return (
        <ModuleQ
          selectedColorProductId={selectedColorProductId}
          hideTabs
          divTabs={[]}
          bgClass="yellow-bg"
        />
      );
    };

    return (
      <div className={`${className} product-description-list`}>
        <BodyCopy
          className={`product-desc-heading ${accordionToggleClass}`}
          fontSize="fs14"
          component="div"
          fontFamily="secondary"
          fontWeight="black"
          // onClick={this.handleAccordionToggle}
          data-locator={getLocator('pdp_anchor_complete_the_look')}
        >
          {completeTheLook}
        </BodyCopy>
        {isAccordionOpen ? <RelatedOutfitsSlots /> : null}
      </div>
    );
  }
}

RelatedOutfits.propTypes = {
  className: PropTypes.string,
  pdpLabels: PropTypes.shape({}),
  selectedColorProductId: PropTypes.number.isRequired,
};

RelatedOutfits.defaultProps = {
  className: '',
  pdpLabels: {},
};

export default withStyles(errorBoundary(RelatedOutfits), style);
export { RelatedOutfits as RelatedOutfitsVanilla };
