/**
 * @author WMXPY
 * @namespace Config
 * @description Config
 */

import * as Path from "path";
import { getAppDataPath, getConfigFileName } from "./path";
import { getOrInitConfigFromFilePath, replaceConfigFromFilePath } from "./storage";

export class Config {

    public static withPath(path: string): Config {

        return new Config(path);
    }

    public static withDefaultPath(): Config {

        const fileName: string = getConfigFileName();
        const appDataPath: string = getAppDataPath();
        const filePath: string = Path.join(appDataPath, fileName);

        return new Config(filePath);
    }

    private readonly _path: string;

    private constructor(path: string) {

        this._path = path;
    }

    public async getOrInit<T>(defaultConfig: T): Promise<T> {

        const parsed: T = await getOrInitConfigFromFilePath(this._path, defaultConfig);
        return parsed;
    }

    public async replace<T>(config: T): Promise<void> {

        await replaceConfigFromFilePath(this._path, config);
        return;
    }
}
