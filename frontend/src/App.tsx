import React, { useEffect, useState } from 'react';
import { api, type Saca } from './services/api';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { FiltersBar } from './components/FiltersBar';
import { SacaTable } from './components/SacaTable';
import { SacaModal } from './components/SacaModal';
import { Plus, Scan } from 'lucide-react';

function App() {
  const [sacas, setSacas] = useState<Saca[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scannedTagId, setScannedTagId] = useState<string | null>(null);

  const fetchSacas = async () => {
    try {
      setLoading(true);
      const data = await api.getSacas();
      setSacas(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSacas();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover este lote?')) {
      try {
        await api.deleteSaca(id);
        setSacas(prev => prev.filter(s => s.id !== id));
      } catch (error) {
        console.error('Failed to delete', error);
        alert('Erro ao deletar lote.');
      }
    }
  };

  const handleCreateSaca = async (data: any) => {
    try {
      await api.createSaca(data);
      fetchSacas(); // Reload to get fresh data
    } catch (error) {
      console.error('Failed to create saca', error);
      throw error;
    }
  };

  const handleCheckIn = async (tagId: string) => {
    try {
      await api.checkIn(tagId);
      fetchSacas();
    } catch (error) {
      console.error('Failed to check in', error);
      throw error;
    }
  };

  const handleSimulateScan = () => {
    const tag = window.prompt("Simulando Leitor RFID via USB:\n\nCole ou digite a TAG lida (ex: AABBCCDD):");
    if (tag && tag.trim() !== "") {
      setScannedTagId(tag.trim().toUpperCase());
      setIsModalOpen(true);
    }
  };

  const handleOpenManual = () => {
    setScannedTagId(null);
    setIsModalOpen(true);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      
      <main className="main-content">
        <TopHeader />

        <div className="page-container">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.25rem' }}>
                Rastreabilidade do Café
              </h1>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                {sacas.length} registros encontrados <span style={{ color: 'var(--text-light)' }}>(5 lotes grandes, 1 mini-lotes)</span>
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-success" onClick={handleSimulateScan} style={{ backgroundColor: '#10b981' }}>
                <Scan size={16} />
                Simular Escaneamento RFID
              </button>
              <button className="btn btn-primary" onClick={handleOpenManual}>
                <Plus size={16} />
                Nova Amostra
              </button>
            </div>
          </header>

          <FiltersBar />

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
              Carregando registros...
            </div>
          ) : (
            <SacaTable sacas={sacas} onDelete={handleDelete} />
          )}
        </div>
      </main>
      
      <SacaModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSaca}
        scannedTagId={scannedTagId}
      />
    </div>
  );
}

export default App;
