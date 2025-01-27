import useFetch from '../hooks/useFetch'; // Import the custom hook

const Home = () => {
  // Use the custom hook to fetch data from the server
  const { data, isLoading, error } = useFetch("http://localhost:5000/admin/approvedExperts");

  // Log the fetched data to inspect its structure
  console.log("Data fetched:", data);

  return (
    <div className="page">
      <section className="about-site">
        <h2>About Our Site</h2>
        <p>
          Safe Space is dedicated to raising awareness and providing resources to combat challenges such as
          cyberbullying, sexual harassment, and eating disorders. Our goal is to create a supportive community
          where everyone feels safe and empowered by receiving help from trusted professionals.
        </p>
      </section>

      <section className="about-experts">
        <h2>Meet Our Experts</h2>

        {isLoading && <p>Loading experts...</p>}
        {error && <p className="error">{error}</p>}

        <div className="expert-profiles">
          {data && data.data ? (
            data.data.map(expert => (
              <div className="expert" key={expert._id}>
                <h3>{expert.expertName}</h3>
                <p>{expert.about}</p>
              </div>
            ))
          ) : (
            <p>No experts available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
