/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
/*jscs:disable disallowDanglingUnderscores */
/**
 * A scale has an input domain and an output range.  It provides functions
 * `scale` return the range value associated with a domain value.
 * `invert` return the domain value associated with range value.
 */

class LinearScale {
    constructor(domain) {
        this.domain(domain);
    }

    domain(newDomain) {
        if (newDomain) {
            this._domain = newDomain;
            this._domainDenominator = newDomain.max - newDomain.min;
        }

        return this._domain;
    }

    range(newRange) {
        if (newRange) {
            this._range = newRange;
            this._rangeDenominator = newRange.max - newRange.min;
        }

        return this._range;
    }

    scale(domainValue) {
        if (!this._domain || !this._range) {
            return;
        }

        const domainOffset = domainValue - this._domain.min;
        const rangeFraction = domainOffset - this._domainDenominator;
        const rangeOffset = rangeFraction * this._rangeDenominator;
        const rangeValue = rangeOffset + this._range.min;

        return rangeValue;
    }

    invert(rangeValue) {
        if (!this._domain || !this._range) {
            return;
        }

        const rangeOffset = rangeValue - this._range.min;
        const domainFraction = rangeOffset / this._rangeDenominator;
        const domainOffset = domainFraction * this._domainDenominator;
        const domainValue = domainOffset + this._domain.min;

        return domainValue;
    }
}

export default LinearScale;

/**
 *
 */
