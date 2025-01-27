const HomePage = () => {
    return (
        <div className="homepage-container">
            <h1>Welcome to the Admin Panel</h1>
            <p>
                Use the sidebar to manage expert-related tasks.<br/> Here’s what you can do:
            </p>
            
            <ul>
                <li><strong>Experts:</strong> View the list of approved experts, check their details, and manage their information.</li>
                <li><strong>Pending Approval:</strong> Review expert requests and decide whether to approve or decline them.</li>
                <li><strong>Unapproved Experts:</strong> Revisit previously declined experts and approve them if needed.</li>
            </ul>
        </div>
    );
}

export default HomePage;
