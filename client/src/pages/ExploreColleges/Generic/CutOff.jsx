import React, { useState } from 'react';
import { Target, Info, Filter, Search, ChevronDown, Download, BarChart2, TrendingUp } from 'lucide-react';

const CutOff = ({ collegeData, collegeInfo }) => {
    const name = collegeData?.name || collegeInfo?.fullName || 'College';
    const type = (collegeData?.type || collegeInfo?.type || name).toLowerCase();
    const state = (collegeData?.state || collegeInfo?.state || '').toLowerCase();
    const locationStr = (collegeData?.location || collegeInfo?.location || '').toLowerCase();

    const isWestBengal = state.includes('west bengal') || locationStr.includes('west bengal') || locationStr.includes('kolkata') || locationStr.includes('howrah') || locationStr.includes('durgapur');

    // Determine exams based on type
    let exams = ['General Cutoff'];
    if (type.includes('engineering') || type.includes('technology') || type.includes('institute of technology') || type.includes('nit') || type.includes('iit')) {
        exams = ['JEE Main', 'JEE Advanced', 'GATE'];
        if (isWestBengal) {
            exams.push('WBJEE');
        }
    } else if (type.includes('medical') || type.includes('dental') || type.includes('aiims')) {
        exams = ['NEET UG', 'NEET PG', 'AYUSH', 'INI CET'];
    } else if (type.includes('management') || type.includes('business') || type.includes('iim')) {
        exams = ['CAT', 'MAT', 'XAT', 'CMAT'];
    } else if (type.includes('law') || type.includes('nlu')) {
        exams = ['CLAT', 'LSAT India', 'AILET'];
    }

    const [activeExam, setActiveExam] = useState(exams[0]);
    const [selectedYear, setSelectedYear] = useState('2025');

    // Dynamic rounds mapping
    const getRoundsForExam = (exam) => {
        if (exam === 'JEE Main' || exam === 'JEE Advanced') {
            return [
                'JoSAA Round 1', 'JoSAA Round 2', 'JoSAA Round 3', 'JoSAA Round 4',
                'JoSAA Round 5', 'JoSAA Round 6', 'CSAB Round 1', 'CSAB Round 2'
            ];
        } else if (exam === 'GATE') {
            return [
                'CCMT Round 1', 'CCMT Round 2', 'CCMT Round 3',
                'CCMT Special Round 1', 'CCMT Special Round 2', 'CCMT National Spot Round 1'
            ];
        } else if (exam === 'WBJEE') {
            return ['WBJEE Round 1', 'WBJEE Round 2'];
        }
        return ['Round 1', 'Round 2', 'Round 3'];
    };

    const availableRounds = getRoundsForExam(activeExam);
    const [selectedRound, setSelectedRound] = useState(availableRounds[0]);
    const [selectedCategory, setSelectedCategory] = useState('OPEN');
    const [selectedQuota, setSelectedQuota] = useState('AI');

    // API State
    const [cutoffs, setCutoffs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Update round when exam changes
    React.useEffect(() => {
        setSelectedRound(getRoundsForExam(activeExam)[0]);
    }, [activeExam]);

    // Fetch data whenever filters change
    React.useEffect(() => {
        const fetchCutoffs = async () => {
            setLoading(true);
            setError(null);
            try {
                // If it's a generic / mock exam without CSVs, skip fetching
                if (activeExam === 'General Cutoff') {
                    setCutoffs([]);
                    setLoading(false);
                    return;
                }

                // Make API Call
                const url = `http://localhost:5000/api/colleges/cutoffs/${encodeURIComponent(name)}`;
                const response = await fetch(`${url}?round=${encodeURIComponent(selectedRound)}&category=${encodeURIComponent(selectedCategory)}&quota=${encodeURIComponent(selectedQuota)}`);
                const result = await response.json();

                if (result.success) {
                    setCutoffs(result.data);
                } else {
                    setError(`Failed to fetch data: ${result.message || 'Unknown server error'}`);
                }
            } catch (err) {
                console.error("Error fetching cutoffs:", err);
                setError(`Error fetching data: ${err.message || String(err)}`);
            } finally {
                setLoading(false);
            }
        };

        if (name && selectedRound) {
            fetchCutoffs();
        }
    }, [name, activeExam, selectedRound, selectedCategory, selectedQuota]);

    const cardStyle = {
        background: '#fff',
        borderRadius: '20px',
        padding: '32px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    };

    const sectionTitleStyle = {
        fontSize: '22px',
        fontWeight: 900,
        color: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    };

    const SelectDropdown = ({ label, options, value, onChange }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>{label}</label>
            <div style={{ position: 'relative' }}>
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    style={{
                        width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0',
                        appearance: 'none', background: '#f8fafc', fontSize: '14px', fontWeight: 600, color: '#334155',
                        cursor: 'pointer', outline: 'none'
                    }}
                >
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <ChevronDown size={16} color="#94a3b8" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <h2 style={sectionTitleStyle}>
                        <Target size={28} color="#5b51d8" />
                        {name} Cutoffs & Admission Ranks
                    </h2>
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: '8px', background: '#eff6ff',
                        color: '#3b82f6', border: 'none', padding: '10px 16px', borderRadius: '10px',
                        fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'background 0.2s'
                    }}>
                        <Download size={16} /> Download Cutoff PDF
                    </button>
                </div>

                {/* Exam Tabs */}
                <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                    {exams.map(exam => (
                        <button
                            key={exam}
                            onClick={() => setActiveExam(exam)}
                            style={{
                                padding: '12px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '14px',
                                whiteSpace: 'nowrap', cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                                background: activeExam === exam ? '#5b51d8' : '#f1f5f9',
                                color: activeExam === exam ? '#fff' : '#64748b'
                            }}
                        >
                            {exam}
                        </button>
                    ))}
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '24px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', marginTop: '8px' }}>
                    <SelectDropdown label="Select Year" options={['2025']} value={selectedYear} onChange={setSelectedYear} />
                    <SelectDropdown label="Counselling Round" options={availableRounds} value={selectedRound} onChange={setSelectedRound} />
                    <SelectDropdown label="Category" options={['OPEN', 'OBC-NCL', 'SC', 'ST', 'EWS', 'OPEN (PwD)', 'OBC-NCL (PwD)']} value={selectedCategory} onChange={setSelectedCategory} />
                    <SelectDropdown label="Quota / Seat Type" options={['AI', 'HS', 'OS', 'All']} value={selectedQuota} onChange={setSelectedQuota} />
                </div>

                {/* Table Data */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#f8fafc' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 800, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Program / Course</th>
                                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 800, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Quota</th>
                                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 800, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Category</th>
                                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 800, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Opening Rank ({selectedYear})</th>
                                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 800, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Closing Rank ({selectedYear})</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontWeight: 600 }}>Loading Cutoffs...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#ef4444', fontWeight: 600 }}>{error}</td>
                                </tr>
                            ) : cutoffs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '60px 40px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '50%', display: 'inline-flex' }}>
                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <polyline points="12 6 12 12 16 14"></polyline>
                                                </svg>
                                            </div>
                                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#334155' }}>Coming Soon</div>
                                            <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 500, maxWidth: '400px', margin: '0 auto' }}>Detailed cutoff data for the selected filters will be updated here shortly.</div>
                                        </div>
                                    </td>
                                </tr>
                            ) : cutoffs.map((row, i) => (
                                <tr key={i} style={{ borderBottom: i === cutoffs.length - 1 ? 'none' : '1px solid #f1f5f9', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{row.course}</td>
                                    <td style={{ padding: '20px 24px', fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{row.quota}</td>
                                    <td style={{ padding: '20px 24px', fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{row.category}</td>
                                    <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                                        {row.openingRank} <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>(OR)</span>
                                    </td>
                                    <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: 800, color: '#5b51d8' }}>
                                        {row.closingRank} <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>(CR)</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '16px 20px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #f1f5f9',
                    marginTop: '8px',
                    alignItems: 'center'
                }}>
                    <Info size={20} color="#64748b" style={{ flexShrink: 0 }} />
                    <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                        <strong>Note:</strong> The cutoffs presented above are official ranks from previous years. Actual cutoffs for the current session may vary. OR indicates Opening Rank, CR indicates Closing Rank.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CutOff;
