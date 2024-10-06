import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

const Navbar: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string>("");
    const { profileId } = useParams<{ profileId: string }>();


    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await fetch("https://localhost:8080/user/profileId"); 
                if (!response.ok) {
                    throw new Error("Failed to fetch profile image");
                }

                const data = await response.json();
                setProfileImage(data.imageUrl); 
            } catch (error) {
                console.error("Error fetching profile image:", error);
                // Optionally, set a default image or handle error
                setProfileImage("https://via.placeholder.com/50"); // Default image if fetch fails
            }
        };

        fetchProfileImage();
    }, [profileId]); 

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">BookingEasy</a>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="ms-auto">
                        <a href="/profile" className="navbar-link">
                            <img 
                                src={profileImage || "https://via.placeholder.com/50"} 
                                alt="Profile"
                                className="rounded-circle" 
                                width="50" 
                                height="50" 
                            />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
