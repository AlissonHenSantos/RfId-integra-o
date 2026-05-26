import React from 'react';
import { SacaStatus } from '../services/api';

const statusConfig = {
  [SacaStatus.RECEBIDA]: { 
    bg: 'rgba(59, 130, 246, 0.15)', 
    color: 'var(--status-recebida)', 
    border: 'rgba(59, 130, 246, 0.3)', 
    label: 'Recebida' 
  },
  [SacaStatus.ARMAZENADA]: { 
    bg: 'rgba(245, 158, 11, 0.15)', 
    color: 'var(--status-armazenada)', 
    border: 'rgba(245, 158, 11, 0.3)', 
    label: 'Armazenada' 
  },
  [SacaStatus.EM_TORRA]: { 
    bg: 'rgba(239, 68, 68, 0.15)', 
    color: 'var(--status-em-torra)', 
    border: 'rgba(239, 68, 68, 0.3)', 
    label: 'Em Torra' 
  },
  [SacaStatus.EXPEDIDA]: { 
    bg: 'rgba(16, 185, 129, 0.15)', 
    color: 'var(--status-expedida)', 
    border: 'rgba(16, 185, 129, 0.3)', 
    label: 'Expedida' 
  },
};

export const StatusBadge: React.FC<{ status: SacaStatus }> = ({ status }) => {
  const config = statusConfig[status];
  
  if (!config) return null;

  return (
    <span style={{
      backgroundColor: config.bg,
      color: config.color,
      border: `1px solid ${config.border}`,
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px'
    }}>
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: config.color,
        boxShadow: `0 0 8px ${config.color}`
      }} />
      {config.label}
    </span>
  );
};
