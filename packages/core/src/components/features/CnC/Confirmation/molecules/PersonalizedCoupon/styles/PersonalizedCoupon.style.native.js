import styled from 'styled-components/native';

const CouponWrapper = styled.View`
  border: 1px dashed ${props => props.theme.colors.TEXT.DARKERGRAY};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const CouponHeadingWrapper = styled.View`
  width: 60%;
  align-self: center;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const CouponRow = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const LeftTopRibbon = styled.View`
  transform: rotate(-135deg);
  left: 6px;
  top: -15px;
  width: 0;
  height: 59px;
  border-left-width: ${props => props.theme.spacing.ELEM_SPACING.XS};
  border-left-color: #000;
  border-right-width: ${props => props.theme.spacing.ELEM_SPACING.XS};
  border-right-color: transparent;
  border-top-width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  border-top-color: transparent;
  border-bottom-width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  border-bottom-color: transparent;
  position: absolute;
  z-index: 5;
`;

const LeftTopTriangle = styled.View`
  width: 0;
  height: 0;
  border-top-width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  border-top-color: transparent;
  border-bottom-width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  border-bottom-color: transparent;
  border-right-width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  border-right-color: white;
  transform: rotate(45deg);
  position: absolute;
  left: -4px;
  top: -14px;
`;

const RightBottomRibbon = styled.View`
  transform: rotate(45deg);
  right: 6px;
  bottom: -15px;
  width: 0;
  height: 59px;
  border-left-width: ${props => props.theme.spacing.ELEM_SPACING.XS};
  border-left-color: #000;
  border-right-width: ${props => props.theme.spacing.ELEM_SPACING.XS};
  border-right-color: transparent;
  border-top-width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  border-top-color: transparent;
  border-bottom-width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  border-bottom-color: transparent;
  position: absolute;
  z-index: 5;
`;

const RightBottomTriangle = styled.View`
  width: 0px;
  height: 0px;
  border-top-width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  border-top-color: transparent;
  border-bottom-width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  border-bottom-color: transparent;
  border-left-width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  border-left-color: white;
  transform: rotate(45deg);
  position: absolute;
  right: -4px;
  bottom: -14px;
`;

const ArrowImage = styled.Image`
  height: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  align-self: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
`;

const PrintImage = styled.Image`
  position: absolute;
  width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  height: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  right: 0;
  bottom: -12;
  z-index: 10;
`;

export {
  CouponWrapper,
  CouponHeadingWrapper,
  CouponRow,
  LeftTopRibbon,
  LeftTopTriangle,
  RightBottomRibbon,
  RightBottomTriangle,
  ArrowImage,
  PrintImage,
};
