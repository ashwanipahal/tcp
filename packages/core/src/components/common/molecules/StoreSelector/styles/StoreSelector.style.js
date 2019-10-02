import { css } from 'styled-components';
import { getIconPath } from '@tcp/core/src/utils';

const SELECTOR_SIZES = {
  sm: '225px',
  md: '354px',
  lg: '210px',
};

export const customSelectStyles = css`
  box-sizing: border-box;
  min-width: ${SELECTOR_SIZES.sm};
  border: 1px solid ${props => props.theme.colorPalette.gray[1300]};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  background-color: ${props => props.theme.colorPalette.gray[1200]};

  .dropdownListWrapper > div {
    max-height: 272px;
    left: -1px;
    top: 35px;
    border: 1px solid ${props => props.theme.colorPalette.gray[1300]};
    border-top-width: 0;
    background: ${props => props.theme.colors.WHITE};
  }

  .dropdownUlBorder {
    border: 0;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    min-width: ${SELECTOR_SIZES.md};
  }

  @media ${props => props.theme.mediaQuery.large} {
    border-top-width: 0;
    border-right-width: 0;
    border-left-width: 0;
    background-color: inherit;
    min-width: ${SELECTOR_SIZES.lg};
    padding-right: 0;
    padding-left: 0;
  }

  .dropdownliBottomBorder {
    padding: 0;
    border: 1px solid transparent;
    cursor: pointer;

    &:hover {
      @media ${props => props.theme.mediaQuery.large} {
        background-color: ${props => props.theme.colorPalette.blue[50]};
      }
    }

    [role='button'] {
      padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
      font-size: ${props => props.theme.fonts.fontSize.textbox}px;
      @media ${props => props.theme.mediaQuery.large} {
        padding: ${props => props.theme.spacing.ELEM_SPACING.SM}
          ${props => props.theme.spacing.ELEM_SPACING.LRG};
        font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy3}px;
        line-height: ${props => props.theme.fonts.lineHeight.medium};
      }
    }

    &.dropdownActiveClass {
      background-color: ${props => props.theme.colorPalette.gray[1200]};
      @media ${props => props.theme.mediaQuery.large} {
        background-color: inherit;
      }
      [role='button'] {
        font-family: ${props => props.theme.fonts.secondaryFontBlackFamily};
        font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy3}px;
        font-weight: ${props => props.theme.fonts.fontWeight.black};
        line-height: ${props => props.theme.fonts.fontSize.body.bodytext.copy5}px;
      }
    }
  }

  .dropdownActiveIcon {
    background-image: url(${getIconPath('selected-item-check-no-circle')});
    width: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    background-size: contain;

    @media ${props => props.theme.mediaQuery.large} {
      top: ${props => props.theme.spacing.ELEM_SPACING.XS};
      left: 0;
    }
  }

  .customSelectTitle {
    margin: 0;
    text-align: center;
    border: none;
    font-family: ${props => props.theme.fonts.secondaryFontBlackFamily};
    font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy3}px;
    font-weight: ${props => props.theme.fonts.fontWeight.black};
    line-height: ${props => props.theme.fonts.fontSize.body.bodytext.copy5}px;
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    color: ${props => props.theme.colors.TEXT.DARK};
    text-transform: uppercase;
    cursor: pointer;

    @media ${props => props.theme.mediaQuery.medium} {
      font-size: ${props => props.theme.fonts.fontSize.textbox}px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      text-transform: none;
      text-align: left;
      padding-left: 0;
      font-family: ${props => props.theme.fonts.secondaryFontFamily};
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy4}px;
      font-weight: ${props => props.theme.fonts.fontWeight.normal};
      line-height: ${props => props.theme.fonts.lineHeight.normal}px;
    }
  }
`;

export default css`
  border: 1px solid ${props => props.theme.colorPalette.gray[800]};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  position: relative;

  .store-selector-icon {
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
    background: #ffffff;
    position: absolute;
    top: -24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  .store-selector {
    display: flex;
    flex-direction: column;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    align-items: center;
    @media ${props => props.theme.mediaQuery.large} {
      flex-direction: row;
      justify-content: center;
    }
  }
  .store-selector-title {
    &__text {
      text-align: center;
      text-transform: uppercase;
      font-size: ${props => props.theme.fonts.fontSize.heading.small.h4};
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
      @media ${props => props.theme.mediaQuery.medium} {
        font-size: ${props => props.theme.fonts.fontSize.heading.small.h3}px;
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
        margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      }
      @media ${props => props.theme.mediaQuery.large} {
        font-size: ${props => props.theme.fonts.fontSize.heading.large.h4}px;
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
        margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
        margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      }
    }
  }
`;
