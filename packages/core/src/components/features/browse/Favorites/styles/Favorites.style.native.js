import styled from 'styled-components';

const getAdditionalStyle = props => {
  const { margins } = props;
  return {
    ...(margins && { margin: margins }),
  };
};

const PageContainer = styled.View`
  justify-content: center;
`;

const BrandFilterContainer = styled.View`
  position: absolute;
  ${getAdditionalStyle};
`;

const RowContainer = styled.View`
  flex-direction: row;
  ${getAdditionalStyle}
`;

const DropDownContainer = styled.View`
  margin-top: 12px;
`;

const ShareDropDownContainer = styled.View`
  align-self: flex-end;
`;

const ListHeaderContainer = styled.View`
  background-color: ${props => props.theme.colors.WHITE};
`;

const ListFooterContainer = styled.View`
  padding: 12px;
  background-color: ${props => props.theme.colors.WHITE};
`;

export {
  PageContainer,
  BrandFilterContainer,
  RowContainer,
  DropDownContainer,
  ShareDropDownContainer,
  ListHeaderContainer,
  ListFooterContainer,
};
