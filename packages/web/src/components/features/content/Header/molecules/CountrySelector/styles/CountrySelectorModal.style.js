import { css } from 'styled-components';

export const modalStyles = css`
  .TCPModal__InnerContent {
    text-align: center;
  }
  .Modal_Heading {
    font-size: ${props => props.theme.typography.fontSizes.fs36};
    border: none;
    display: block;
    margin: 16px 0 12px;
    padding: 0;
  }
`;

const styles = css`
  .shipToModal__divider {
    background: ${props => props.theme.colorPalette.blue['500']};
    border: 0;
    height: 2px;
    width: 143px;
    margin: 27px auto 48px;
  }
  .shipToForm {
    width: 210px;
    margin: 0 auto;
  }
  form {
    border-bottom: 2px solid ${props => props.theme.colorPalette.gray['500']};
  }
  label,
  select {
    display: block;
    text-align: left;
    width: 100%;
  }
  label {
    color: ${props => props.theme.colorPalette.gray['900']};
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    font-weight: ${props => props.theme.typography.fontWeights.black};

    span {
      display: block;
      padding-bottom: 5px;
    }
  }
  button,
  select {
    margin-bottom: 32px;
  }
  select {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    height: 25px;
  }
  .shipToForm__note-clarification {
    margin: 32px;
  }
`;

export default styles;
