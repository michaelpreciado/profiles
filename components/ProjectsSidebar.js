import React from 'react';
import './ProjectsSidebar.css';

const ProjectsSidebar = ({ isVisible, onClose }) => {
    return (
        <div className={`projects-sidebar ${isVisible ? 'active' : ''}`}>
            <button className="sidebar-close-btn" onClick={onClose}>&times;</button>
            <div className="sidebar-content">
                <h2>Contact Information</h2>
                {/* Add your contact form/content here */}
            </div>
        </div>
    );
};

export default ProjectsSidebar; 