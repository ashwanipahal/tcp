import styled from 'styled-components';
import BodyCopy from '../../../atoms/BodyCopy';

export const Wrapper = styled.View`
  display: flex;
`;

export const ItemWrapper = styled.View`
  margin-bottom: 8px;
  min-height: 50px;
`;

export const DescriptionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 24px 12px;
`;

export const ProfileImageWrapper = styled.View`
  padding: 0 35px;
`;

export const Title = styled(BodyCopy)`
  margin: 24px 0;
`;

export const ShopLookItemCaption = styled(BodyCopy)`
  margin-top: 8px;
`;

export const Image = styled.Image`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  align-self: center;
`;

export const CaptionTextWrapper = styled.View`
  flex-wrap: wrap;
  flex: 1;
`;

export const Divider = styled.View`
  flex: 1;
  margin: 0 15px;
  height: 1px;
  background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  margin-bottom: ${props => (props.marginBottom ? `${props.marginBottom}px` : 0)};
`;

export const ShopLookWrapper = styled.View``;

export const ShopLookItem = styled.View`
  max-width: 142px;
  align-items: center;
  margin: 0 15px;
`;

export const ShopLookScroll = styled.ScrollView`
  padding: 0 0 24px;
`;

export const Touchable = styled.TouchableWithoutFeedback``;

export const ButtonContainer = styled.View`
  padding: 12px 14px 41px;
  align-items: center;
`;

export default {
  ItemWrapper,
  Image,
  Title,
  ProfileImageWrapper,
  CaptionTextWrapper,
  Divider,
  ShopLookWrapper,
  ShopLookScroll,
  ShopLookItemCaption,
  Touchable,
  Wrapper,
  DescriptionWrapper,
  ButtonContainer,
};
