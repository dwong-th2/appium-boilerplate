import MaintenanceBase from './abe-maintenance.base';

const SELECTORS = {
    MAINTENANCE_HEADER: '~completed-maintenance-header',
};

class CompletedMaintenanceScreen extends MaintenanceBase {
    constructor () {
        super(SELECTORS.MAINTENANCE_HEADER);
    }

    // =======
    // getters
    // =======

    // =======
    // methods
    // =======
}
export default new CompletedMaintenanceScreen();
