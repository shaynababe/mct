/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import { IS_OLD_KEY, IS_STALE_KEY } from "./constants";

function convertToNumbers(input) {
    let numberInputs = [];
    input.forEach(inputValue => numberInputs.push(Number(inputValue)));

    return numberInputs;
}

function convertToStrings(input) {
    let stringInputs = [];
    input.forEach(inputValue => stringInputs.push(inputValue !== undefined ? inputValue.toString() : ''));

    return stringInputs;
}

function joinValues(values, length) {
    return values.slice(0, length).join(', ');
}

export const OPERATIONS = [
    {
        name: 'equalTo',
        operation: function (input) {
            return Number(input[0]) === Number(input[1]);
        },
        text: 'is equal to',
        appliesTo: ['number'],
        inputCount: 1,
        getDescription: function (values) {
            return ' is ' + joinValues(values, 1);
        }
    },
    {
        name: 'notEqualTo',
        operation: function (input) {
            return Number(input[0]) !== Number(input[1]);
        },
        text: 'is not equal to',
        appliesTo: ['number'],
        inputCount: 1,
        getDescription: function (values) {
            return ' is not ' + joinValues(values, 1);
        }
    },
    {
        name: 'greaterThan',
        operation: function (input) {
            return Number(input[0]) > Number(input[1]);
        },
        text: 'is greater than',
        appliesTo: ['number'],
        inputCount: 1,
        getDescription: function (values) {
            return ' > ' + joinValues(values, 1);
        }
    },
    {
        name: 'lessThan',
        operation: function (input) {
            return Number(input[0]) < Number(input[1]);
        },
        text: 'is less than',
        appliesTo: ['number'],
        inputCount: 1,
        getDescription: function (values) {
            return ' < ' + joinValues(values, 1);
        }
    },
    {
        name: 'greaterThanOrEq',
        operation: function (input) {
            return Number(input[0]) >= Number(input[1]);
        },
        text: 'is greater than or equal to',
        appliesTo: ['number'],
        inputCount: 1,
        getDescription: function (values) {
            return ' >= ' + joinValues(values, 1);
        }
    },
    {
        name: 'lessThanOrEq',
        operation: function (input) {
            return Number(input[0]) <= Number(input[1]);
        },
        text: 'is less than or equal to',
        appliesTo: ['number'],
        inputCount: 1,
        getDescription: function (values) {
            return ' <= ' + joinValues(values, 1);
        }
    },
    {
        name: 'between',
        operation: function (input) {
            let numberInputs = convertToNumbers(input);
            let larger = Math.max(...numberInputs.slice(1, 3));
            let smaller = Math.min(...numberInputs.slice(1, 3));

            return (numberInputs[0] > smaller) && (numberInputs[0] < larger);
        },
        text: 'is between',
        appliesTo: ['number'],
        inputCount: 2,
        getDescription: function (values) {
            return ' is between ' + values[0] + ' and ' + values[1];
        }
    },
    {
        name: 'notBetween',
        operation: function (input) {
            let numberInputs = convertToNumbers(input);
            let larger = Math.max(...numberInputs.slice(1, 3));
            let smaller = Math.min(...numberInputs.slice(1, 3));

            return (numberInputs[0] < smaller) || (numberInputs[0] > larger);
        },
        text: 'is not between',
        appliesTo: ['number'],
        inputCount: 2,
        getDescription: function (values) {
            return ' is not between ' + values[0] + ' and ' + values[1];
        }
    },
    {
        name: 'textContains',
        operation: function (input) {
            return input[0] && input[1] && input[0].includes(input[1]);
        },
        text: 'text contains',
        appliesTo: ['string'],
        inputCount: 1,
        getDescription: function (values) {
            return ' contains ' + joinValues(values, 1);
        }
    },
    {
        name: 'textDoesNotContain',
        operation: function (input) {
            return input[0] && input[1] && !input[0].includes(input[1]);
        },
        text: 'text does not contain',
        appliesTo: ['string'],
        inputCount: 1,
        getDescription: function (values) {
            return ' does not contain ' + joinValues(values, 1);
        }
    },
    {
        name: 'textStartsWith',
        operation: function (input) {
            return input[0].startsWith(input[1]);
        },
        text: 'text starts with',
        appliesTo: ['string'],
        inputCount: 1,
        getDescription: function (values) {
            return ' starts with ' + joinValues(values, 1);
        }
    },
    {
        name: 'textEndsWith',
        operation: function (input) {
            return input[0].endsWith(input[1]);
        },
        text: 'text ends with',
        appliesTo: ['string'],
        inputCount: 1,
        getDescription: function (values) {
            return ' ends with ' + joinValues(values, 1);
        }
    },
    {
        name: 'textIsExactly',
        operation: function (input) {
            return input[0] === input[1];
        },
        text: 'text is exactly',
        appliesTo: ['string'],
        inputCount: 1,
        getDescription: function (values) {
            return ' is exactly ' + joinValues(values, 1);
        }
    },
    {
        name: 'isUndefined',
        operation: function (input) {
            return typeof input[0] === 'undefined';
        },
        text: 'is undefined',
        appliesTo: ['string', 'number', 'enum'],
        inputCount: 0,
        getDescription: function () {
            return ' is undefined';
        }
    },
    {
        name: 'isDefined',
        operation: function (input) {
            return typeof input[0] !== 'undefined';
        },
        text: 'is defined',
        appliesTo: ['string', 'number', 'enum'],
        inputCount: 0,
        getDescription: function () {
            return ' is defined';
        }
    },
    {
        name: 'enumValueIs',
        operation: function (input) {
            let stringInputs = convertToStrings(input);

            return stringInputs[0] === stringInputs[1];
        },
        text: 'is',
        appliesTo: ['enum'],
        inputCount: 1,
        getDescription: function (values) {
            return ' is ' + joinValues(values, 1);
        }
    },
    {
        name: 'enumValueIsNot',
        operation: function (input) {
            let stringInputs = convertToStrings(input);

            return stringInputs[0] !== stringInputs[1];
        },
        text: 'is not',
        appliesTo: ['enum'],
        inputCount: 1,
        getDescription: function (values) {
            return ' is not ' + joinValues(values, 1);
        }
    },
    {
        name: 'isOneOf',
        operation: function (input) {
            const lhsValue = input[0] !== undefined ? input[0].toString() : '';
            if (input[1]) {
                const values = input[1].split(',');

                return values.some((value) => lhsValue === value.toString().trim());
            }

            return false;
        },
        text: 'is one of',
        appliesTo: ["string", "number"],
        inputCount: 1,
        getDescription: function (values) {
            return ' is one of ' + values[0];
        }
    },
    {
        name: 'isNotOneOf',
        operation: function (input) {
            const lhsValue = input[0] !== undefined ? input[0].toString() : '';
            if (input[1]) {
                const values = input[1].split(',');
                const found = values.some((value) => lhsValue === value.toString().trim());

                return !found;
            }

            return false;
        },
        text: 'is not one of',
        appliesTo: ["string", "number"],
        inputCount: 1,
        getDescription: function (values) {
            return ' is not one of ' + values[0];
        }
    },
    {
        name: IS_OLD_KEY,
        operation: function () {
            return false;
        },
        text: 'is older than',
        appliesTo: ["number"],
        inputCount: 1,
        getDescription: function (values) {
            return ` is older than ${values[0] || ''} seconds`;
        }
    },
    {
        name: IS_STALE_KEY,
        operation: function () {
            return false;
        },
        text: 'is stale',
        appliesTo: ["number"],
        inputCount: 0,
        getDescription: function () {
            return ' is stale';
        }
    }
];

export const INPUT_TYPES = {
    'string': 'text',
    'number': 'number'
};

export function getOperatorText(operationName, values) {
    const found = OPERATIONS.find((operation) => operation.name === operationName);

    return found?.getDescription(values) ?? '';
}
