import { css } from 'styled-components';

export default css`
  .questions-container {
    width: 100%;
    justify-content: center;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }

  .survey-submit-wrapper {
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0;
    text-align: center;
  }

  .survey-submit__cta {
    width: ${props => props.theme.spacing.LAYOUT_SPACING.XXL};
    height: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    font-weight: ${props => props.theme.fonts.fontWeight.normal};
  }

  .stage-line {
    border-top: 1px solid ${props => props.theme.colorPalette.gray['500']};
    margin: 1em 0;
    width: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  }

  .stage-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
  }

  .sub-header {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    width: 235px;
  }

  .title-text {
    text-align: center;
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    .survey-submit-wrapper {
      width: 100%;
    }

    .survey-submit__cta {
      width: 100%;
      height: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    }
  }
`;
