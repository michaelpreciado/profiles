import React, { useState } from 'react';
import ProjectsSidebar from '../components/ProjectsSidebar';

const ProjectsPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // Filter projects based on active category
    const filteredProjects = projects.filter(project => 
        activeCategory === 'all' || project.category === activeCategory
    );

    return (
        <div className="projects-container">
            <div className="filter-buttons">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            {/* Sidebar component */}
            <ProjectsSidebar 
                isVisible={isSidebarVisible} 
                onClose={toggleSidebar}
            />
            
            {/* ... rest of the component ... */}
        </div>
    );
};

export default ProjectsPage;