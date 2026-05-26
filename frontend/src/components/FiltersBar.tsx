import React from 'react';
import { Search } from 'lucide-react';

export const FiltersBar: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ position: 'relative', flex: 2 }}>
          <Search size={16} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Buscar por MTP, lote grande, fazenda, local..." 
            className="input-control"
            style={{ width: '100%', paddingLeft: '2.25rem' }}
          />
        </div>
        <select className="input-control" style={{ flex: 1, appearance: 'auto' }}>
          <option value="">Local</option>
        </select>
        <select className="input-control" style={{ flex: 1, appearance: 'auto' }}>
          <option value="">Variedade</option>
        </select>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <select className="input-control" style={{ flex: 1, appearance: 'auto' }}>
          <option value="">Processo</option>
        </select>
        <select className="input-control" style={{ flex: 1, appearance: 'auto' }}>
          <option value="">Colheita</option>
        </select>
        <select className="input-control" style={{ flex: 1, appearance: 'auto' }}>
          <option value="">Secagem</option>
        </select>
      </div>
    </div>
  );
};
