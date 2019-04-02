/**
 * @author WMXPY
 * @namespace Config
 * @description Storage
 */

import { _Json } from "@sudoo/bark/json";
import { Ensure, pathExists, readTextFile, writeTextFile } from "@sudoo/io";

export const replaceConfigFromFilePath = async <T>(filePath: string, config: T): Promise<void> => {

    const exist: boolean = await pathExists(filePath);

    if (!exist) {

        const ensure: Ensure = Ensure.create();
        await ensure.ensure(filePath);
    }
    await writeTextFile(filePath, _Json.formatStringify(config));
    return;
};

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
