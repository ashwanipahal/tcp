import { css } from 'styled-components';

const styles = css`
  .dot {
    background-color: ${props =>
      props.isPlcc
        ? props.theme.colorPalette.userTheme.plcc
        : props.theme.colorPalette.userTheme.mpr};
    border-radius: 50%;
    display: inline-block;
    width: 10px;
    height: 10px;
  }

  .filled {
    background-color: ${props => props.theme.colorPalette.gray[600]};
  }

  .bonusPointDayHeading {
    display: flex;
    justify-content: space-between;
  }
`;

export default styles;
