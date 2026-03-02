import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = ({ collegeData }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Use the college name directly from props to query the DB
  const collegeName = collegeData?.name || "Unknown College";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // This endpoint fetches the raw CSV-imported data for this specific college directly from MongoDB
        const res = await axios.get(`http://localhost:5000/api/colleges/${encodeURIComponent(collegeName)}/courses`);
        if (res.data.success) {
          setCourses(res.data.data);
        } else {
          setError('Failed to fetch courses data.');
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError('No course data available for this college.');
      } finally {
        setLoading(false);
      }
    };

    if (collegeName !== "Unknown College") {
      fetchCourses();
    } else {
      setLoading(false);
    }
  }, [collegeName]);

  // Group courses by level (UG, PG, Diploma, etc.) to recreate the user screenshot exactly
  const groupedCourses = courses.reduce((acc, course) => {
    let level = course.levelOfCourse || 'General Programs';
    level = level.trim().toUpperCase();
    if (level === 'UG' || level === 'UNDER GRADUATE') level = 'UG PROGRAMS';
    if (level === 'PG' || level === 'POST GRADUATE') level = 'PG PROGRAMS';
    if (level === 'DIPLOMA') level = 'DIPLOMA PROGRAMS';
    
    if (!acc[level]) acc[level] = [];
    acc[level].push(course);
    return acc;
  }, {});

  const cardStyle = {
    background: '#fff',
    borderRadius: '16px',
    padding: '32px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const headerStyle = {
    background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 50%, #3b82f6 100%)',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const cellStyle = {
    padding: '16px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    color: '#334155'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={cardStyle}>
        <h2 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px', color: '#1e293b' }}>
          Available Streams & Courses at {collegeName.split(',')[0]}
        </h2>
        
        {loading ? (
          <div style={{ padding: '20px', color: '#64748b' }}>Loading courses...</div>
        ) : error && courses.length === 0 ? (
          <div style={{ padding: '20px', color: '#ef4444' }}>{error}</div>
        ) : (
          Object.entries(groupedCourses).map(([level, classList]) => (
            <div key={level} style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px', fontWeight: 600 }}>
                {level}:
              </p>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                  <tr style={headerStyle}>
                    <th style={{ ...cellStyle, border: 'none', width: '30%', textAlign: 'left' }}>Stream / Programme</th>
                    <th style={{ ...cellStyle, border: 'none', borderLeft: '1px solid rgba(255,255,255,0.2)', width: '50%', textAlign: 'left', background: 'rgba(255,255,255,0.1)' }}>Specialization</th>
                    <th style={{ ...cellStyle, border: 'none', borderLeft: '1px solid rgba(255,255,255,0.2)', width: '20%', textAlign: 'left' }}>Intake / Seats</th>
                  </tr>
                </thead>
                <tbody>
                  {classList.map((c, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                      <td style={{ ...cellStyle, fontWeight: 700, color: '#4f46e5' }}>{c.programme || c.courseType || 'Degree'}</td>
                      <td style={{ ...cellStyle }}>{c.course || 'General'}</td>
                      <td style={{ ...cellStyle, fontWeight: 600 }}>{c.intake || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Courses;