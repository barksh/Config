/**
 * @author WMXPY
 * @namespace Placeholder
 * @description Placeholder
 * @override
 */

import { expect } from "chai";
import * as Chance from "chance";
import { getAppDataPath, getConfigFileName } from "../../src";

describe('Given [Path] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('path');

    it('should be able to get default file name', (): void => {

        const configFileName: string = getConfigFileName();
        expect(typeof configFileName).to.be.equal('string');
    });

    it('should be able to get app data path', (): void => {

        const appDataPath: string = getAppDataPath(chance.string());
        expect(typeof appDataPath).to.be.equal('string');
    });
});
