import React from 'react';

// ProfessionalLinks.jsx
// Simple JSX component with three buttons: LinkedIn, GitHub, Resume

export default function ProfessionalLinks() {

    const linkedInUrl = 'https://www.linkedin.com/in/kevin-martinez-lara-37b115331/';
    const gitHubUrl = "https://github.com/kevinm2020";


    const containerStyle = {
        display: 'flex',
        gap: "12px",
        justifyContent: 'center',
        marginTop: '20px'
    };

    const buttonStyle = 
    {
        padding: "10px 20px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
    };

    return (
        <div style={containerStyle}>

            {/* LinkedIn Button */}
            <button
                style={{ ...buttonStyle, backgroundColor: "#0077B5", color: "#fff" }}
                onClick={() => window.open(linkedInUrl, "_blank")}
            >

                LinkedIn
            </button>

            {/* GitHub Button */}
            <button
                style={{ ...buttonStyle, backgroundColor: "#333", color: "#fff" }}
                onClick={() => window.open(gitHubUrl, "_blank")}
            >
                GitHub
            </button>

           {/* Resume Button */}
           {/* Resume Button */}
            <a
            href="/KMLResumeMARCH2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            >
            <button>View Resume</button>
            </a>

        </div>
    );

};
