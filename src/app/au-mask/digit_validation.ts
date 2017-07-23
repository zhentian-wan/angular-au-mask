type DigitValidator = (char) => boolean;

const numericValidator = (char) => /[0-9]{1}/.test(char);

export const digitValidators: {[key: string]: DigitValidator} = {
  '9': numericValidator
};
