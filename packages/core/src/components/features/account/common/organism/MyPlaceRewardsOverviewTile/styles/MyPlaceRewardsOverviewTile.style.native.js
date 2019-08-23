import styled from 'styled-components/native';

const UnderlineStyle = {
  borderColor: 'gray',
  marginBottom: 24,
  marginTop: 24,
  borderWidth: 1,
};

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
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
`;

export { UnderlineStyle, PlaceRewardsTileContainer, ButtonWrapperStyle, ShopAnchor };
