import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ModificationServices = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/services");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h2 className="titre_service">Choisissez le service à modifier</h2>
            <div className="centrer">
                {data.map((service, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo_service">
                            <Link to={`/dashboard-admin/modifier-services/${service.id}`} style={{ opacity: "1" }}>
                                <img className="image_zoo_service"
                                    src={`http://localhost:3002/image/${service.image}`}
                                    alt={service.nom}>
                                </img>
                            </Link>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>Modifier "{service.nom}"</div>
                        </div>

                    </div>
                ))}
            </div>
        </ >
    );
};

export default ModificationServices;