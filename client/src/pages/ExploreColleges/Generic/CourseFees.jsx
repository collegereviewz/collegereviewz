import React from 'react';

const GenericCourseFees = ({ collegeData }) => {
    const name = collegeData?.name || 'College';
    const courses = collegeData?.courses || [];

    // Group by programme so users can see sub-sections clearly
    const grouped = courses.reduce((acc, c) => {
        const key = c.programme || 'Other';
        if (!acc[key]) acc[key] = [];
        acc[key].push(c);
        return acc;
    }, {});

    const hasAny = courses.length > 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* ── Header card ──────────────────────────────────── */}
            <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '28px 32px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
            }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '24px' }}>
                    {name} Course &amp; Fees
                </h2>

                {!hasAny ? (
                    <div style={{ padding: '60px 40px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #e2e8f0' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#334155', marginBottom: '8px' }}>Course & Fees Coming Soon</h3>
                        <p style={{ fontSize: '14px', margin: 0 }}>The detailed fee structure for the current academic session is being updated for {name}.</p>
                    </div>
                ) : (

                    /* ── iterate over programme groups ────────────── */
                    Object.entries(grouped).map(([programme, rows]) => (
                        <div key={programme} style={{ marginBottom: '32px' }}>

                            {/* Programme label */}
                            {Object.keys(grouped).length > 1 && (
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
                                    color: '#5b21b6',
                                    fontWeight: 800,
                                    fontSize: '11px',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    marginBottom: '12px',
                                    letterSpacing: '0.5px',
                                    textTransform: 'uppercase'
                                }}>
                                    {programme}
                                </div>
                            )}

                            {/* Table */}
                            <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                                    <thead>
                                        <tr style={{
                                            background: 'linear-gradient(135deg, #5b51d8, #2dd4bf)',
                                            color: '#fff'
                                        }}>
                                            <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 800, fontSize: '13px' }}>Course</th>
                                            <th style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 800, fontSize: '13px' }}>Intake</th>
                                            <th style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 800, fontSize: '13px' }}>Fee</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((c, i) => {
                                            const intake = c.intake || c.approvedIntake || '—';
                                            const fee = c.fees || c.fee || '—';
                                            const isEven = i % 2 === 0;
                                            return (
                                                <tr key={i} style={{
                                                    background: isEven ? '#fff' : '#f8fafc',
                                                    borderBottom: i < rows.length - 1 ? '1px solid #f1f5f9' : 'none',
                                                    transition: 'background 0.2s'
                                                }}
                                                    onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
                                                    onMouseLeave={e => e.currentTarget.style.background = isEven ? '#fff' : '#f8fafc'}>
                                                    <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: '13px', color: '#1e293b' }}>
                                                        {c.course || c.courseName || '—'}
                                                    </td>
                                                    <td style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 600, fontSize: '13px', color: parseInt(intake) > 100 ? '#f59e0b' : '#3b82f6' }}>
                                                        {intake}
                                                    </td>
                                                    <td style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 700, fontSize: '13px', color: fee !== '—' ? '#10b981' : '#94a3b8' }}>
                                                        {fee !== '—' ? fee : '—'}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Row total */}
                            <div style={{ marginTop: '8px', fontSize: '12px', color: '#94a3b8', fontWeight: 600, textAlign: 'right' }}>
                                {rows.length} course{rows.length > 1 ? 's' : ''} listed
                            </div>
                        </div>
                    ))
                )}

                {/* Disclaimer */}
                {hasAny && (
                    <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px', lineHeight: 1.6 }}>
                        * Fee data may not be up-to-date. Please verify directly with the college or visit the official website.
                    </p>
                )}
            </div>
        </div>
    );
};

export default GenericCourseFees;
