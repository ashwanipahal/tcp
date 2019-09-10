import { css } from 'styled-components';

export default css`
  display: flex;
  justify-content: center;

  .button-wrapper {
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXS};
    border-right: 1px solid ${props => props.theme.colorPalette.gray[500]};

    &:last-child {
      border-right: 0;
    }

    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
  }
`;
