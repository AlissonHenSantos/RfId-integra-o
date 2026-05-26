import React from 'react';
import type { Saca } from '../services/api';
import { StatusBadge } from './StatusBadge';
import { Coffee, Scale, Clock, Settings2 } from 'lucide-react';

interface SacaCardProps {
  saca: Saca;
  onUpdateStatus?: (saca: Saca) => void;
}

export const SacaCard: React.FC<SacaCardProps> = ({ saca, onUpdateStatus }) => {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative accent based on status could be added, but standard styling works well */}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', fontSize: '1.25rem' }}>
            <Coffee size={20} color="var(--accent)" />
            {saca.tagId.length > 12 ? `${saca.tagId.substring(0, 12)}...` : saca.tagId}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>ID: #{saca.id}</p>
        </div>
        <StatusBadge status={saca.status} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.4rem', borderRadius: '8px' }}>
            <Scale size={16} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Peso</span>
            <span style={{ fontWeight: 500 }}>{saca.peso ? `${saca.peso} kg` : '--'}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.4rem', borderRadius: '8px' }}>
            <Clock size={16} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Última Atualização</span>
            <span style={{ fontWeight: 500 }}>{new Date(saca.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
        {onUpdateStatus && (
          <button 
            className="btn-icon" 
            title="Atualizar Status"
            onClick={() => onUpdateStatus(saca)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <Settings2 size={16} />
            Gerenciar
          </button>
        )}
      </div>
    </div>
  );
};
