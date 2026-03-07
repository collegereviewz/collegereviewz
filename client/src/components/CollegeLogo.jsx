import React from 'react';
import { getCollegeLogo } from '../utils/logoUtils';

const CollegeLogo = ({ collegeName, style }) => {
    // Attempt to guess domain if it was available in a more complex app, 
    // but for now we'll use the name helper which has major mappings.
    const logoUrl = getCollegeLogo(null, collegeName);

    // Fallback if no logo found
    if (!logoUrl) {
        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f1f5f9',
                color: '#64748b',
                fontWeight: 800,
                fontSize: '12px'
            }}>
                {collegeName ? collegeName.substring(0, 2).toUpperCase() : 'C'}
            </div>
        );
    }

    return (
        <img
            src={logoUrl}
            alt={`${collegeName} logo`}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                ...style
            }}
            onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<div style="width:100%; height:100%; display:flex; alignItems:center; justifyContent:center; background:#f1f5f9; color:#64748b; fontWeight:800; fontSize:12px">${collegeName ? collegeName.substring(0, 2).toUpperCase() : 'C'}</div>`;
            }}
        />
    );
};

export default CollegeLogo;
