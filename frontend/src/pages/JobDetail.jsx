import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/jobs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data);
        } else {
          console.error("Failed to fetch job details");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchSingleJob();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/jobs/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        navigate('/'); 
      } else {
        console.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case 'Applied': return 'badge-applied';
      case 'Interviewing': return 'badge-interviewing';
      case 'Rejected': return 'badge-rejected';
      case 'Offer': return 'badge-offer';
      default: return 'badge-applied';
    }
  };

  if (!job) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--text-light)' }}>Loading job details...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ color: 'var(--text-light)', textDecoration: 'none', fontWeight: '500' }}>
          ← Back to Dashboard
        </Link>
      </div>

      <div className="job-card" style={{ display: 'block' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h2 style={{ margin: '0 0 8px 0', color: 'var(--text-main)', fontSize: '1.75rem' }}>{job.companyName}</h2>
            <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '1.1rem' }}>{job.jobTitle}</p>
          </div>
          <span className={`badge ${getBadgeClass(job.status)}`}>
            {job.status}
          </span>
        </div>
        
        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '20px 0' }} />
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to={`/edit/${job.id}`} className="btn-primary">
            Edit Job
          </Link>
          
          <button 
            onClick={handleDelete} 
            style={{ padding: '10px 20px', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}
          >
            Delete Job
          </button>
        </div>
      </div>
    </div>
  );
}