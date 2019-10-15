import { css } from 'styled-components';

export default css`
  ${props =>
    props.theme.gridDimensions.gridBreakPointsKeys.map(
      key => `
      ${key !== 'small' ? `@media ${props.theme.mediaQuery[key]} {` : ''}
        margin-right: ${props.theme.gridDimensions.gridOffsetObj[key]}px;
        margin-left: ${props.theme.gridDimensions.gridOffsetObj[key]}px;
      ${key !== 'small' ? `}` : ''}`
    )}

  .storelist__countrylbl {
    margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    @media ${props => props.theme.mediaQuery.large} {
      border-bottom: 2px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    }
  }

  .storelist__countryname {
    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
  }
`;
