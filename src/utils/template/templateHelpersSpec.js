/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import { toggleClass } from "@/utils/template/templateHelpers";

const CLASS_AS_NON_EMPTY_STRING = 'class-to-toggle';
const CLASS_AS_EMPTY_STRING = '';
const CLASS_DEFAULT = CLASS_AS_NON_EMPTY_STRING;
const CLASS_SECONDARY = 'another-class-to-toggle';
const CLASS_TERTIARY = 'yet-another-class-to-toggle';

const CLASS_TO_TOGGLE = CLASS_DEFAULT;

describe('toggleClass', () => {
    describe('type checking', () => {
        const A_DOM_NODE = document.createElement('div');
        const NOT_A_DOM_NODE = 'not-a-dom-node';
        describe('errors', () => {
            it('throws when "className" is an empty string', () => {
                expect(() => toggleClass(A_DOM_NODE, CLASS_AS_EMPTY_STRING)).toThrow();
            });
            it('throws when "element" is not a DOM node', () => {
                expect(() => toggleClass(NOT_A_DOM_NODE, CLASS_DEFAULT)).toThrow();
            });
        });
        describe('success', () => {
            it('does not throw when "className" is not an empty string', () => {
                expect(() => toggleClass(A_DOM_NODE, CLASS_AS_NON_EMPTY_STRING)).not.toThrow();
            });
            it('does not throw when "element" is a DOM node', () => {
                expect(() => toggleClass(A_DOM_NODE, CLASS_DEFAULT)).not.toThrow();
            });
        });
    });
    describe('adding a class', () => {
        it('adds specified class to an element without any classes', () => {
            // test case
            const ELEMENT_WITHOUT_CLASS = document.createElement('div');
            toggleClass(ELEMENT_WITHOUT_CLASS, CLASS_TO_TOGGLE);
            // expected
            const ELEMENT_WITHOUT_CLASS_EXPECTED = document.createElement('div');
            ELEMENT_WITHOUT_CLASS_EXPECTED.classList.add(CLASS_TO_TOGGLE);
            expect(ELEMENT_WITHOUT_CLASS).toEqual(ELEMENT_WITHOUT_CLASS_EXPECTED);
        });
        it('adds specified class to an element that already has another class', () => {
            // test case
            const ELEMENT_WITH_SINGLE_CLASS = document.createElement('div');
            ELEMENT_WITH_SINGLE_CLASS.classList.add(CLASS_SECONDARY);
            toggleClass(ELEMENT_WITH_SINGLE_CLASS, CLASS_TO_TOGGLE);
            // expected
            const ELEMENT_WITH_SINGLE_CLASS_EXPECTED = document.createElement('div');
            ELEMENT_WITH_SINGLE_CLASS_EXPECTED.classList.add(CLASS_SECONDARY, CLASS_TO_TOGGLE);
            expect(ELEMENT_WITH_SINGLE_CLASS).toEqual(ELEMENT_WITH_SINGLE_CLASS_EXPECTED);
        });
        it('adds specified class to an element that already has more than one other classes', () => {
            // test case
            const ELEMENT_WITH_MULTIPLE_CLASSES = document.createElement('div');
            ELEMENT_WITH_MULTIPLE_CLASSES.classList.add(CLASS_TO_TOGGLE, CLASS_SECONDARY);
            toggleClass(ELEMENT_WITH_MULTIPLE_CLASSES, CLASS_TO_TOGGLE);
            // expected
            const ELEMENT_WITH_MULTIPLE_CLASSES_EXPECTED = document.createElement('div');
            ELEMENT_WITH_MULTIPLE_CLASSES_EXPECTED.classList.add(CLASS_SECONDARY);
            expect(ELEMENT_WITH_MULTIPLE_CLASSES).toEqual(ELEMENT_WITH_MULTIPLE_CLASSES_EXPECTED);
        });
    });
    describe('removing a class', () => {
        it('removes specified class from an element that only has the specified class', () => {
            // test case
            const ELEMENT_WITH_ONLY_SPECIFIED_CLASS = document.createElement('div');
            ELEMENT_WITH_ONLY_SPECIFIED_CLASS.classList.add(CLASS_TO_TOGGLE);
            toggleClass(ELEMENT_WITH_ONLY_SPECIFIED_CLASS, CLASS_TO_TOGGLE);
            // expected
            const ELEMENT_WITH_ONLY_SPECIFIED_CLASS_EXPECTED = document.createElement('div');
            ELEMENT_WITH_ONLY_SPECIFIED_CLASS_EXPECTED.className = '';
            expect(ELEMENT_WITH_ONLY_SPECIFIED_CLASS).toEqual(ELEMENT_WITH_ONLY_SPECIFIED_CLASS_EXPECTED);
        });
        it('removes specified class from an element that has specified class, and others', () => {
            // test case
            const ELEMENT_WITH_SPECIFIED_CLASS_AND_OTHERS = document.createElement('div');
            ELEMENT_WITH_SPECIFIED_CLASS_AND_OTHERS.classList.add(CLASS_TO_TOGGLE, CLASS_SECONDARY, CLASS_TERTIARY);
            toggleClass(ELEMENT_WITH_SPECIFIED_CLASS_AND_OTHERS, CLASS_TO_TOGGLE);
            // expected
            const ELEMENT_WITH_SPECIFIED_CLASS_AND_OTHERS_EXPECTED = document.createElement('div');
            ELEMENT_WITH_SPECIFIED_CLASS_AND_OTHERS_EXPECTED.classList.add(CLASS_SECONDARY, CLASS_TERTIARY);
            expect(ELEMENT_WITH_SPECIFIED_CLASS_AND_OTHERS).toEqual(ELEMENT_WITH_SPECIFIED_CLASS_AND_OTHERS_EXPECTED);
        });
    });
});
