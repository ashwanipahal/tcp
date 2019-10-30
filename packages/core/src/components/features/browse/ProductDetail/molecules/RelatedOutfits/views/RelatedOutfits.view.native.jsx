import React from 'react';
import { View, Image } from 'react-native';
import { PropTypes } from 'prop-types';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import { StyleRelatedOutfits, ImageStyleWrapper } from '../RelatedOutfits.native.style';
import ModuleQ from '../../../../../../common/molecules/ModuleQ';

const downIcon = require('../../../../../../../assets/carrot-small-down.png');
const upIcon = require('../../../../../../../assets/carrot-small-up.png');

class RelatedOutfits extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAccordionOpen: true,
    };
  }

  handleAccordionToggle = () => {
    const { isAccordionOpen } = this.state;
    this.setState({ isAccordionOpen: !isAccordionOpen });
  };

  getRelatedOutfitSlots = () => {
    const { navigation, selectedColorProductId } = this.props;
    return (
      <ModuleQ
        navigation={navigation}
        hostLazyLoad={LAZYLOAD_HOST_NAME.PDP}
        selectedColorProductId={selectedColorProductId}
        hideTabs
        divTabs={[]}
        bgClass="yellow-bg"
      />
    );
  };

  render() {
    const { pdpLabels } = this.props;
    const { completeTheLook } = pdpLabels;
    const { isAccordionOpen } = this.state;

    return (
      <View>
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

        {isAccordionOpen ? this.getRelatedOutfitSlots() : null}
      </View>
    );
  }
}

RelatedOutfits.propTypes = {
  pdpLabels: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  selectedColorProductId: PropTypes.number.isRequired,
};

RelatedOutfits.defaultProps = {
  pdpLabels: {},
  navigation: {},
};

export default RelatedOutfits;
export { RelatedOutfits as RelatedOutfitsVanilla };
