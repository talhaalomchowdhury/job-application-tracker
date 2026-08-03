import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import JobList from './pages/JobList';
import JobForm from './pages/JobForm';
import JobDetail from './pages/JobDetail'; // <-- Capitalized the 'J' here!
import EditJob from './pages/EditJob'; // <-- 1. Imported the Edit page

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container" style={{ padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/new" element={<JobForm/>}/>
          <Route path="/jobs/:id" element={<JobDetail/>}/>
          <Route path="/edit/:id" element={<EditJob />} /> {/* <-- 2. Added the Edit route! */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;