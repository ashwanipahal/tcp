import styled from 'styled-components';

const HeaderPromoContainer = styled.div`
  background-color: ${props => props.theme.colors.WHITE};
  border-top: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  box-sizing: border-box;
  height: 60px;
  text-align: center;
  text-transform: uppercase;
  position: relative;
`;

// Need important to override the react-slick behavior
const HeaderPromoItem = styled.div`
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  height: 60px;
  display: flex !important;
  justify-content: left;
  align-items: center;
`;

const HeaderPromoItemContents = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin: auto;
`;

const headerPromoStyles = {
  HeaderPromoContainer,
  HeaderPromoItem,
  HeaderPromoItemContents,
};

export default headerPromoStyles;
