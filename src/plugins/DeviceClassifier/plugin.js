/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import Agent from "../../utils/agent/Agent";
import DeviceClassifier from "./src/DeviceClassifier";

export default () => {
    return (openmct) => {
        openmct.on("start", () => {
            const agent = new Agent(window);
            DeviceClassifier(agent, window.document);
        });
    };
};
