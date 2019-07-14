const strictRules = {
  'selector-max-specificity': [
    '0,2,0',
    {
      ignoreSelectors: [':global', ':local'],
      severity: 'warning',
    },
  ],
  'no-empty-source': null,
  'max-empty-lines': 2,
  'block-no-empty': true,
  'max-nesting-depth': 3,
  'declaration-colon-newline-after': null,
  'value-list-max-empty-lines': null,
  'font-family-no-missing-generic-family-keyword': null,
  'comment-empty-line-before': null,
  'declaration-empty-line-before': null,
  'property-no-vendor-prefix': null,
};

module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-styled-components',
    'stylelint-config-recommended',
    'stylelint-config-css-modules',
    'stylelint-config-prettier',
  ],
  rules: strictRules,
};
