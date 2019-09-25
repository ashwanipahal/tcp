import { css } from 'styled-components';

export default css`
  .cardImage-card-number {
    padding: 7px 10px;
  }
  .cardImage-img-wrapper {
    display: flex;
    margin-bottom: auto;
    border: 1px solid ${props => props.theme.colorPalette.gray[500]};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.XS};
    background-color: ${props => props.theme.colors.WHITE};
  }
  .cardImage-wrapper {
    display: flex;
  }
  .card-title {
    position: relative;
    display: flex;
  }
  .card-carddefaultbadge {
    position: absolute;
    right: 2px;
  }
  .hideOnMobile {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: none;
    }
  }
  .hideOnDesktop {
    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
`;
