import {
  isArray,
  isEmpty,
  isObject,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class FilterValidator implements ValidatorConstraintInterface {
  validate(
    filter: { [key: string]: string } | { id: Array<string> },
    validationArguments: ValidationArguments,
  ) {
    console.log({ filter, validationArguments });

    if (filter?.hasOwnProperty('id')) {
      // if (isArray(filter.id)) {
      return true;
      // }

      // return false;
    }

    return isObject(filter) && !isEmpty(filter);
  }

  defaultMessage(validationArguments: ValidationArguments) {
    return 'Invalid Filter parameter';
  }
}
