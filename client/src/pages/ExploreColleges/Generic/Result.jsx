import React from 'react';
import { ClipboardList, BookOpen, Clock, AlertCircle } from 'lucide-react';

const Result = ({ collegeData }) => {
    const name = collegeData?.name || 'College';
    const resultInfo = collegeData?.resultInfo || 'Detailed information about semester examinations, grading systems, and result declaration is being updated.';

    const cardStyle = {
        background: '#fff',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={cardStyle}>
                <h2 style={{ fontSize: '20px', fontWeight: 950, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ClipboardList size={24} color="#5b51d8" />
                    Examination & Result System
                </h2>
                
                <div style={{ 
                    background: '#f8fafc', 
                    padding: '24px', 
                    borderRadius: '16px', 
                    border: '1px solid #f1f5f9',
                    lineHeight: '1.8',
                    color: '#475569',
                    fontSize: '14px',
                    whiteSpace: 'pre-wrap'
                }}>
                    {resultInfo}
                </div>

                {/* Quick Academic Info */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '16px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                        <BookOpen size={20} color="#5b51d8" />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b' }}>Evaluation System</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Semester-based Credit System</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                        <Clock size={20} color="#3b82f6" />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b' }}>Result Frequency</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Declared twice a year (Jan/June)</div>
                        </div>
                    </div>
                </div>

                <div style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    padding: '16px', 
                    background: '#fff7ed', 
                    borderRadius: '12px',
                    border: '1px solid #ffedd5'
                }}>
                    <AlertCircle size={20} color="#f97316" style={{ flexShrink: 0 }} />
                    <p style={{ fontSize: '13px', color: '#9a3412', lineHeight: '1.5', margin: 0 }}>
                        For official grade cards and transcripts, students are advised to check the University portal (MAKAUT) using their roll number and registration details.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Result;
