import MaintenanceBase from './abe-maintenance.base';

const SELECTORS = {
    MAINTENANCE_HEADER: '~all-maintenance-items-header',
};

class AllMaintenanceScreen extends MaintenanceBase {
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
export default new AllMaintenanceScreen();
