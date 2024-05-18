import React from 'react';
import Navigation from '../composants/Navigation';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import Footer from '../composants/Footer';

const DetailsModificationAnimaux = () => {

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [dataAnimal, setDataAnimal] = useState([]);
    const { prenom } = useParams();
    const [nouveauPrenom, setNouveauPrenom] = useState("")
    const [dataHabitat, setDataHabitat] = useState([]);
    const [dataNomHabitat, setDataNomHabitat] = useState([]);

    const idNombre = Number(id);

    const prenomAnimal = useRef("");
    const race = useRef("");
    const habitat = useRef("");
    const description = useRef("");
    const image = useRef("");

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/animaux");
        setData(reponse.data);
    };

    const loadDataHabitat = async () => {
        const reponse = await axios.get("http://localhost:3002/habitats");
        setDataHabitat(reponse.data);
    };

    useEffect(() => {
        loadData();
        loadDataHabitat();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataAnimal(data.find(animal => animal.id === idNombre));
            const dataFiltrer = dataHabitat.map(habitat => habitat.nom);
            setDataNomHabitat(dataFiltrer);
        }
    }, [data]);

    const [animal, setAnimal] = useState({
        id: "",
        prenom: "",
        race: "",
        habitat: "",
        image: "",
        description: ""
    });

    useEffect(() => {
        setAnimal(dataAnimal)
    }, [dataAnimal]);

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setAnimal({
            ...animal,
            [name]: nouvelleValeur,
        });
    };

    const modifierAnimaux = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "multipart/form-data"
        };

        const formData = new FormData();

        formData.append("prenom", animal.prenom);
        formData.append("race", animal.race);
        formData.append("habitat", animal.habitat);
        formData.append("description", animal.description);
        formData.append("image", animal.image);

        axios.put(`http://localhost:3002/animaux/modifier/${id}`, formData, { headers })

        axios.put(`http://localhost:3002/animaux-nourriture/modifier/${prenom}`, { nouveauPrenom })

        axios.put(`http://localhost:3002/animaux-soins/modifier/${prenom}`, { nouveauPrenom })

        try {
            const reponse_mongoDB = await axios.put(`http://localhost:3002/modifier-animaux-vues/${prenom}`, { nouveauPrenom })
            if (reponse_mongoDB) {
                alert(`Animal ${animal.prenom} modifié avec succès`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const imageChangement = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            console.log(img)
            setAnimal({
                ...animal,
                image: img
            });
            console.log(animal)
        };
    };

    const effacer = (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Etes-vous sûr de vouloir effacer votre saisie ?");
        if (confirmation) {
            prenomAnimal.current.value = "";
            race.current.value = "";
            habitat.current.value = "";
            description.current.value = "";
            image.current.value = "";
        }
    }

    console.log(dataNomHabitat)

    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Modifier l'animal {animal.prenom}</h2>
                    <div className="centrer">
                        <form className="formulaire">
                            <input
                                type="text"
                                name="prenom"
                                className="champsFormulaire"
                                id="prenom"
                                placeholder="Prénom..."
                                defaultValue={animal.prenom}
                                ref={prenomAnimal}
                                onChange={(e) => {
                                    setNouveauPrenom(e.target.value)
                                    inputChangement(e)
                                }}
                            />
                            <label htmlFor="prenom"></label>

                            <input
                                type="text"
                                name="race"
                                className="champsFormulaire"
                                id="race"
                                placeholder="Race..."
                                defaultValue={animal.race}
                                ref={race}
                                onChange={inputChangement}
                            />
                            <label htmlFor="race"></label>

                            <select
                                name="habitat"
                                id="habitat"
                                className="champsFormulaire"
                                ref={habitat}
                                style={{ width: "140px" }}
                                onChange={inputChangement}
                            >
                                <option value="">{animal.habitat}</option>
                                {dataNomHabitat.map((nomHabitat, index) => (
                                    <>
                                        {
                                            animal.habitat === nomHabitat ?
                                                <></>
                                                :
                                                <option key={index} value={nomHabitat}>
                                                    {nomHabitat}
                                                </option>
                                        }
                                    </>
                                ))}
                            </select>

                            <textarea
                                name="description"
                                className="champsFormulaire_textarea"
                                id="description"
                                placeholder="Description..."
                                defaultValue={animal.description}
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
                                <button type="submit" className="bouton_zoo" onClick={modifierAnimaux}>Confirmer</button>
                                <button className="bouton_zoo" onClick={effacer}>Effacer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DetailsModificationAnimaux;