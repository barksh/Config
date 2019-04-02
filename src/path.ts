/**
 * @author WMXPY
 * @namespace Config
 * @description Path
 */

import * as OS from "os";
import * as Path from "path";

export const getConfigFileName = (): string => '.bark.config';

export const getAppDataPath = (): string => {

    const os: NodeJS.Platform = OS.platform();
    const home: string = OS.homedir();
    switch (os) {

        case 'darwin': return Path.join(home, 'Library', 'Application Support', '.barksh');
        case 'linux': {
            const linuxPath: string | undefined = process.env.XDG_CONFIG_HOME;
            return linuxPath || Path.join(home, '.config', '.barksh');
        }
        case 'win32': throw new Error('...TODO');
        default: return Path.join(home, '.barksh');
    }
};
