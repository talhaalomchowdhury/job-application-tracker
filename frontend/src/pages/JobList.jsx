import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  // Fetch real data from your Express backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/jobs');
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error connecting to backend:", error);
      }
    };
    fetchJobs();
  }, []);

  const counts = {
    All: jobs.length,
    Applied: jobs.filter(job => job.status === "Applied").length,
    Interviewing: jobs.filter(job => job.status === "Interviewing").length,
    Offer: jobs.filter(job => job.status === "Offer").length,
    Rejected: jobs.filter(job => job.status === "Rejected").length,
  };

  const filteredJobs = activeFilter === "All" 
    ? jobs 
    : jobs.filter(job => job.status === activeFilter);

  const getBadgeClass = (status) => {
    switch (status) {
      case 'Applied': return 'badge-applied';
      case 'Interviewing': return 'badge-interviewing';
      case 'Rejected': return 'badge-rejected';
      case 'Offer': return 'badge-offer';
      default: return 'badge-applied';
    }
  };

  const getAvatarColor = (name) => {
    if (!name) return '#60a5fa';
    const colors = ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#ec4899'];
    const charCode = name.charCodeAt(0) || 0;
    return colors[charCode % colors.length];
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '2rem' }}>My Applications</h1>
          <p style={{ margin: 0, color: 'var(--text-light)' }}>Track and manage your job applications in one place.</p>
        </div>
        <Link to="/new" className="btn-primary">+ Add New Job</Link>
      </div>

      <div className="filter-tabs">
        {['All', 'Applied', 'Interviewing', 'Offer', 'Rejected'].map(filterOption => (
          <button 
            key={filterOption}
            className={`filter-pill ${activeFilter === filterOption ? 'active' : ''}`}
            onClick={() => setActiveFilter(filterOption)}
          >
            {filterOption} 
            <span style={{ marginLeft: '6px', opacity: 0.8, fontSize: '0.85rem', fontWeight: '600' }}>
              {counts[filterOption]}
            </span>
          </button>
        ))}
      </div>

      <div>
        {filteredJobs.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-light)', marginTop: '40px' }}>No jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-info-wrapper">
                <div 
                  className="company-avatar" 
                  style={{ backgroundColor: getAvatarColor(job.companyName) }}
                >
                  {job.companyName ? job.companyName.charAt(0).toUpperCase() : '?'}
                </div>
                <div className="job-details">
                  <h3 style={{ margin: "0 0 4px 0", color: "var(--text-main)" }}>{job.companyName}</h3>
                  <p style={{ margin: 0, color: "var(--text-light)", fontSize: "0.9rem" }}>{job.jobTitle}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span className={`badge ${getBadgeClass(job.status)}`}>
                  {job.status}
                </span>
                <Link to={`/jobs/${job.id}`} style={{ color: 'var(--text-light)', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>
                  Details →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}