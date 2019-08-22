import styled from 'styled-components/native';

const UnderlineStyle = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colorPalette.gray[600]};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const PlaceRewardsTileContainer = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[700]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const ButtonWrapperStyle = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const ShopAnchor = styled.View`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  border: 1px solid gray;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

export { UnderlineStyle, PlaceRewardsTileContainer, ButtonWrapperStyle, ShopAnchor };
