import React from 'react';

const GenericCourseFees = ({ collegeData }) => {
  const info = collegeData || { name: "College Name" };
  
  const cardStyle = {
    background: '#fff',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
      <div style={cardStyle}>
        <h2 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '20px' }}>Course & Fees</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: 800 }}>Course</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: 800 }}>Total Fees</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: 800 }}>Eligibility</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '16px', fontWeight: 600 }}>{info.courseName || 'B.Tech'}</td>
              <td style={{ padding: '16px', fontWeight: 800, color: '#10b981' }}>{info.fees || '₹8,82,500'}</td>
              <td style={{ padding: '16px', fontWeight: 600 }}>10+2 with 75% + JEE Advanced</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenericCourseFees;
