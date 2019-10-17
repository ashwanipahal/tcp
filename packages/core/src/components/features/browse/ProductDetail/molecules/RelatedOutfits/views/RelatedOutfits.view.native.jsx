import React from 'react';
import { View, Image } from 'react-native';
import { PropTypes } from 'prop-types';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import { StyleRelatedOutfits, ImageStyleWrapper } from '../RelatedOutfits.native.style';

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
      </View>
    );
  }
}

RelatedOutfits.propTypes = {
  pdpLabels: PropTypes.shape({}),
};

RelatedOutfits.defaultProps = {
  pdpLabels: {},
};

export default RelatedOutfits;
export { RelatedOutfits as RelatedOutfitsVanilla };
