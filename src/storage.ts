/**
 * @author WMXPY
 * @namespace Config
 * @description Storage
 */

import { _Json } from "@sudoo/bark/json";
import { Ensure, pathExists, readTextFile, writeTextFile } from "@sudoo/io";
import * as Path from "path";
import { getAppDataPath, getConfigFileName } from "./path";

export const getOrInitConfigFromFilePath = async <T>(filePath: string, initDefault: T): Promise<T> => {

    const exist: boolean = await pathExists(filePath);

    if (!exist) {

        const ensure: Ensure = Ensure.create();

        await ensure.ensure(filePath);
        await writeTextFile(filePath, _Json.formatStringify(initDefault));

        return initDefault;
    }

    const file: string = await readTextFile(filePath);

    const parsed: T = _Json.safeParse(file, new Error('Config file not valid'));
    return parsed;
};

export const getOrInitConfigWithDefaultFileName = async <T>(initDefault: T): Promise<T> => {

    const fileName: string = getConfigFileName();
    const appDataPath: string = getAppDataPath();

    const filePath: string = Path.join(appDataPath, fileName);

    const parsed: T = await getOrInitConfigFromFilePath(filePath, initDefault);
    return parsed;
};
