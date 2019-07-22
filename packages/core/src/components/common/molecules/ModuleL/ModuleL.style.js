import { css } from 'styled-components';

export default css`
  ${props => console.log(props)};
  .moduleL__tile {
    background-color: ${props => props.theme.colorPalette.gray['300']};
    display: flex;
    flex-direction: row;
    text-align: left;
  }
  .moduleL__tile-text {
    margin-left: 30px;
    margin-top: 91px;
  }
  .moduleL__tile-title {
    margin-bottom: 30px;
  }
  .moduleL__tile-link {
    color: ${props => props.theme.colorPalette.gray['900']};
    font-size: ${props => props.theme.fonts.fontSize.anchor.large}px;
  }
`;
