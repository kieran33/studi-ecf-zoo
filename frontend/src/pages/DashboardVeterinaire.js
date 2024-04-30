import React from 'react';
import Navigation from '../composants/Navigation';
import BarreDashboardVeterinaire from '../composants/BarreDashboardVeterinaire';
import Footer from '../composants/Footer';

const DashboardVeterinaire = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardVeterinaire />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardVeterinaire;