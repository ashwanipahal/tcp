import styled from 'styled-components/native';

const ParentWrapper = styled.View`
  background-color: ${props => props.theme.colorPalette.white};
`;

const WrapperElement = styled.View`
  background-color: ${props => props.theme.colorPalette.white};
  padding: 20px 0;
  width: 100%;
  flex-direction: row;
`;

const ImageWrapper = styled.View`
  width: 100px;
  height: 100px;
`;

const LogoWrapper = styled.View`
  margin-top: 10px;
  width: 100px;
  height: 30px;
`;

const LeftSection = styled.View`
  margin-left: 12px;
`;

const RightSection = styled.View`
  margin-left: 12px;
`;

const BadgeWrapper = styled.View`
  height: 20px;
  width: 220px;
  margin-bottom: 5px;
`;

const ProductUpc = styled.View`
  width: 150px;
  height: 15px;
  margin-bottom: 14px;
`;
const ProductPrice = styled.View`
  height: 20px;
  width: 250px;
  margin-bottom: 5px;
`;
const ProductPoints = styled.View`
  height: 20px;
  width: 109px;
  margin-bottom: 15px;
`;
const SaveForLater = styled.View`
  width: 89px;
  height: 18px;
`;

const RadioWrapper = styled.View`
  background-color: ${props => props.theme.colorPalette.white};
  margin: 12px;
`;

const BorderWrapper = styled.View`
  border: 1px solid #9b9b9b;
`;

const RadioLoaderWrapper = styled.View`
  width: 165px;
  height: 20px;
  margin: 10px;
`;

export {
  ParentWrapper,
  WrapperElement,
  ImageWrapper,
  LogoWrapper,
  RightSection,
  BadgeWrapper,
  ProductUpc,
  ProductPrice,
  ProductPoints,
  SaveForLater,
  LeftSection,
  BorderWrapper,
  RadioWrapper,
  RadioLoaderWrapper,
};
