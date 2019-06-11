import styled from 'styled-components';

const HeaderTopnav = styled.div`
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  height: 45px;
  line-height: 45px;
  text-transform: uppercase;

  .header-topnav__promo-area {
    text-align: center;

    @media ${props => props.theme.mediaQuery.smallMax} {
      display: none;
    }
  }
  .header-topnav__track-order {
    text-align: right;

    @media ${props => props.theme.mediaQuery.mediumMax} {
      padding-right: 0;
    }
  }
`;

const HeaderBrand = styled.div`
  box-sizing: border-box;
  height: 129px;
  padding-top: 31px;
  text-align: center;
`;

const HeaderNav = styled.div`
  position: relative;
`;
const DummyNav = styled.div`
  color: ${props => props.theme.colors.PRIMARY.DARK};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  padding: 10px 0;

  @media ${props => props.theme.mediaQuery.mediumMax} {
    display: none;
  }
`;

const HeaderPromo = styled.div`
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  border-top: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  box-sizing: border-box;
  height: 60px;
  padding: 20px 0;
  text-align: center;
  text-transform: uppercase;
`;

const HeaderLoyalty = styled.div`
  background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  padding: 36px 0;
  text-align: center;
  text-transform: uppercase;
`;

const headerStyles = {
  HeaderTopnav,
  HeaderBrand,
  HeaderNav,
  DummyNav,
  HeaderPromo,
  HeaderLoyalty,
};

export default headerStyles;
