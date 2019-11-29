import styled from 'styled-components/native';
import { View, Text, Image } from 'react-native';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor/views/Anchor.native';
import { getScreenWidth } from '../../../../utils/utils.app';

const cssRuleParser = (StyledStrings, className) => {
  if (!StyledStrings[className]) {
    return ``;
  }
  const rules = StyledStrings[className].split(';');
  return `
  ${rules.map(rule => {
    if (rule) {
      const ruleParams = rule.split(':');
      const key = ruleParams[0];
      const val = ruleParams[1];

      return `
          ${key}: ${val};
        `;
    }
    return null;
  })}
  `.replace(/[,]/g, '');
};

const checkIfClassNameExists = (StyledStrings, classNames) => {
  if (!classNames) {
    return false;
  }
  const classNamesArray = classNames.split(' ');
  let classNameExists = false;

  classNamesArray.forEach(className => {
    if (StyledStrings[className]) {
      classNameExists = true;
    }
  });

  return classNameExists;
};

export const getStyledViewComponent = (StyledStrings, classNames) => {
  if (!checkIfClassNameExists(StyledStrings, classNames)) {
    return View;
  }

  const classNamesArray = classNames.split(' ');
  const styledObject = {};
  classNamesArray.forEach(className => {
    const ruleTemplateString = cssRuleParser(StyledStrings, className);

    if (!styledObject.final) {
      styledObject.final = styled.View`
        ${ruleTemplateString}
      `;
    } else {
      styledObject.final = styled(styledObject.final)`
        ${ruleTemplateString}
      `;
    }
  });

  return styledObject.final;
};

export const getStyledTextComponent = (StyledStrings, classNames) => {
  if (!checkIfClassNameExists(StyledStrings, classNames)) {
    return Text;
  }

  const classNamesArray = classNames.split(' ');
  const styledObject = {};
  classNamesArray.forEach(className => {
    const ruleTemplateString = cssRuleParser(StyledStrings, className);

    if (!styledObject.final) {
      styledObject.final = styled.Text`
        ${ruleTemplateString}
      `;
    } else {
      styledObject.final = styled(styledObject.final)`
        ${ruleTemplateString}
      `;
    }
  });

  return styledObject.final;
};

export const getStyledImageComponent = (StyledStrings, classNames) => {
  if (!checkIfClassNameExists(StyledStrings, classNames)) {
    return Image;
  }

  const classNamesArray = classNames.split(' ');
  const styledObject = {};
  classNamesArray.forEach(className => {
    const ruleTemplateString = cssRuleParser(StyledStrings, className);

    if (!styledObject.final) {
      styledObject.final = styled.Image`
        width: ${getScreenWidth()};
        ${ruleTemplateString}
      `;
    } else {
      styledObject.final = styled(styledObject.final)`
        ${ruleTemplateString}
      `;
    }
  });

  return styledObject.final;
};

export const ImageWrapperView = styled.View``;
