import MaintenanceBase from './abe-maintenance.base';

const SELECTORS = {
    MAINTENANCE_HEADER: '~mechanic-s-maintenance-header',
};

class MechanicsMaintenanceScreen extends MaintenanceBase {
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
export default new MechanicsMaintenanceScreen();
