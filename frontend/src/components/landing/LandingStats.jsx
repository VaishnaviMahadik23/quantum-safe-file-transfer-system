import "./LandingStats.css";

const stats = [
  {
    number: "500+",
    title: "Secure Transfers",
  },
  {
    number: "100%",
    title: "Quantum Resistant",
  },
  {
    number: "AES-256",
    title: "Encryption Standard",
  },
  {
    number: "<1 sec",
    title: "Processing Time",
  },
];

function LandingStats() {
  return (
    <section className="landing-stats">

      {stats.map((item, index) => (

        <div className="stat-card" key={index}>

          <h2>{item.number}</h2>

          <p>{item.title}</p>

        </div>

      ))}

    </section>
  );
}

export default LandingStats;