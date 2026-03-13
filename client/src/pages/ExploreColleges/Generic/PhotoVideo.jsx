import React from 'react';
import { Image as ImageIcon, Video as VideoIcon, Play, Maximize2 } from 'lucide-react';

const PhotoVideo = ({ collegeData }) => {
    const photos = collegeData?.photos || [];
    const videos = collegeData?.videos || [];

    const cardStyle = {
        background: '#fff',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Photos Section */}
            <div style={cardStyle}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ImageIcon size={22} color="#5b51d8" />
                    Campus Gallery
                </h3>
                {photos.length > 0 ? (
                    <div style={gridStyle}>
                        {photos.map((src, i) => (
                            <div key={i} style={{ 
                                position: 'relative', 
                                borderRadius: '16px', 
                                overflow: 'hidden', 
                                aspectRatio: '4/3',
                                cursor: 'pointer',
                                border: '1px solid #f1f5f9'
                            }}>
                                <img src={src} alt={`Campus ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.8)', padding: '6px', borderRadius: '50%' }}>
                                    <Maximize2 size={14} color="#1e293b" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ padding: '60px 40px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '16px', marginTop: '20px', border: '1px dashed #e2e8f0' }}>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: '#334155', marginBottom: '8px' }}>Images Coming Soon</div>
                        <p style={{ fontSize: '14px', margin: 0 }}>We are currently updating the campus gallery for {collegeData?.name || 'this college'}.</p>
                    </div>
                )}
            </div>

            {/* Videos Section */}
            <div style={cardStyle}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <VideoIcon size={22} color="#ef4444" />
                    Videos & Tours
                </h3>
                {videos.length > 0 ? (
                    <div style={{ ...gridStyle, gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
                        {videos.map((v, i) => (
                            <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
                                <iframe 
                                    title={`Video ${i}`} 
                                    width="100%" 
                                    height="240" 
                                    src={v.includes('youtube.com') ? v.replace('watch?v=', 'embed/').split('&')[0] : v.includes('youtu.be') ? `https://www.youtube.com/embed/${v.split('/').pop()}` : v} 
                                    frameBorder="0" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ padding: '60px 40px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '16px', marginTop: '20px', border: '1px dashed #e2e8f0' }}>
                        <Play size={40} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                        <div style={{ fontSize: '16px', fontWeight: 800, color: '#334155', marginBottom: '8px' }}>Video Tours Coming Soon</div>
                        <p style={{ fontSize: '14px', margin: 0 }}>Official campus walkthroughs and student testimonials are being processed.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoVideo;
