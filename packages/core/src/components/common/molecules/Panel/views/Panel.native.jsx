import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import {
  PanelContainer,
  TitleContainer,
  TouchableHeader,
  PanelBody,
  ImageWrapper,
  HeaderContainer,
  FavoritesContainer,
  FavoritesWrapper,
  TextWrapper,
} from '../Panel.style.native';
import ImageComp from '../../../atoms/Image';

const downIcon = require('../../../../../../../mobileapp/src/assets/images/carrot-small-down-gray.png');
const upIcon = require('../../../../../../../mobileapp/src/assets/images/carrot-small-up-gray.png');
const favIcon = require('../../../../../../../mobileapp/src/assets/images/filled-heart.png');
const rightIcon = require('../../../../../../../mobileapp/src/assets/images/carrot-small-right-gray.png');
const cardIcon = require('../../../../../../../mobileapp/src/assets/images/tcp-cc.png');

class Panel extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  getCreditCardApply = title => {
    return (
      <FavoritesContainer>
        <FavoritesWrapper>
          <ImageWrapper>
            <ImageComp source={cardIcon} width={50} height={40} />
          </ImageWrapper>
          <TextWrapper>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              fontWeight="regular"
              text={title}
              color="gray.900"
              textAlign="center"
            />
          </TextWrapper>
        </FavoritesWrapper>
      </FavoritesContainer>
    );
  };

  getFavoriteOverview = title => {
    return (
      <FavoritesContainer>
        <FavoritesWrapper>
          <TextWrapper>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              fontWeight="regular"
              text={title}
              color="gray.900"
            />
          </TextWrapper>
          <ImageWrapper>
            <ImageComp source={favIcon} width={20} height={18} />
          </ImageWrapper>
        </FavoritesWrapper>
      </FavoritesContainer>
    );
  };

  getHeaderTitle = () => {
    const { handleComponentChange, title } = this.props;
    return (
      <HeaderContainer onPress={() => handleComponentChange('paymentGiftCardsPageMobile')}>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs13"
          fontWeight="regular"
          text={title}
          color="gray.900"
        />
      </HeaderContainer>
    );
  };

  toggleView() {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  render() {
    const { expanded } = this.state;
    const { title, children, isVariationTypeLink, isFavorite, isCardApply } = this.props;
    const imgStyle = { alignSelf: 'center' };
    const carrotIcon = expanded ? upIcon : downIcon;
    const isImageLink = isCardApply || isFavorite;
    return (
      <PanelContainer>
        {!isVariationTypeLink && (
          <TitleContainer>
            <TouchableHeader onPress={() => this.toggleView()}>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs13"
                fontWeight="regular"
                text={title}
                color="gray.900"
              />
            </TouchableHeader>
            <ImageWrapper onPress={() => this.toggleView()}>
              <ImageComp customStyle={imgStyle} source={carrotIcon} width={10} height={6} />
            </ImageWrapper>
          </TitleContainer>
        )}
        {expanded && !isVariationTypeLink && <PanelBody>{children}</PanelBody>}
        {isVariationTypeLink && (
          <PanelContainer>
            <TitleContainer>
              {isCardApply && this.getCreditCardApply(title)}
              {isFavorite && this.getFavoriteOverview(title)}
              {!isImageLink && this.getHeaderTitle()}
              <ImageWrapper onPress={() => this.toggleView()}>
                <ImageComp customStyle={imgStyle} source={rightIcon} width={7} height={10} />
              </ImageWrapper>
            </TitleContainer>
          </PanelContainer>
        )}
      </PanelContainer>
    );
  }
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  isVariationTypeLink: PropTypes.bool,
  isFavorite: PropTypes.bool,
  isCardApply: PropTypes.bool,
  handleComponentChange: PropTypes.func,
};

Panel.defaultProps = {
  isVariationTypeLink: false,
  isFavorite: false,
  isCardApply: false,
  handleComponentChange: () => {},
};

export default Panel;
