import React from 'react';
import BoardExamsSection from '../components/BoardExamsSection';

const Resources = () => {
    return (
        <div style={{ paddingTop: '90px', background: '#fff' }}>
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8fafc' }}>
                <h1 style={{ fontSize: '42px', fontWeight: 900, color: '#1e293b' }}>Student Resources</h1>
                <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '800px', margin: '20px auto' }}>
                    Access important information for board exams, admissions, and more.
                </p>
            </div>
            <BoardExamsSection />
        </div>
    );
};

export default Resources;
