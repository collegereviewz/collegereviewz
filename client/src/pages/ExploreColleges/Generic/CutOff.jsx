import React from 'react';
import { Target, Info } from 'lucide-react';

const CutOff = ({ collegeData }) => {
    const name = collegeData?.name || 'College';
    const cutOffs = collegeData?.cutOffs || 'Recent cutoff information is being updated. Please check back soon or visit the official WBJEE/JEE website.';
    
    const cardStyle = {
        background: '#fff',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    };

    const sectionTitleStyle = {
        fontSize: '20px',
        fontWeight: 950,
        color: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={cardStyle}>
                <h2 style={sectionTitleStyle}>
                    <Target size={24} color="#5b51d8" />
                    {name} Cutoff 2024
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
                    {cutOffs}
                </div>

                <div style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    padding: '16px', 
                    background: '#eff6ff', 
                    borderRadius: '12px',
                    border: '1px solid #dbeafe'
                }}>
                    <Info size={20} color="#3b82f6" style={{ flexShrink: 0 }} />
                    <p style={{ fontSize: '13px', color: '#1e40af', lineHeight: '1.5', margin: 0 }}>
                        Cutoffs are subject to change based on the number of applicants, seat availability, and exam difficulty. These ranks are indicative based on the most recent rounds of counseling.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CutOff;
