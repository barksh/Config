/**
 * @author WMXPY
 * @namespace Config
 * @description Storage
 */

import { Ensure, pathExists, readTextFile, writeTextFile } from "@sudoo/io";

export const getOrInitConfigFromPath = async <T>(path: string, initDefault: T): Promise<T> => {

    const exist: boolean = await pathExists(path);

    if (!exist) {

        const ensure: Ensure = Ensure.create();

        await ensure.ensure(path);
        await writeTextFile(path, JSON.stringify(initDefault, null, 2));

        return initDefault;
    }

    const file: string = await readTextFile(path);

    const parsed: T = JSON.parse(file);
    return parsed;
};
