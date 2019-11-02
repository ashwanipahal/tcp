import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal/view/Modal.native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  ParentContainerStyle,
  WrapperStyle,
  ImgWrapper,
  ImageStyle,
  RichTextStyle,
} from '../OffersSection.style.native';
import RichText from '../../../../../../common/atoms/RichText';

class OffersSection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
    });
  };

  render() {
    const { labels } = this.props;
    const { showModal } = this.state;
    return (
      <View {...this.props}>
        <WrapperStyle>
          <ImgWrapper>
            <ImageStyle
              // eslint-disable-next-line global-require
              source={require('../../../../../../../../../mobileapp/src/assets/images/card-smile.png')}
            />
          </ImgWrapper>
          <RichTextStyle>
            <RichText
              source={`<div class="payment__banner"><div class="payment__banner__image__container"><img class="payment__banner__image" alt="card Icon" src="/static/images/card-smile.png"></div><div><div class="offers__text"><b>SAVE 30% TODAY WHEN YOU OPEN AND USE A <span class="offers__msg"> MY PLACE REWARDS CREDIT CARD! </span> [[FPO]] </b></div><div><a class="offers__link" href="#">DETAILS</a></div></div></div>`}
              isNativeView
              navigate={node => {
                if (node.properties && node.properties.className.indexOf('offers__link') > -1) {
                  this.toggleModal(node);
                }
              }}
            />
          </RichTextStyle>
          {showModal && (
            <ModalNative
              isOpen={showModal}
              onRequestClose={this.toggleModal}
              heading="this is test modal"
              horizontalBar={false}
            >
              <BodyCopy
                fontSize="fs22"
                fontFamily="secondary"
                textAlign="center"
                fontWeight="black"
                text="This is modal component"
              />
            </ModalNative>
          )}
        </WrapperStyle>
      </View>
    );
  }
}

OffersSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default withStyles(OffersSection, ParentContainerStyle);
export { OffersSection as OffersSectionVanilla };
