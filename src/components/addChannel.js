import { useState } from "react";
import styles from "@/styles/Home.module.css";


//create a new channel form


export default function AddChannel({setNewChannels}) {

    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const res = await fetch("/api/channels", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        const data = await res.json();
        if (data.error) {
            setError(data.message);
        } else {
            setNewChannels((channels) => [...channels, data]);
        }
        setLoading(false);
        setName("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                required
                type="text"
                placeholder="Add a channel"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Add Channel"}
            </button>
            {error && <p className="error">{error}</p>}
        </form>
    );   
}