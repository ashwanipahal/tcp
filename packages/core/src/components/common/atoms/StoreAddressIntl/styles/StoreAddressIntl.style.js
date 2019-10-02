import styled, { css } from 'styled-components';

export const StoreName = styled.h5`
  font-family: ${props => props.theme.fonts.secondaryFontBlackFamily};
  font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy4}px;
  font-weight: ${props => props.theme.fonts.fontWeight.black};
  line-height: ${props => props.theme.fonts.lineHeight.normal};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
`;

export const StoreLocation = styled.div`
  font-family: ${props => props.theme.fonts.secondaryFontFamily};
  font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy3}px;
  font-weight: ${props => props.theme.fonts.fontWeight.normal};
  line-height: ${props => props.theme.fonts.lineHeight.normal};
`;

export const ShopInShop = styled.div`
  display: inline-block;
  font-family: ${props => props.theme.fonts.secondaryFontBlackFamily};
  font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy1}px;
  font-weight: ${props => props.theme.fonts.fontWeight.black};
  line-height: ${props => props.theme.fonts.lineHeight.normal};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
  background-color: ${props => props.theme.colorPalette.blue[800]};
  color: ${props => props.theme.colors.WHITE};
  text-transform: uppercase;
  border-top-right-radius: ${props => props.theme.spacing.ELEM_SPACING.SM};
  border-bottom-right-radius: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export default css`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;
