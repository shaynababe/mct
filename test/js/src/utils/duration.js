/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

function normalizeAge(num) {
    const hundredtized = num * 100;
    const isWhole = hundredtized % 100 === 0;

    return isWhole ? hundredtized / 100 : num;
}

function padLeadingZeros(num, numOfLeadingZeros) {
    return num.toString().padStart(numOfLeadingZeros, '0');
}

function toDoubleDigits(num) {
    return padLeadingZeros(num, 2);
}

function toTripleDigits(num) {
    return padLeadingZeros(num, 3);
}

function addTimeSuffix(value, suffix) {
    return typeof value === 'number' && value > 0 ? `${value + suffix}` : '';
}

export function millisecondsToDHMS(numericDuration) {
    const ms = numericDuration || 0;
    const dhms = [
        addTimeSuffix(Math.floor(normalizeAge(ms / ONE_DAY)), 'd'),
        addTimeSuffix(Math.floor(normalizeAge((ms % ONE_DAY) / ONE_HOUR)), 'h'),
        addTimeSuffix(Math.floor(normalizeAge((ms % ONE_HOUR) / ONE_MINUTE)), 'm'),
        addTimeSuffix(Math.floor(normalizeAge((ms % ONE_MINUTE) / ONE_SECOND)), 's'),
        addTimeSuffix(Math.floor(normalizeAge(ms % ONE_SECOND)), "ms")
    ].filter(Boolean).join(' ');

    return `${ dhms ? '+' : ''} ${dhms}`;
}

export function getPreciseDuration(value) {
    const ms = value || 0;

    return [
        toDoubleDigits(Math.floor(normalizeAge(ms / ONE_DAY))),
        toDoubleDigits(Math.floor(normalizeAge((ms % ONE_DAY) / ONE_HOUR))),
        toDoubleDigits(Math.floor(normalizeAge((ms % ONE_HOUR) / ONE_MINUTE))),
        toDoubleDigits(Math.floor(normalizeAge((ms % ONE_MINUTE) / ONE_SECOND))),
        toTripleDigits(Math.floor(normalizeAge(ms % ONE_SECOND)))
    ].join(":");

}
