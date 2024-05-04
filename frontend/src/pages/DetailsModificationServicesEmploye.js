import React from 'react';
import Navigation from '../composants/Navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer from '../composants/Footer';
import BarreDashboardEmploye from '../composants/BarreDashboardEmploye';

const DetailsModificationServicesEmploye = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [dataService, setDataService] = useState([]);

    const idNombre = Number(id);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/services");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataService(data.find(service => service.id === idNombre));
        }
    }, [data]);

    const [service, setService] = useState({
        id: "",
        nom: "",
        description: "",
        image: ""
    });

    useEffect(() => {
        setService(dataService)
    }, [dataService]);

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setService({
            ...service,
            [name]: nouvelleValeur,
        });
    };

    const modifierServices = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "multipart/form-data"
        };

        const formData = new FormData();

        formData.append("nom", service.nom);
        formData.append("description", service.description);
        formData.append("image", service.image);

        try {
            await axios.put(`http://localhost:3002/services/modifier/${id}`, formData, { headers })
        } catch (error) {
            console.log(error);
        }
    };

    const imageChangement = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            console.log(img)
            setService({
                ...service,
                image: img
            });
            console.log(service)
        };
    };

    const retourDashboardEmploye = () => {
        navigate("/dashboard-employe/modification-services");
    }

    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardEmploye />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <div className="centrer">
                        <form className="formulaire" onSubmit={modifierServices}>
                            <legend>Modifier le service "{service.nom}"</legend>
                            <input
                                type="text"
                                name="nom"
                                className="champsFormulaire"
                                id="nom"
                                placeholder="Nom du service..."
                                defaultValue={service.nom}
                                onChange={inputChangement}
                            />
                            <label htmlFor="nom"></label>

                            <textarea
                                name="description"
                                className="champsFormulaire"
                                id="description"
                                placeholder="Description..."
                                defaultValue={service.description}
                                onChange={inputChangement}
                            />
                            <label htmlFor="description"></label>

                            <input
                                type="file"
                                name="image"
                                className="champsFormulaire"
                                id="image"
                                style={{ width: "250px" }}
                                onChange={imageChangement}
                            />
                            <label htmlFor="image"></label>

                            <div className="centrer">
                                <button type="submit" className="bouton_zoo">Confirmer</button>
                                <button className="bouton_zoo" onClick={retourDashboardEmploye}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetailsModificationServicesEmploye;