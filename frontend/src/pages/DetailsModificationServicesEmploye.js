import React from 'react';
import Navigation from '../composants/Navigation';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from '../composants/Footer';
import BarreDashboardEmploye from '../composants/BarreDashboardEmploye';

const DetailsModificationServicesEmploye = () => {

    const nom = useRef("");
    const description = useRef("");
    const image = useRef("");

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [dataService, setDataService] = useState([]);

    const idNombre = Number(id);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/services");
        setData(reponse.data);
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

    const modifierServices = (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "multipart/form-data"
        };

        const formData = new FormData();

        formData.append("nom", service.nom);
        formData.append("description", service.description);
        formData.append("image", service.image);

        try {
            const reponse = axios.put(`http://localhost:3002/services/modifier/${id}`, formData, { headers })
            if (reponse) {
                alert(`Le service ${service.nom} a été modifié avec succès`);
            }
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
        };
    };

    const effacer = (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Etes-vous sûr de vouloir effacer votre saisie ?");
        if (confirmation) {
            nom.current.value = "";
            description.current.value = "";
            image.current.value = "";
        }
    }

    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardEmploye />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Modifier le service "{service.nom}"</h2>
                    <div className="centrer">
                        <form className="formulaire" onSubmit={modifierServices}>
                            <input
                                type="text"
                                name="nom"
                                className="champsFormulaire"
                                id="nom"
                                placeholder="Nom du service..."
                                defaultValue={service.nom}
                                ref={nom}
                                onChange={inputChangement}
                            />
                            <label htmlFor="nom"></label>

                            <textarea
                                name="description"
                                className="champsFormulaire_textarea"
                                id="description"
                                placeholder="Description..."
                                defaultValue={service.description}
                                ref={description}
                                onChange={inputChangement}
                            />
                            <label htmlFor="description"></label>

                            <input
                                type="file"
                                name="image"
                                className="champsFormulaire_image"
                                id="image"
                                ref={image}
                                onChange={imageChangement}
                            />
                            <label htmlFor="image"></label>

                            <div className="centrer">
                                <button type="submit" className="bouton_zoo">Confirmer</button>
                                <button className="bouton_zoo" onClick={effacer}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DetailsModificationServicesEmploye;