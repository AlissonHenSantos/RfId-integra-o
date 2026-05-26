import React from 'react';
import { Search, Bell } from 'lucide-react';

export const TopHeader: React.FC = () => {
  return (
    <header style={{
      height: '70px',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
    }}>
      <div style={{ position: 'relative', width: '300px' }}>
        <Search size={18} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          type="text" 
          placeholder="Buscar..." 
          className="input-control"
          style={{ width: '100%', paddingLeft: '2.5rem', borderRadius: '20px', border: '1px solid var(--border)', backgroundColor: '#f8fafc' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={24} color="var(--text-dark)" />
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            backgroundColor: 'var(--danger)',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 700,
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
          }}>3</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
          <div style={{ 
            width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#fff'
          }}>
            U
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-dark)' }}>Usuário Admin</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>Administrador</div>
          </div>
        </div>
      </div>
    </header>
  );
};
