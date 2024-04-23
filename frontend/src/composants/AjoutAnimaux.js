import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Lion from "../image/lion-savane.jpg";

const AjoutAnimaux = () => {

    const [nouvelAnimal, setNouvelAnimal] = useState(animalParDefaut());

    function animalParDefaut() {
        return {
            prenom: "Lion",
            race: "Félin",
            habitat: "savane",
            description: "Le Lion est une espèce de mammifères carnivores de la famille des Félidés. La femelle du lion est la lionne, son petit est le lionceau.",
            image: Lion
        };
    };

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

        console.log('prenom animaux', nouvelAnimal.prenom);
        console.log('race animaux', nouvelAnimal.race);
        console.log('habitat animaux', nouvelAnimal.habitat);
        console.log('description animaux', nouvelAnimal.description);
        console.log('nom image', nouvelAnimal.image);

        axios.post("http://localhost:3002/ajout-animaux", formData, { headers })
            .then(response => {
                console.log(response.data);
                setNouvelAnimal(animalParDefaut());
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <div>
            <h1>Ajout animaux</h1>

            <form className="formulaire" onSubmit={ajouterAnimaux} >
                <legend>Ajout animaux</legend>
                <input
                    type="text"
                    name="prenom"
                    className="champsFormulaire"
                    id="prenom"
                    placeholder="Prénom..."
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="prenom"></label>

                <input
                    type="text"
                    name="race"
                    className="champsFormulaire"
                    id="race"
                    placeholder="Race..."
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
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="habitat"></label>

                <textarea
                    name="description"
                    className="champsFormulaire"
                    id="description"
                    placeholder="Description..."
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="description"></label>

                <input
                    type="file"
                    name="image"
                    className="champsFormulaire"
                    id="image"
                    onChange={imageChangement}
                    required
                />
                <label htmlFor="image"></label>

                <div className="centrer">
                    <button type="submit" className="bouton_zoo">Créer</button>
                    <button className="bouton_zoo" /*onClick={retourAccueil}*/>Annuler</button>
                </div>
            </form>
        </div >
    );
};

export default AjoutAnimaux;