import React from 'react';
import { 
  Coffee, 
  Map, 
  Settings, 
  Droplets, 
  Sun, 
  Users, 
  Ship, 
  UserCircle,
  Tractor
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--bg-sidebar)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid rgba(255,255,255,0.05)',
      height: '100vh',
    }}>
      <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #a78bfa, #f472b6)', 
          borderRadius: '50%', 
          padding: '4px',
          display: 'flex'
        }}>
          <Coffee size={24} color="#fff" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Coffee Trace</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Sistema de Rastreabilidade</span>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <a href="#" style={{ 
          display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1.5rem', 
          backgroundColor: 'var(--primary)', color: '#fff', textDecoration: 'none',
          borderTopRightRadius: '20px', borderBottomRightRadius: '20px', marginRight: '1rem'
        }}>
          <Map size={18} />
          <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>Rastreabilidade</span>
        </a>
      
      </nav>

      <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ 
          width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600
        }}>
          U
        </div>
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Usuário Admin</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Administrador</div>
        </div>
      </div>
    </aside>
  );
};

const MenuItem: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <a href="#" style={{ 
    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1.5rem', 
    color: '#cbd5e1', textDecoration: 'none', transition: 'background-color 0.2s'
  }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
     onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
    {icon}
    <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{label}</span>
  </a>
);
