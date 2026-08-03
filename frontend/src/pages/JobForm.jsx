import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function JobForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    status: "Applied",
  });

  const navigate = useNavigate(); 

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => { 
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/"); // Successfully saved, redirect to dashboard
      } else {
        console.error("Failed to create job");
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: 'var(--text-main)' }}>Add New Job Application</h2>

      <div className="job-card" style={{ display: 'block', maxWidth: '500px' }}>
        <form onSubmit={handleSubmit}>
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '0.9rem' }}>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '0.9rem' }}>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '0.9rem' }}>Status</label>
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'white', boxSizing: 'border-box' }}
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn-primary">
              Save Application
            </button>
            
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'white', cursor: 'pointer', fontWeight: '500' }}
            >
              Cancel
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}