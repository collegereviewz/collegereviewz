import React, { useState, useEffect } from 'react';
import { getCollegeLogo, guessDomainByName } from '../utils/logoUtils';

const CollegeLogo = ({ collegeName, style, fallbackInitialBackground = '#5b51d8' }) => {
    const [logoUrl, setLogoUrl] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setHasError(false);
        setIsLoading(true);

        const fetchLogo = async () => {
            if (!collegeName) {
                if (isMounted) setIsLoading(false);
                return;
            }

            try {
                // 1. Check if we have a hardcoded official fast logo
                const hardcodedLogo = getCollegeLogo(null, collegeName);
                if (hardcodedLogo) {
                    if (isMounted) {
                        setLogoUrl(hardcodedLogo);
                        setIsLoading(false);
                    }
                    return;
                }

                // 2. Try the asynchronous Clearbit Autocomplete API
                const q = encodeURIComponent(collegeName.replace(/,.*$/, '').trim()); // Clean out trailing commas/cities for better matching
                const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${q}`);
                
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0 && data[0].logo) {
                        if (isMounted) {
                            setLogoUrl(data[0].logo);
                            setIsLoading(false);
                        }
                        return;
                    }
                }

                // 3. Try to guess the domain from our mappings if Clearbit failed
                const guessedDomain = guessDomainByName(collegeName);
                if (guessedDomain) {
                    const domainLogoUrl = getCollegeLogo(guessedDomain, null);
                    if (domainLogoUrl) {
                        if (isMounted) {
                            setLogoUrl(domainLogoUrl);
                            setIsLoading(false);
                        }
                        return;
                    }
                }

                // If all fails, rely on the fallback error avatar (UI-Avatars)
                if (isMounted) {
                    setHasError(true);
                    setIsLoading(false);
                }

            } catch (err) {
                console.error("Logo fetch error for", collegeName, err);
                if (isMounted) {
                    setHasError(true);
                    setIsLoading(false);
                }
            }
        };

        fetchLogo();

        return () => { isMounted = false; };
    }, [collegeName]);

    // Format a nice dynamic avatar based on the college initials (e.g. SRM for SRM Institute)
    const getInitials = (name) => {
        if (!name) return 'C';
        const words = name.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(w => w.length > 0);
        if (words.length >= 2) return `${words[0][0]}${words[1][0]}`.toUpperCase();
        if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
        return 'C';
    };

    const initials = getInitials(collegeName);
    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${fallbackInitialBackground.replace('#', '')}&color=fff&size=128&font-size=0.4&bold=true`;

    return (
        <img 
            src={hasError || !logoUrl ? fallbackAvatar : logoUrl} 
            alt={`${collegeName || 'College'} Logo`}
            style={{
                objectFit: 'contain', 
                backgroundColor: '#fff', 
                opacity: isLoading ? 0.5 : 1,
                transition: 'opacity 0.3s ease',
                ...style 
            }}
            onError={(e) => {
                if (!hasError) {
                    setHasError(true);
                    e.target.src = fallbackAvatar;
                }
            }}
        />
    );
};

export default CollegeLogo;
