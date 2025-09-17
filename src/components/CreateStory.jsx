import React, { useState, useEffect } from "react";
import "../styles/CreateStory.css";

export default function CreateStory() {
    const [urlInput, setUrlInput] = useState("");
    const [preview, setPreview] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("user"));
        if (stored?.id) setUserId(stored.id);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId || !urlInput) return alert("Missing user or URL");

        const res = await fetch("http://localhost:5000/api/stories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, mediaUrl: urlInput }),
        });

        if (res.ok) {
            setUrlInput("");
            setPreview("");
            alert("Story added!");
        } else {
            const data = await res.json();
            alert(data.error || "Failed to add story");
        }
    };

    return (
        <div className="create-story-container">
            <h2>📸 Add a Story</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    placeholder="Paste media URL"
                    value={urlInput}
                    onChange={(e) => {
                        setUrlInput(e.target.value);
                        setPreview(e.target.value);
                    }}
                    required
                />
                {preview && (
                    <div className="story-preview">
                        {/\.(mp4|webm|ogg)$/i.test(preview) ? (
                            <video src={preview} controls />
                        ) : (
                            <img src={preview} alt="Preview" />
                        )}
                    </div>
                )}
                <button type="submit">➕ Add Story</button>
            </form>
        </div>
    );
}
