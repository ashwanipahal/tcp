import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../RelatedOutfits.style';
import { getLocator } from '../../../../../../../utils';

class RelatedOutfits extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAccordionOpen: true,
    };
  }

  getAccordionClass = isAccordionOpen => {
    return isAccordionOpen ? 'show-accordion-toggle' : '';
  };

  render() {
    const { pdpLabels, className } = this.props;
    const { completeTheLook } = pdpLabels;
    const { isAccordionOpen } = this.state;
    const accordionToggleClass = this.getAccordionClass(isAccordionOpen);

    return (
      <div className={`${className} product-description-list`}>
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
      </div>
    );
  }
}

RelatedOutfits.propTypes = {
  className: PropTypes.string,
  pdpLabels: PropTypes.shape({}),
};

RelatedOutfits.defaultProps = {
  className: '',
  pdpLabels: {},
};

export default withStyles(errorBoundary(RelatedOutfits), style);
export { RelatedOutfits as RelatedOutfitsVanilla };
