import MaintenanceBase from './abe-maintenance.base';

const SELECTORS = {
    MAINTENANCE_HEADER: '~my-maintenance-header',
};

class MyMaintenanceScreen extends MaintenanceBase {
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
export default new MyMaintenanceScreen();
