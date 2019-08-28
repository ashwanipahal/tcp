import styled from 'styled-components';

export default styled.div`
  .title {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    margin: 34px 0px 19px 0px;
    line-height: 1;
  }

  .financial-terms-disclosures {
    width: 100%;
    border: 1px solid ${props => props.theme.colors.BUTTON.WHITE.BORDER};
    height: 914px;
    @media ${props => props.theme.mediaQuery.medium} {
      height: 591px;
    }
  }
`;
