/**
 * @author WMXPY
 * @namespace Config
 * @description Storage
 */

import { _Json } from "@sudoo/bark/json";
import { Ensure, pathExists, readTextFile, writeTextFile } from "@sudoo/io";
import { getAppDataPath } from "./path";

export const getOrInitConfigFromPath = async <T>(path: string, initDefault: T): Promise<T> => {

    const exist: boolean = await pathExists(path);

    if (!exist) {

        const ensure: Ensure = Ensure.create();

        await ensure.ensure(path);
        await writeTextFile(path, _Json.formatStringify(initDefault));

        return initDefault;
    }

    const file: string = await readTextFile(path);

    const parsed: T = _Json.safeParse(file, new Error('Config file not valid'));
    return parsed;
};

export const getOrInitConfig = async <T>(initDefault: T): Promise<T> => {

    const appDataPath: string = getAppDataPath();

    const parsed: T = await getOrInitConfigFromPath(appDataPath, initDefault);
    return parsed;
};
