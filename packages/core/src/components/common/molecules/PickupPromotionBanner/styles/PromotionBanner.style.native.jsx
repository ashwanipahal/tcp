import styled from 'styled-components/native';

const FullBleedBannerStyle = styled.View`
  background-color: ${props => props.theme.colors.PROMO.YELLOW};
  text-align: center;
  padding: 5px 10px;
  height: 30px;
  justify-content: center;
`;

const TriangleBanner = styled.View`
  padding-left: 20px;
  display: flex;
  flex-direction: row;
`;

const LeftTriangle = styled.View`
  width: 0;
  height: 0;
  border-top-width: 10px;
  border-top-color: transparent;
  border-right-width: 20px;
  border-right-color: ${props => props.theme.colorPalette.yellow[500]};
  border-bottom-width: 10px;
  border-bottom-color: transparent;
`;

const TriangleBannerText = styled.View`
  background-color: ${props => props.theme.colorPalette.yellow[500]};
  height: 20px;
  width: 105px;
`;

export { FullBleedBannerStyle, TriangleBanner, LeftTriangle, TriangleBannerText };
