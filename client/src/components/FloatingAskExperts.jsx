import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const FloatingAskExperts = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '40px',
      right: '40px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px'
    }}>
      {/* Icon Circle */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: '1px solid #f1f5f9'
        }}
      >
        <MessageSquare size={24} color="#5b51d8" />
      </motion.div>

      {/* Main Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: '14px 28px',
          borderRadius: '100px',
          border: 'none',
          background: 'linear-gradient(135deg, #5b51d8, #38bdf8)',
          color: '#fff',
          boxShadow: '0 10px 30px rgba(91, 81, 216, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontWeight: 800,
          fontSize: '15px'
        }}
      >
        Ask Experts
      </motion.button>
    </div>
  );
};

export default FloatingAskExperts;
