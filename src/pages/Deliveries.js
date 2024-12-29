import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Deliveries.css";

function Deliveries() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [deliveries] = useState([
        {
            id: 1,
            number: "9999",
            producer: "Olimp",
            priority: "Normalny",
            status: "Przyjęcie na magazyn",
        },
    ]);

    const filteredDeliveries = deliveries.filter((delivery) =>
        delivery.number.includes(search)
    );

    return (
        <div className="deliveries">
            <h1>Lista Dostaw</h1>
            <div className="actions">
                <input
                    type="text"
                    placeholder="Filtruj po numerze dostawy..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={() => navigate("/create-delivery")}>Utwórz</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Numer</th>
                        <th>Producent</th>
                        <th>Priorytet</th>
                        <th>Status</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDeliveries.map((delivery) => (
                        <tr key={delivery.id}>
                            <td>{delivery.number}</td>
                            <td>{delivery.producer}</td>
                            <td>{delivery.priority}</td>
                            <td>{delivery.status}</td>
                            <td>
                                <button>Szczegóły</button>
                                <button>Usuń</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Deliveries;
