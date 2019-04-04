/**
 * @author WMXPY
 * @namespace Config
 * @description Config
 */

import * as Path from "path";
import { getAppDataPath, getConfigFileName } from "./path";
import { getOrInitConfigFromFilePath, replaceConfigFromFilePath } from "./storage";

export class Config {

    public static with(path: string, fileName: string): Config {

        return new Config(path, fileName);
    }

    public static withDefaultFileName(path: string): Config {

        const fileName: string = getConfigFileName();
        return this.with(path, fileName);
    }

    public static withDefaultPath(fileName: string): Config {

        const path: string = getAppDataPath();
        return this.with(path, fileName);
    }

    public static withDefault(): Config {

        const fileName: string = getConfigFileName();
        const path: string = getAppDataPath();
        return this.with(path, fileName);
    }

    private readonly _path: string;
    private readonly _fileName: string;

    private constructor(path: string, fileName: string) {

        this._path = Path.resolve(path);
        this._fileName = fileName;
    }

    public get path(): string {

        return this._path;
    }

    public get configFilePath(): string {

        return this.joinPath(this._fileName);
    }

    public async getOrInit<T>(defaultConfig: T): Promise<T> {

        const parsed: T = await getOrInitConfigFromFilePath(this.configFilePath, defaultConfig);
        return parsed;
    }

    public async replace<T>(config: T): Promise<void> {

        await replaceConfigFromFilePath(this.configFilePath, config);
        return;
    }

    public joinPath(...paths: string[]): string {

        return Path.join(this._path, ...paths);
    }
}
