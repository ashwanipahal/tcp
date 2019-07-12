import styled from 'styled-components';

const HeaderBrand = styled.div`
  box-sizing: border-box;
  height: 129px;
  padding-top: 31px;
  text-align: center;

  @media ${props => props.theme.mediaQuery.mediumMax} {
    height: 0px;
    .header-brand__home-logo--brand {
      display: none;
    }
  }
`;

const HeaderLoyalty = styled.div`
  background-color: ${props => props.theme.colors.WHITE};
  padding: 36px 0;
  text-align: center;
  text-transform: uppercase;
`;

const headerStyles = {
  HeaderBrand,
  HeaderLoyalty,
};

export default headerStyles;
