import { css } from 'styled-components';

const radioBtnStyle = ({ backgroundColor, borderColor }) => {
  return `position: absolute;
  top: 13px;
  left: 10px;
  height: 16px;
  width: 16px;
  background-color: ${backgroundColor};
  border-radius: 50%;
  border: 1px solid ${borderColor};`;
};

const radioBtnAfterStyle = ({ backgroundColor, variation }) => {
  return `content: '';
  position: absolute;
  display: block;
  top: ${variation === 'secondary' ? '2px' : '3px'};
  left: ${variation === 'secondary' ? '2px' : '3px'};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${backgroundColor};`;
};

const styles = css`
${props =>
  props.variation === 'secondary'
    ? `padding-left: 0;
      @media ${props.theme.mediaQuery.smallOnly}{
        height: 30px;
        text-align: center;
        border-radius: 6px;
        border: solid 1px ${props.theme.colorPalette.gray[600]};
        background-color:  ${props.theme.colorPalette.white};
      }`
    : `padding-left: ${props.theme.spacing.ELEM_SPACING.XXL}`};

  @media ${props => props.theme.mediaQuery.medium}{
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  display: block;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ${props =>
    props.variation === 'secondary' && props.input && props.selectedValue === props.input.value
      ? `@media ${props.theme.mediaQuery.smallOnly}{
          background-color : ${props.theme.colorPalette.black};
        }`
      : ''}

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom radio button */
  .radio-button,
  .radio-button-checked {
    ${props =>
      props.variation === 'secondary'
        ? `position: absolute;
          top: 0;
          height:100%;
          width: 100%;
          background-color: transparent;`
        : radioBtnStyle({
            backgroundColor: props.theme.colorPalette.white,
            borderColor: props.theme.colorPalette.gray[600],
          })}

    @media ${props => props.theme.mediaQuery.medium}{
    ${props =>
      radioBtnStyle({
        backgroundColor: props.theme.colorPalette.white,
        borderColor: props.theme.colorPalette.gray[600],
      })}
    }
  }

  .radio-button-checked:after {
    ${props =>
      props.variation === 'secondary'
        ? `background:none`
        : radioBtnAfterStyle({
            backgroundColor: props.theme.colorPalette.black,
            variation: props.variation,
          })}

    @media ${props => props.theme.mediaQuery.medium}{
      ${props =>
        radioBtnAfterStyle({
          backgroundColor: props.theme.colorPalette.black,
          variation: props.variation,
        })}
    }
  }

.radio-button-checked{
  ${props =>
    props.variation === 'secondary'
      ? `box-sizing: border-box;`
      : ` border: 1px solid ${props.theme.colorPalette.gray[600]};
          background-color: ${props.theme.colorPalette.white};`}

    @media ${props => props.theme.mediaQuery.medium} {
      border: 1px solid ${props => props.theme.colorPalette.gray[600]};
      background-color: ${props => props.theme.colorPalette.white};
    }

    }
.radio-button-checked + .input-radio-title {
  ${props =>
    props.variation === 'secondary'
      ? `@media ${props.theme.mediaQuery.smallOnly}{
          font-weight: ${props.theme.typography.fontWeights.black};
          color: ${props.theme.colorPalette.white};
        }`
      : ''};
}

.input-radio-title {
  ${props =>
    props.variation === 'secondary'
      ? `@media ${props.theme.mediaQuery.smallOnly}{
            vertical-align: -webkit-baseline-middle;
            font-size:10px;
      }`
      : ''};
  }

  .input-subtitle {
    display: ${props => (props.hideSubtitleOnMobile ? 'none' : 'block')};
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
    }
  }
`;

export default styles;
