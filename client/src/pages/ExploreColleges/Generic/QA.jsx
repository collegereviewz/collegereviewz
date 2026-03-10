import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

const QA = ({ collegeData }) => {
    const name = collegeData?.name || 'College';
    const faqs = collegeData?.faq || [
        { question: 'What is the average package for CSE?', answer: 'The average package for CSE typically ranges between 4.5 to 6.5 LPA depending on the year.' },
        { question: 'Is hostel facility available?', answer: 'Yes, separate hostel facilities for boys and girls are available with basic amenities.' }
    ];

    const [openIndex, setOpenIndex] = useState(0);

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
                    <HelpCircle size={24} color="#5b51d8" />
                    Frequently Asked Questions
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {faqs.map((f, i) => (
                        <div key={i} style={{ 
                            borderRadius: '16px', 
                            border: '1px solid #f1f5f9', 
                            overflow: 'hidden',
                            background: openIndex === i ? '#fff' : '#f8fafc'
                        }}>
                            <button 
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                style={{ 
                                    width: '100%', 
                                    padding: '20px 24px', 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left'
                                }}
                            >
                                <span style={{ fontSize: '15px', fontWeight: 800, color: openIndex === i ? '#5b51d8' : '#1e293b' }}>{f.question}</span>
                                {openIndex === i ? <ChevronUp size={20} color="#5b51d8" /> : <ChevronDown size={20} color="#64748b" />}
                            </button>
                            {openIndex === i && (
                                <div style={{ 
                                    padding: '0 24px 24px 24px', 
                                    fontSize: '14px', 
                                    color: '#64748b', 
                                    lineHeight: 1.8,
                                    borderTop: '1px solid #f1f5f9',
                                    paddingTop: '16px'
                                }}>
                                    {f.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Ask a Question CTA */}
            <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #1e1b4b, #5b51d8)', color: '#fff', alignItems: 'center', textAlign: 'center' }}>
                <MessageSquare size={40} color="rgba(255,255,255,0.4)" />
                <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '8px' }}>Have more questions?</h3>
                    <p style={{ opacity: 0.8, fontSize: '14px', maxWidth: '500px' }}>Our experts and community members are here to help you with your specific queries about admissions, placements, and campus life.</p>
                </div>
                <button style={{ 
                    padding: '12px 32px', 
                    background: '#fff', 
                    color: '#5b51d8', 
                    border: 'none', 
                    borderRadius: '12px', 
                    fontWeight: 900, 
                    fontSize: '14px',
                    cursor: 'pointer'
                }}>
                    Ask a Question
                </button>
            </div>
        </div>
    );
};

export default QA;
