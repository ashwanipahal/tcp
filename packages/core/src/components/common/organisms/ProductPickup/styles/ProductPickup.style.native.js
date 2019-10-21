import styled, { css } from 'styled-components/native';

const getAdditionalStyle = props => {
  const { margins } = props;
  return {
    ...(margins && { margin: margins }),
  };
};

const getContainerStyle = props => {
  const { theme } = props;
  const { colorPalette, spacing } = theme;
  return `
    border-color: ${colorPalette.gray[1600]};
    padding-top: ${spacing.ELEM_SPACING.MED};
    padding-bottom: ${spacing.ELEM_SPACING.MED};
  `;
};

const getFastShippingContainerStyle = props => {
  const { theme } = props;
  const { spacing } = theme;
  return `
    flex-direction: row;
    align-items: center;
    padding-left: ${spacing.ELEM_SPACING.MED};
    padding-right: ${spacing.ELEM_SPACING.MED};
  `;
};

const FastShippingContainer = styled.View`
  ${getFastShippingContainerStyle}
`;

const FastShippingTextContainer = styled.View`
  flex-direction: column;
  margin-left: 20px;
`;

const getStoreContainerStyle = props => {
  const { theme } = props;
  const { spacing } = theme;
  return `
    flex-direction: row;
    margin-top: ${spacing.ELEM_SPACING.MED};
    padding-left: ${spacing.ELEM_SPACING.MED};
    padding-right: ${spacing.ELEM_SPACING.MED};
  `;
};

const StoreContainer = styled.View`
  ${getStoreContainerStyle}
`;
const RowContainer = styled.View`
  ${getAdditionalStyle};
  flex-direction: row;
  align-items: center;
`;

const ColumnContainer = styled.View`
  ${getAdditionalStyle};
  flex-direction: column;
`;
const getPromotionESpotLeftArrow = props => {
  const { theme } = props;
  const { colorPalette } = theme;
  return `
    width: 0;
    height: 0;
    background: transparent;
    border-style: solid;
    border-top-width: 10;
    border-right-width: 20;
    border-bottom-width: 10;
    border-left-width: 0;
    border-top-color: transparent;
    border-right-color: ${colorPalette.yellow[500]};
    border-bottom-color: transparent;
    border-left-color: transparent;
  `;
};

const getPromotionESpot = props => {
  const { theme } = props;
  const { spacing } = theme;
  return `
    flex-direction: row;
    margin-left: ${spacing.ELEM_SPACING.XS};
  `;
};

const PromotionESpotLeftArrow = styled.View`
  ${getPromotionESpotLeftArrow}
`;

const PromotionESpot = styled.View`
  ${getPromotionESpot}
`;

const getPromotionESpotTextContainer = props => {
  const { theme } = props;
  const { colorPalette, spacing } = theme;
  return `
    background: ${colorPalette.yellow[500]};
    height: 20px;
    align-items: center;
    padding-right: ${spacing.ELEM_SPACING.XXS};
    justify-content: center;
  `;
};

const PromotionESpotTextContainer = styled.View`
  ${getPromotionESpotTextContainer};
`;

const Container = styled.View`
  ${getAdditionalStyle}
  ${getContainerStyle}
`;

const styles = css``;

export {
  styles,
  Container,
  FastShippingContainer,
  FastShippingTextContainer,
  StoreContainer,
  RowContainer,
  ColumnContainer,
  PromotionESpotLeftArrow,
  PromotionESpot,
  PromotionESpotTextContainer,
};
