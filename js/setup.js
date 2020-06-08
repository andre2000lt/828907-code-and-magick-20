'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COATS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

var getRandomNumber = function (min, max) {
  if (min === max) {
    return min;
  }

  if (min > max) {
    var n = min;
    min = max;
    max = n;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateName = function () {
  var nameIndex = getRandomNumber(0, NAMES.length - 1);
  var surnameIndex = getRandomNumber(0, SURNAMES.length - 1);

  return NAMES[nameIndex] + ' ' + SURNAMES[surnameIndex];
};

var generateCoatColor = function () {
  var coatIndex = getRandomNumber(0, COATS.length - 1);

  return COATS[coatIndex];
};

var generateEyeColor = function () {
  var eyeIndex = getRandomNumber(0, EYES.length - 1);

  return EYES[eyeIndex];
};

var createWizard = function () {
  var wizard = {
    name: generateName(),
    coatColor: generateCoatColor(),
    eyesColor: generateEyeColor()
  };

  return wizard;
};

var createAllWizards = function () {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    wizards[i] = createWizard();
  }

  return wizards;
};

var createWizardElement = function (wizard) {
  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var wizardElement = wizardTemplate.cloneNode(true);
  var wizardName = wizardElement.querySelector('.setup-similar-label');
  wizardName.textContent = wizard.name;

  var wizardCoat = wizardElement.querySelector('.wizard-coat');
  wizardCoat.style.fill = wizard.coatColor;

  var wizardEyes = wizardElement.querySelector('.wizard-eyes');
  wizardEyes.style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderSimilarWizards = function () {
  var wizards = createAllWizards();
  var wizardsFragment = document.createDocumentFragment();
  for (var i = 0; i < 4; i++) {
    var wizardElement = createWizardElement(wizards[i]);
    wizardsFragment.appendChild(wizardElement);
  }

  var similarWizardsBlock = document.querySelector('.setup-similar-list');
  similarWizardsBlock.appendChild(wizardsFragment);
};

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var similarWizardsSetup = document.querySelector('.setup-similar');
similarWizardsSetup.classList.remove('hidden');

renderSimilarWizards();

