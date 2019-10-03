import styled, { css } from 'styled-components';

export const CountryName = styled.h3`
  position: relative;
  font-family: ${props => props.theme.fonts.primaryFontFamily};
  font-weight: ${props => props.theme.fonts.fontWeight.normal};
  line-height: ${props => props.theme.fonts.lineHeight.normal};
  font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy6}px;
  text-transform: uppercase;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-bottom: 0;
  &:after {
    content: ' ';
    position: absolute;
    top: 100%;
    left: 0;
    width: 61px;
    height: 1px;
    background: ${props => props.theme.colors.TEXT.DARKERBLUE};
  }
`;

export default css`
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
  .store-intl-item {
    @media ${props => props.theme.mediaQuery.large} {
      &:nth-child(6n) {
        margin: 0;
      }
    }
  }
`;
