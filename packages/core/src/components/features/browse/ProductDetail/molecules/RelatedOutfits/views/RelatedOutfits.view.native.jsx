import React from 'react';
import { View, Image } from 'react-native';
import { PropTypes } from 'prop-types';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import {
  StyleRelatedOutfits,
  ImageStyleWrapper,
  OutfitWrapper,
} from '../RelatedOutfits.native.style';
import ModuleQ from '../../../../../../common/molecules/ModuleQ';

const downIcon = require('../../../../../../../assets/carrot-small-down.png');
const upIcon = require('../../../../../../../assets/carrot-small-up.png');

class RelatedOutfits extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAccordionOpen: true,
      showHeader: false,
    };
  }

  handleAccordionToggle = () => {
    const { isAccordionOpen } = this.state;
    this.setState({ isAccordionOpen: !isAccordionOpen });
  };

  getRelatedOutfitSlots = () => {
    const { navigation, selectedColorProductId } = this.props;
    return (
      <OutfitWrapper>
        <ModuleQ
          navigation={navigation}
          hostLazyLoad={LAZYLOAD_HOST_NAME.PDP}
          selectedColorProductId={selectedColorProductId}
          hideTabs
          divTabs={[]}
          showRelatedOutfitHeader={this.setShowHeader}
          isCompleteTheLook
          source="related-outfits"
        />
      </OutfitWrapper>
    );
  };

  setShowHeader = value => {
    const { setShowCompleteTheLook } = this.props;
    const { showHeader } = this.state;
    if (!showHeader) {
      this.setState({ showHeader: value }, () => setShowCompleteTheLook(value));
    }
  };

  render() {
    const { pdpLabels } = this.props;
    const { completeTheLook } = pdpLabels;
    const { isAccordionOpen, showHeader } = this.state;

    return (
      <View>
        {showHeader && (
          <StyleRelatedOutfits onPress={this.handleAccordionToggle}>
            <BodyCopy
              fontFamily="secondary"
              fontWeight="black"
              fontSize="fs14"
              isAccordionOpen={isAccordionOpen}
              text={completeTheLook}
              textAlign="center"
            />
            <ImageStyleWrapper>
              <Anchor onPress={this.handleAccordionToggle}>
                <Image source={isAccordionOpen ? upIcon : downIcon} />
              </Anchor>
            </ImageStyleWrapper>
          </StyleRelatedOutfits>
        )}

        {isAccordionOpen ? this.getRelatedOutfitSlots() : null}
      </View>
    );
  }
}

RelatedOutfits.propTypes = {
  pdpLabels: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  selectedColorProductId: PropTypes.number.isRequired,
  setShowCompleteTheLook: PropTypes.func,
};

RelatedOutfits.defaultProps = {
  pdpLabels: {},
  navigation: {},
  setShowCompleteTheLook: null,
};

export default RelatedOutfits;
export { RelatedOutfits as RelatedOutfitsVanilla };
