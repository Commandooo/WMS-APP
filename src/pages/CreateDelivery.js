import React, { useState } from "react";
import "./CreateDelivery.css";

function CreateDelivery() {
    const [deliveryNumber, setDeliveryNumber] = useState("");
    const [producer, setProducer] = useState("");
    const [priority, setPriority] = useState("Normalny");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Tworzenie dostawy:", {
            deliveryNumber,
            producer,
            priority,
        });
        setDeliveryNumber("");
        setProducer("");
        setPriority("Normalny");
    };

    return (
        <div className="create-delivery">
            <h2>Utwórz Zamówienie</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Numer przesyłki *</label>
                    <input
                        type="text"
                        value={deliveryNumber}
                        onChange={(e) => setDeliveryNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Producent *</label>
                    <input
                        type="text"
                        value={producer}
                        onChange={(e) => setProducer(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Priorytet *</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Normalny">Normalny</option>
                        <option value="Wysoki">Wysoki</option>
                        <option value="Niski">Niski</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit">Utwórz Zamówienie</button>
                </div>
            </form>
        </div>
    );
}

export default CreateDelivery;
