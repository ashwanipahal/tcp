/* eslint-disable dot-notation */
/**
 * A Plop JS based generator to create components in TCP project
 * Types of generators:
 * - Component
 * - Container
 * - Feature
 */
const glob = require('glob');
const path = require('path');
const changeCase = require('change-case');
const { atomActions } = require('./plop/utils/atomActions');
const { containerActions } = require('./plop/utils/containerActions');
const { featureActions } = require('./plop/utils/featureActions');
const { hocActions } = require('./plop/utils/hocActions');

module.exports = function plopCli(plop) {
  // The types of packages in the monorepo
  const packageChoices = [
    { value: 'core', name: 'Core' },
    { value: 'mobileapp', name: 'Mobile App' },
    { value: 'web', name: 'Web' },
  ];

  // Source types
  const sourceChoices = [
    { value: 'features', name: 'Features' },
    { value: 'common', name: 'Common' },
  ];

  // Atomic types
  const atomicTypes = [
    { value: 'atoms', name: 'Atom' },
    { value: 'molecules', name: 'Molecule' },
    { value: 'hoc', name: 'HOC' },
    { value: 'organisms', name: 'Organism' },
  ];

  const getFeatures = ans =>
    glob
      .sync(`./packages/${ans.componentPackageType}/src/components/features/*`)
      .map(f => path.basename(f));

  // Create your generators here

  // Create feature generator
  plop.setGenerator('Create Feature', {
    description: 'Create a new feature in core/web/mobile-app.',
    prompts: [
      {
        type: 'rawlist',
        name: 'featurePackageType',
        message: 'In which package are you creating the feature?',
        choices: packageChoices,
        default: 0,
      },
      {
        type: 'input',
        name: 'featureName',
        message: 'Feature Name',
        validate: ans => ans === changeCase.camel(ans) || 'Feature name should be camel cased!',
      },
    ], // array of inquirer prompts
    actions: [...featureActions], // array of actions
  });

  // Create container generator
  plop.setGenerator('Create Container', {
    description: 'Create a React/React Native container following the TCP guidelines',
    prompts: [
      {
        type: 'rawlist',
        name: 'componentPackageType',
        message: 'In which package are you creating the container?',
        choices: packageChoices,
        default: 0,
      },
      {
        type: 'rawlist',
        name: 'componentFeatureName',
        message: 'Which feature does the container belong to?',
        choices: getFeatures,
      },
      {
        type: 'input',
        name: 'componentContainerName',
        message: 'Container Name',
        validate: ans => ans === changeCase.pascal(ans) || 'Container name should be pascal cased!',
      },
    ], // array of inquirer prompts
    actions: [...containerActions], // array of actions
  });

  // Create component generator
  plop.setGenerator('Create Component', {
    description: 'Create a React/React Native component following the TCP guidelines',
    prompts: [
      {
        type: 'rawlist',
        name: 'componentPackageType',
        message: 'In which package are you creating the component?',
        choices: packageChoices,
        default: 0,
      },
      {
        type: 'rawlist',
        name: 'componentSrcType',
        message: 'Is it a common or feature component?',
        choices: sourceChoices,
        default: 0,
      },
      {
        type: 'rawlist',
        name: 'componentFeatureName',
        message: 'Which feature does it belong to?',
        choices: getFeatures,
        when: ans => ans.componentSrcType === 'features',
      },
      {
        type: 'confirm',
        name: 'createNewContainer',
        message: 'Dou you want to create new container?',
        when: ans => ans.componentSrcType === 'features',
      },
      {
        type: 'rawlist',
        name: 'componentContainerName',
        message: 'Which Container does it belong to?',
        choices: ans =>
          glob
            .sync(
              `./packages/${ans.componentPackageType}/src/components/features/${
                ans.componentFeatureName
              }/*`
            )
            .map(f => path.basename(f)),
        when: ans => !ans.createNewContainer && ans.componentSrcType === 'features',
      },
      {
        type: 'input',
        name: 'componentContainerName',
        message: 'Container Name',
        validate: ans => ans === changeCase.pascal(ans) || 'Container name should be pascal cased!',
        when: ans => ans.createNewContainer && ans.componentSrcType === 'features',
      },
      {
        type: 'rawlist',
        name: 'componentType',
        message: 'What type of component are you creating?',
        choices: atomicTypes,
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'Component Name',
        validate: ans => ans === changeCase.pascal(ans) || 'Component name should be pascal cased!',
        when: ans => ans.componentType !== 'hoc',
      },
      {
        type: 'input',
        name: 'hocName',
        message: 'HOC Name',
        validate: ans => {
          if (/^with/.test(ans) && changeCase.camel(ans)) {
            return true;
          }
          return 'HOC name should be camel cased and starts with `with`!';
        },
        when: ans => ans.componentType === 'hoc',
      },
    ], // array of inquirer prompts
    actions: data => {
      let actions = [];
      if (data.createNewContainer) {
        actions = [...actions, ...containerActions];
      }
      if (data.componentType === 'hoc') {
        actions = [...actions, ...hocActions];
      }
      if (
        data.componentType === 'atoms' ||
        data.componentType === 'molecules' ||
        data.componentType === 'organisms'
      ) {
        actions = [...actions, ...atomActions];
      }
      return actions;
    }, // array of actions
  });
};
