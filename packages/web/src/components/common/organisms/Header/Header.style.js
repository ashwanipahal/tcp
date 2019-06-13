import styled from 'styled-components';

const HeaderBrand = styled.div`
  box-sizing: border-box;
  height: 129px;
  padding-top: 31px;
  text-align: center;

  @media ${props => props.theme.mediaQuery.mediumMax} {
    .header-brand__home-logo--brand {
      display: none;
    }
  }
`;

const HeaderNav = styled.div`
  position: relative;
`;
const DummyNav = styled.div`
  color: ${props => props.theme.colors.PRIMARY.DARK};
  cursor: pointer;
  display: flex;
  font-family: ${props => props.theme.fonts.secondaryFontFamily};
  font-size: ${props => props.theme.fonts.fontSize.nav}px;
  font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
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
  background-color: ${props => props.theme.colors.WHITE};
  border-top: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  box-sizing: border-box;
  height: 60px;
  text-align: center;
  text-transform: uppercase;
`;

const HeaderPromoItem = styled.div`
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  height: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const HeaderLoyalty = styled.div`
  background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  padding: 36px 0;
  text-align: center;
  text-transform: uppercase;
`;

const HeaderPromoItemIcon1 = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.BRAND.BOYS};
`;

const HeaderPromoItemIcon2 = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.PRIMARY.GREEN};
`;

const HeaderPromoItemIcon3 = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.BRAND.PRIMARY};
`;

const HeaderPromoItemContents = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin: auto;
`;

const HeaderPromoItemBold = styled.b`
  margin-right: 5px;
`;

const HeaderPromoItemBold2 = styled.b`
  margin-right: 5px;
  color: ${props => props.theme.colors.PRIMARY.GREEN};
`;

const headerStyles = {
  HeaderBrand,
  HeaderNav,
  DummyNav,
  HeaderPromo,
  HeaderLoyalty,
  HeaderPromoItem,
  HeaderPromoItemIcon1,
  HeaderPromoItemIcon2,
  HeaderPromoItemIcon3,
  HeaderPromoItemContents,
  HeaderPromoItemBold,
  HeaderPromoItemBold2,
};

export default headerStyles;
