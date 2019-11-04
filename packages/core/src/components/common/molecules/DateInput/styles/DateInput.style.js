import { css } from 'styled-components';

const shadowColor = 'rgba(163, 162, 162, 0.31)';
const DateInput = css`
  z-index: 1;

  .react-datepicker {
    background-color: ${props => props.theme.colorPalette.white};
    color: ${props => props.theme.colorPalette.black};
    display: inline-block;
    position: relative;
    box-shadow: 0 0 4px 3px ${shadowColor};
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    line-height: normal;
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  .react-datepicker__header {
    text-align: center;
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    position: relative;
  }

  .react-datepicker__current-month {
    font-weight: bold;
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  .react-datepicker__navigation {
    background: none;
    text-align: center;
    cursor: pointer;
    position: absolute;
    top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    padding: 0;
    border: 1px solid ${props => props.theme.colorPalette.gray[600]};
    border-top: none;
    border-right: none;
    z-index: 1;
    height: 8px;
    width: 8px;
    text-indent: -999em;
    overflow: hidden;
  }

  .react-datepicker__navigation:hover {
    border-color: ${props => props.theme.colorPalette.gray[900]};
  }

  .react-datepicker__navigation--previous {
    left: ${props => props.theme.spacing.ELEM_SPACING.XL};
    transform: rotate(45deg);
  }

  .react-datepicker__navigation--next {
    right: ${props => props.theme.spacing.ELEM_SPACING.XL};
    transform: rotate(225deg);
  }

  .react-datepicker__month {
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
  }

  .react-datepicker__day-names,
  .react-datepicker__week {
    white-space: nowrap;
  }

  .react-datepicker__day {
    cursor: pointer;
  }

  .react-datepicker__day,
  .react-datepicker__day-name {
    background-color: ${props => props.theme.colorPalette.white};
    border-radius: 50%;
    color: ${props => props.theme.colorPalette.gray[900]};
    display: inline-block;
    height: 38px;
    line-height: 38px;
    margin: 0;
    text-align: center;
    width: 38px;
  }

  .react-datepicker__day:hover {
    background-color: ${props => props.theme.colorPalette.gray[300]};
  }

  .react-datepicker__day-name {
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  }

  .react-datepicker__day--selected {
    background-color: ${props => props.theme.colorPalette.black};
    color: ${props => props.theme.colorPalette.white};
  }

  .react-datepicker__day--disabled {
    color: ${props => props.theme.colorPalette.gray[600]};
    cursor: default;
  }

  .react-datepicker__day--disabled:hover {
    background-color: transparent;
  }

  .react-datepicker__triangle {
    width: 25px;
    height: 15px;
    position: absolute;
    overflow: hidden;
    top: -15px;
    left: calc(50% - 12px);
  }

  .react-datepicker__triangle::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: ${props => props.theme.colorPalette.white};
    transform: rotate(45deg);
    top: 7px;
    left: 3px;
    box-shadow: -1px -1px 5px 0px ${shadowColor};
  }

  &[data-placement='top-start'] .react-datepicker__triangle {
    top: 100%;

    &:after {
      top: -10px;
      box-shadow: 0 0 4px 2px rgba(163, 162, 162, 0.31);
    }
  }
`;

export default DateInput;
