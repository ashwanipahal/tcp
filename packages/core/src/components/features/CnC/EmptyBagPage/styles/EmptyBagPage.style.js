import { css } from 'styled-components';

export default css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  .large-size-message {
    font-size: ${props => props.theme.typography.fontSizes.fs22};
  }
  .small-spacing {
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0px;
    font-size: ${props => props.theme.typography.fontSizes.fs16};
  }
  .element-spacing {
    margin: ${props => props.theme.spacing.ELEM_SPACING.XXXL} 0px;
  }
  @media ${props => props.theme.mediaQuery.smallMax} {
    .large-size-message {
      font-size: ${props => props.theme.typography.fontSizes.fs16};
    }
    .small-spacing {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
      margin: ${props => props.theme.spacing.ELEM_SPACING.SM} 0px;
    }
    .element-spacing {
      margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0px;
    }
  }

  .CTA-button {
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 60px;
    background-color: ${props => props.theme.colors.PRIMARY.DARK};
    &:hover {
      background: ${props => props.theme.colors.PRIMARY.DARK};
    }
  }
`;
