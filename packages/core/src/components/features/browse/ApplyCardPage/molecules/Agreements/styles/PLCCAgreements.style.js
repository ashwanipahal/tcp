import styled from 'styled-components';

export default styled.div`
  .title {
    margin: 34px 0px 19px 0px;
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
