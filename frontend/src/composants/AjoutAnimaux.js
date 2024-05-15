import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';

const AjoutAnimaux = () => {

    const [prenomAnimal, setPrenomAnimal] = useState("");

    const [nouvelAnimal, setNouvelAnimal] = useState({
        id: "",
        prenom: "",
        habitat: "",
        description: "",
        image: ""
    });

    const prenom = useRef("");
    const race = useRef("");
    const habitat = useRef("");
    const description = useRef("");
    const image = useRef("");

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setNouvelAnimal({
            ...nouvelAnimal,
            [name]: nouvelleValeur,
        });
    };

    const imageChangement = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            setNouvelAnimal({
                ...nouvelAnimal,
                image: img
            });
        };
    };

    const ajouterAnimaux = (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "multipart/form-data"
        };

        const formData = new FormData();

        formData.append("prenom", nouvelAnimal.prenom);
        formData.append("race", nouvelAnimal.race);
        formData.append("habitat", nouvelAnimal.habitat);
        formData.append("description", nouvelAnimal.description);
        formData.append("image", nouvelAnimal.image);


        try {
            const reponse = axios.post("http://localhost:3002/ajout-animaux", formData, { headers })
            const reponse_mongoDB = axios.post("http://localhost:3002/ajout-animaux-vues", { prenomAnimal })
            if (reponse && reponse_mongoDB) {
                alert(`Animal ${nouvelAnimal.prenom} ajouté avec succès`);
                prenom.current.value = "";
                race.current.value = "";
                habitat.current.value = "";
                description.current.value = "";
                image.current.value = "";
            }
        } catch (error) {
            console.log(error);
        }
    };

    const effacer = (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Etes-vous sûr de vouloir effacer votre saisie ?");
        if (confirmation) {
            prenom.current.value = "";
            race.current.value = "";
            habitat.current.value = "";
            description.current.value = "";
            image.current.value = "";
        }
    }

    return (
        <>
            <h2 className="titre_service">Ajouter animaux</h2>
            <form className="formulaire" onSubmit={ajouterAnimaux} >
                <input
                    type="text"
                    name="prenom"
                    className="champsFormulaire"
                    id="prenom"
                    placeholder="Prénom..."
                    ref={prenom}
                    onChange={(e) => {
                        setPrenomAnimal(e.target.value)
                        inputChangement(e)
                    }}
                    required
                />
                <label htmlFor="prenom"></label>

                <input
                    type="text"
                    name="race"
                    className="champsFormulaire"
                    id="race"
                    placeholder="Race..."
                    ref={race}
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="race"></label>

                <input
                    type="text"
                    name="habitat"
                    className="champsFormulaire"
                    id="habitat"
                    placeholder="Habitat..."
                    ref={habitat}
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="habitat"></label>

                <textarea
                    name="description"
                    className="champsFormulaire_textarea"
                    id="description"
                    placeholder="Description..."
                    ref={description}
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="description"></label>

                <input
                    type="file"
                    name="image"
                    className="champsFormulaire_image"
                    id="image"
                    ref={image}
                    onChange={imageChangement}
                    required
                />
                <label htmlFor="image"></label>

                <div className="centrer">
                    <button type="submit" className="bouton_zoo">Ajouter</button>
                    <button className="bouton_zoo" onClick={effacer}>Effacer</button>
                </div>
            </form>
        </ >
    );
};

export default AjoutAnimaux;