import { css } from 'styled-components';

const styles = css``;

export const customHeaderStyle = css`
  div.TCPModal__InnerContent {
    padding: 0;
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0px ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding: 0px ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
  .Modal_Heading {
    border-bottom: none;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    font-size: ${props => props.theme.typography.fontSizes.fs22};
    display: flex;
    justify-content: center;
    height: auto;
    margin-bottom: 0px;
    @media ${props => props.theme.mediaQuery.medium} {
      display: flex;
      justify-content: center;
      height: auto;
    }
  }
  .Modal-Header {
    z-index: ${props => props.theme.zindex.zModal + 1};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    @media ${props => props.theme.mediaQuery.medium} {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  .close-modal {
    height: 14px;
    right: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      right: 0px;
    }
  }
  .add-to-bag-button {
    width: 100%;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 0;
      width: 264px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
      width: 243px;
    }
    margin: 0 auto;
  }
  .add-to-bag-button-wrapper {
    bottom: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: sticky;
    background-color: ${props => props.theme.colors.WHITE};
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM}
      ${props => props.theme.spacing.ELEM_SPACING.XS};
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0px;
    }
  }
`;

export default styles;
