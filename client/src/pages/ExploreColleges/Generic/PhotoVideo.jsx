import React from 'react';
import { Image, Video, Play, Maximize2 } from 'lucide-react';

const PhotoVideo = ({ collegeData }) => {
    const photos = collegeData?.photos || [
        'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1523050853064-dbad320b7f4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    const videos = collegeData?.videos || [];

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
            {/* Photos Grid */}
            <div style={cardStyle}>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Image size={24} color="#5b51d8" />
                    Campus Gallery
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    {photos.map((src, i) => (
                        <div key={i} style={{ 
                            position: 'relative', 
                            borderRadius: '16px', 
                            overflow: 'hidden', 
                            aspectRatio: '1',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                        }}>
                            <img src={src} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                            <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.8)', padding: '6px', borderRadius: '50%' }}>
                                <Maximize2 size={14} color="#1e293b" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Videos Section */}
            <div style={cardStyle}>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Video size={24} color="#ef4444" />
                    Virtual Tours & Events
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {videos.length > 0 ? videos.map((v, i) => (
                        <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
                             <iframe 
                                title={`Video ${i}`} 
                                width="100%" 
                                height="250" 
                                src={v.includes('youtube.com') ? v.replace('watch?v=', 'embed/') : v} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    )) : (
                        <div style={{ 
                            gridColumn: '1 / -1', 
                            padding: '48px', 
                            textAlign: 'center', 
                            background: '#f8fafc', 
                            borderRadius: '16px', 
                            border: '1px dashed #cbd5e1' 
                        }}>
                            <div style={{ marginBottom: '12px' }}><Play size={40} color="#94a3b8" strokeWidth={1.5} style={{ margin: '0 auto' }} /></div>
                            <div style={{ fontWeight: 800, color: '#64748b' }}>Video Tours Coming Soon</div>
                            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>We are currently curating the best virtual experiences for this campus.</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotoVideo;
