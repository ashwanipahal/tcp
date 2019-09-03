import { css } from 'styled-components';

export const modalStyles = css`
  .TCPModal__InnerContent {
    text-align: center;
  }
  .Modal_Heading {
    font-size: ${props => props.theme.typography.fontSizes.fs28};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    border: none;
    display: block;
    height: auto;
    margin: 6px 0 10px;
    padding: 0;

    @media ${props => props.theme.mediaQuery.medium} {
      font-size: ${props => props.theme.typography.fontSizes.fs36};
      margin-bottom: 12px;
    }
  }
`;

export const selectBoxStyle = css`
  height: 58px;
  .select__input {
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray['600']};
    color: ${props => props.theme.colorPalette.gray['900']};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    margin: 0 0 32px;
    padding: 0 0 ${props => props.theme.spacing.ELEM_SPACING.XS};

    :disabled {
      opacity: 0.6;
    }
  }
`;

const styles = css`
  .shipToModal__divider {
    background: ${props => props.theme.colorPalette.blue['500']};
    border: 0;
    height: 2px;
    width: 143px;
    margin: 18px auto 48px;

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 27px;
    }
  }
  .shipToForm {
    width: 210px;
    margin: 0 auto;
  }
  form {
    border-bottom: 2px solid ${props => props.theme.colorPalette.gray['500']};

    span {
      display: block;
      padding-bottom: 5px;
    }
  }
  button {
    margin-bottom: 32px;
  }
  .shipToForm__note-clarification {
    margin: 32px 32px 0;

    a {
      color: ${props => props.theme.colorPalette.gray['900']};
    }
  }
`;

export default styles;
