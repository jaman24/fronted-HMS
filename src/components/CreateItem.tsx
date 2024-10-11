import React, { useState } from "react";

const CreateItem: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [rent, setRent] = useState(0);
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // Append new selected images to the existing images
            setImages((prevImages) => [...prevImages, ...Array.from(e.target.files as FileList)]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (rent < 0) {
            setError("Rent cannot be negative.");
            return;
        }
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("rent", rent.toString());
        formData.append("location", location);
    
        // Append each image to the FormData
        images.forEach((image) => {
            formData.append("images", image);
        });
    
        try {
            const response = await fetch("http://192.168.0.110:8000/item", {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error("Failed to create item.");
            }
    
            const result = await response.json();
            console.log(result);
            // Optionally handle success, such as redirecting or displaying a success message
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };
    

    return (
        <div className="container">
            <h1 className="mb-4">Create Item</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Item Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter item name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        placeholder="Enter item description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                
                {/* Display selected images with remove buttons */}
                <div className="mb-3">
                    {images.length > 0 && (
                        <ul className="list-group mb-3">
                            {images.map((image, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    {image.name}
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        X
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <label htmlFor="images" className="form-label">Upload Images</label>
                    <input
                        type="file"
                        className="form-control"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="rent" className="form-label">Rent</label>
                    <input
                        type="number"
                        className="form-control"
                        id="rent"
                        placeholder="Enter rent"
                        value={rent}
                        onChange={(e) => setRent(Number(e.target.value))}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Create Item</button>
            </form>
        </div>
    );
};

export default CreateItem;
