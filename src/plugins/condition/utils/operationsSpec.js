/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import { OPERATIONS } from "./operations";
let isOneOfOperation = OPERATIONS.find((operation) => operation.name === 'isOneOf');
let isNotOneOfOperation = OPERATIONS.find((operation) => operation.name === 'isNotOneOf');
let isBetween = OPERATIONS.find((operation) => operation.name === 'between');
let isNotBetween = OPERATIONS.find((operation) => operation.name === 'notBetween');
let enumIsOperation = OPERATIONS.find((operation) => operation.name === 'enumValueIs');
let enumIsNotOperation = OPERATIONS.find((operation) => operation.name === 'enumValueIsNot');

describe('operations', function () {

    it('should evaluate isOneOf to true for number inputs', () => {
        const inputs = [45, "5,6,45,8"];
        expect(Boolean(isOneOfOperation.operation(inputs))).toBeTrue();
    });

    it('should evaluate isOneOf to true for string inputs', () => {
        const inputs = ["45", " 45, 645, 4,8 "];
        expect(Boolean(isOneOfOperation.operation(inputs))).toBeTrue();
    });

    it('should evaluate isNotOneOf to true for number inputs', () => {
        const inputs = [45, "5,6,4,8"];
        expect(Boolean(isNotOneOfOperation.operation(inputs))).toBeTrue();
    });

    it('should evaluate isNotOneOf to true for string inputs', () => {
        const inputs = ["45", " 5,645, 4,8 "];
        expect(Boolean(isNotOneOfOperation.operation(inputs))).toBeTrue();
    });

    it('should evaluate isOneOf to false for number inputs', () => {
        const inputs = [4, "5, 6, 7, 8"];
        expect(Boolean(isOneOfOperation.operation(inputs))).toBeFalse();
    });

    it('should evaluate isOneOf to false for string inputs', () => {
        const inputs = ["4", "5,645 ,7,8"];
        expect(Boolean(isOneOfOperation.operation(inputs))).toBeFalse();
    });

    it('should evaluate isNotOneOf to false for number inputs', () => {
        const inputs = [4, "5,4, 7,8"];
        expect(Boolean(isNotOneOfOperation.operation(inputs))).toBeFalse();
    });

    it('should evaluate isNotOneOf to false for string inputs', () => {
        const inputs = ["4", "5,46,4,8"];
        expect(Boolean(isNotOneOfOperation.operation(inputs))).toBeFalse();
    });

    it('should evaluate isBetween to true', () => {
        const inputs = ["4", "3", "89"];
        expect(Boolean(isBetween.operation(inputs))).toBeTrue();
    });

    it('should evaluate isNotBetween to true', () => {
        const inputs = ["45", "100", "89"];
        expect(Boolean(isNotBetween.operation(inputs))).toBeTrue();
    });

    it('should evaluate isBetween to false', () => {
        const inputs = ["4", "100", "89"];
        expect(Boolean(isBetween.operation(inputs))).toBeFalse();
    });

    it('should evaluate isNotBetween to false', () => {
        const inputs = ["45", "30", "50"];
        expect(Boolean(isNotBetween.operation(inputs))).toBeFalse();
    });

    it('should evaluate enumValueIs to true for number inputs', () => {
        const inputs = [1, "1"];
        expect(Boolean(enumIsOperation.operation(inputs))).toBeTrue();
    });

    it('should evaluate enumValueIs to true for string inputs', () => {
        const inputs = ["45", "45"];
        expect(Boolean(enumIsOperation.operation(inputs))).toBeTrue();
    });

    it('should evaluate enumValueIsNot to true for number inputs', () => {
        const inputs = [45, "46"];
        expect(Boolean(enumIsNotOperation.operation(inputs))).toBeTrue();
    });

    it('should evaluate enumValueIsNot to true for string inputs', () => {
        const inputs = ["45", "46"];
        expect(Boolean(enumIsNotOperation.operation(inputs))).toBeTrue();
    });

    it('should evaluate enumValueIs to false for number inputs', () => {
        const inputs = [1, "2"];
        expect(Boolean(enumIsOperation.operation(inputs))).toBeFalse();
    });

    it('should evaluate enumValueIs to false for string inputs', () => {
        const inputs = ["45", "46"];
        expect(Boolean(enumIsOperation.operation(inputs))).toBeFalse();
    });

    it('should evaluate enumValueIsNot to false for number inputs', () => {
        const inputs = [45, "45"];
        expect(Boolean(enumIsNotOperation.operation(inputs))).toBeFalse();
    });

    it('should evaluate enumValueIsNot to false for string inputs', () => {
        const inputs = ["45", "45"];
        expect(Boolean(enumIsNotOperation.operation(inputs))).toBeFalse();
    });

    it('should evaluate enumValueIs to false for undefined input', () => {
        const inputs = [undefined, "45"];
        expect(Boolean(enumIsOperation.operation(inputs))).toBeFalse();
    });

    it('should evaluate enumValueIsNot to true for undefined input', () => {
        const inputs = [undefined, "45"];
        expect(Boolean(enumIsNotOperation.operation(inputs))).toBeTrue();
    });
});
