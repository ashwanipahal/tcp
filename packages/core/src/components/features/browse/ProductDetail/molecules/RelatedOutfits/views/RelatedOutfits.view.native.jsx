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

  render() {
    const { pdpLabels, navigation, relatedOutfits, ...others } = this.props;
    const { completeTheLook } = pdpLabels;
    const { isAccordionOpen } = this.state;

    const RelatedOutfitsSlots = () => {
      const { data, contentId, accessibility } = relatedOutfits[0];
      return (
        data && (
          <ModuleQ
            key={contentId}
            accessibility={accessibility}
            {...data}
            navigation={navigation}
            hostLazyLoad={LAZYLOAD_HOST_NAME.PDP}
            {...others}
          />
        )
      );
    };

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
        {isAccordionOpen ? <RelatedOutfitsSlots /> : null}
      </View>
    );
  }
}

RelatedOutfits.propTypes = {
  pdpLabels: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  relatedOutfits: PropTypes.arrayOf(PropTypes.shape({})),
};

RelatedOutfits.defaultProps = {
  pdpLabels: {},
  navigation: {},
  relatedOutfits: [],
};

export default RelatedOutfits;
export { RelatedOutfits as RelatedOutfitsVanilla };
