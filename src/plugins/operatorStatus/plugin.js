/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import OperatorStatusIndicator from './operatorStatus/OperatorStatusIndicator';
import PollQuestionIndicator from './pollQuestion/PollQuestionIndicator';

/**
 * @param {import('@/api/user/UserAPI').UserAPIConfiguration} configuration
 * @returns {function} The plugin install function
 */
export default function operatorStatusPlugin(configuration) {
    return function install(openmct) {

        if (openmct.user.hasProvider()) {
            openmct.user.status.canProvideStatusForCurrentUser().then(canProvideStatus => {
                if (canProvideStatus) {
                    const operatorStatusIndicator = new OperatorStatusIndicator(openmct, configuration);

                    operatorStatusIndicator.install();
                }
            });

            openmct.user.status.canSetPollQuestion().then(canSetPollQuestion => {
                if (canSetPollQuestion) {
                    const pollQuestionIndicator = new PollQuestionIndicator(openmct, configuration);

                    pollQuestionIndicator.install();
                }
            });
        }
    };
}
