/**
 * @author WMXPY
 * @namespace Placeholder
 * @description Placeholder
 * @override
 */

import { expect } from "chai";
import * as Chance from "chance";

describe('placeholder', (): void => {

    const chance: Chance.Chance = new Chance('placeholder');

    it('placeholder', (): void => {

        expect(chance.string()).to.be.not.equal(chance.string());
    });
});
