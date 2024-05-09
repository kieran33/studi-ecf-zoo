import React, { useEffect, useState } from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import axios from 'axios';

const AnimauxPopulaires = () => {

    const [dataAnimaux, setDataAnimaux] = useState([]);
    const [data, setData] = useState([]);
    const [dataAnimauxTrier, setDataAnimauxTrier] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/animaux");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3002/vues-animaux')
            .then(animaux => setDataAnimaux(animaux.data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        if (dataAnimaux.length > 0) {
            setDataAnimauxTrier(dataAnimaux.sort(function compare(a, b) {
                if (a.nombreVues > b.nombreVues) {
                    return -1;
                }
                else if (a.nombreVues < b.nombreVues) {
                    return 1;
                }
                else {
                    return 0;
                }
            }));
        }
    }, [dataAnimaux]);

    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h1 className="titre_service">Animaux populaires</h1>
                    <div className="centrer">
                        {dataAnimauxTrier.map((dataAnimal, index) => (
                            <div className="animal" key={index}>

                                <p className="titre_service">{dataAnimal.nombreVues} vues</p>

                                {data.map((animal, index) => (
                                    <div key={index}>
                                        {
                                            dataAnimal.prenom === animal.prenom ?
                                                <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                                    src={`http://localhost:3002/image/${animal.image}`}
                                                    alt={animal.prenom}
                                                >
                                                </img>
                                                :
                                                null
                                        }
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>







                    {/*<div className="centrer">
                        {data.map((dataAnimal, index) => (
                            <div className="animal" key={index}>
                                <div className="div_zoo" style={{ width: '250px', height: '250px' }}>
                                    <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                        src={`http://localhost:3002/image/${dataAnimal.image}`}
                                        alt={dataAnimal.prenom}
                                    >
                                    </img>

                                    {dataAnimaux.map(animal => (
                                        <div>
                                            {
                                                dataAnimal.prenom === animal.prenom ?
                                                    <p className="titre_service" style={{ marginBottom: "100px" }}>{animal.nombreVues} vues</p>
                                                    :
                                                    <></>
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>*/}
                </div >
            </div>
            <Footer />
        </div >
    );
};

export default AnimauxPopulaires;