import styled from 'styled-components/native';

const UnderlineStyle = {
  borderColor: 'gray',
  marginBottom: 20,
  marginTop: 24,
  borderWidth: 0.5,
};

const PlaceRewardsTileContainer = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[700]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.spacing.ELEM_SPACING.MED};
  min-height: 150px;
`;

const ButtonWrapperStyle = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const CouponListWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const CouponWrapper = styled.View`
  min-height: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
`;

const ShopAnchor = styled.View`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  border: 1px solid gray;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  font-weight: ${props => props.theme.fonts.fontWeight.black};
  font-family: ${props => props.theme.typography.fonts.secondary};
`;

const ShopNowWrapper = styled.View`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  justify-content: center;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  font-weight: ${props => props.theme.fonts.fontWeight.black};
  font-family: ${props => props.theme.typography.fonts.secondary};
`;

export {
  UnderlineStyle,
  PlaceRewardsTileContainer,
  ButtonWrapperStyle,
  ShopAnchor,
  CouponListWrapper,
  CouponWrapper,
  ShopNowWrapper,
};
