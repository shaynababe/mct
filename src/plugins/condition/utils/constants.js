/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

export const TRIGGER = {
    ANY: 'any',
    ALL: 'all',
    NOT: 'not',
    XOR: 'xor'
};

export const TRIGGER_LABEL = {
    'any': 'any criteria are met',
    'all': 'all criteria are met',
    'not': 'no criteria are met',
    'xor': 'only one criterion is met'
};

export const TRIGGER_CONJUNCTION = {
    'any': 'or',
    'all': 'and',
    'not': 'and',
    'xor': 'or'
};

export const STYLE_CONSTANTS = {
    isStyleInvisible: 'is-style-invisible',
    borderColorTitle: 'Set border color',
    textColorTitle: 'Set text color',
    backgroundColorTitle: 'Set background color',
    imagePropertiesTitle: 'Edit image properties',
    visibilityHidden: 'Hidden',
    visibilityVisible: 'Visible'
};

export const ERROR = {
    'TELEMETRY_NOT_FOUND': {
        errorText: 'Telemetry not found for criterion'
    },
    'CONDITION_NOT_FOUND': {
        errorText: 'Condition not found'
    }
};

export const IS_OLD_KEY = 'isStale';
export const IS_STALE_KEY = 'isStale.new';
