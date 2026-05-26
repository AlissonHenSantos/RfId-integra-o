import React, { useState, useEffect } from 'react';
import { SacaStatus, type Saca } from '../services/api';
import { X } from 'lucide-react';

interface SacaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Saca> & { tagId: string }) => Promise<void>;
  sacaToEdit?: Saca | null;
  scannedTagId?: string | null;
}

export const SacaModal: React.FC<SacaModalProps> = ({ isOpen, onClose, onSubmit, sacaToEdit, scannedTagId }) => {
  const [loading, setLoading] = useState(false);

  // New Fields based on prototype
  const [localCode, setLocalCode] = useState('');
  const [localDesc, setLocalDesc] = useState('');
  const [fazenda, setFazenda] = useState('');
  const [processoCode, setProcessoCode] = useState('');
  const [processoDesc, setProcessoDesc] = useState('');
  const [colheitaCode, setColheitaCode] = useState('');
  const [colheitaDesc, setColheitaDesc] = useState('');
  const [secagemCode, setSecagemCode] = useState('');
  const [secagemDesc, setSecagemDesc] = useState('');
  const [numero, setNumero] = useState('');
  const [lavador, setLavador] = useState(true);
  const [descascado, setDescascado] = useState(false);

  useEffect(() => {
    if (sacaToEdit) {
      setLocalDesc(sacaToEdit.local || '');
      setFazenda(sacaToEdit.fazenda || '');
      setProcessoDesc(sacaToEdit.processo || '');
      setColheitaDesc(sacaToEdit.colheita || '');
      setSecagemDesc(sacaToEdit.secagem || '');
      setNumero(sacaToEdit.numero ? sacaToEdit.numero.toString() : '');
      setLavador(sacaToEdit.lav);
      setDescascado(sacaToEdit.des);
      
      // Attempt to infer codes from descriptions
      if (sacaToEdit.local?.includes('Igr2.13')) setLocalCode('Igr2.13');
      if (sacaToEdit.local?.includes('Igr2.14')) setLocalCode('Igr2.14');
      if (sacaToEdit.processo?.includes('Espontânea')) setProcessoCode('8');
      if (sacaToEdit.processo?.includes('Volcanic')) setProcessoCode('9');
      if (sacaToEdit.colheita?.includes('Manual')) setColheitaCode('1');
      if (sacaToEdit.colheita?.includes('Mecanizada')) setColheitaCode('2');
      if (sacaToEdit.secagem?.includes('Camas')) setSecagemCode('2');
      if (sacaToEdit.secagem?.includes('Pátio')) setSecagemCode('3');
    } else {
      setLocalCode('');
      setLocalDesc('');
      setFazenda('');
      setProcessoCode('');
      setProcessoDesc('');
      setColheitaCode('');
      setColheitaDesc('');
      setSecagemCode('');
      setSecagemDesc('');
      setNumero('');
      setLavador(true);
      setDescascado(false);
    }
  }, [sacaToEdit, isOpen]);

  const handleSelectLocal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'igr213') {
      setLocalCode('Igr2.13'); setLocalDesc('Igrejinha II - Catucaí 2SL');
    } else if (val === 'igr214') {
      setLocalCode('Igr2.14'); setLocalDesc('Igrejinha II (Arara)');
    } else {
      setLocalCode(''); setLocalDesc('');
    }
  };

  const handleSelectProcesso = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '8') {
      setProcessoCode('8'); setProcessoDesc('Fermentação Espontânea / Aérobica');
    } else if (val === '9') {
      setProcessoCode('9'); setProcessoDesc('Vulcão / Volcanic Fermentation');
    } else {
      setProcessoCode(''); setProcessoDesc('');
    }
  };

  const handleSelectColheita = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '1') {
      setColheitaCode('1'); setColheitaDesc('Manual');
    } else if (val === '2') {
      setColheitaCode('2'); setColheitaDesc('Mecanizada');
    } else {
      setColheitaCode(''); setColheitaDesc('');
    }
  };

  const handleSelectSecagem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '2') {
      setSecagemCode('2'); setSecagemDesc('Seco em Camas Suspensas');
    } else if (val === '3') {
      setSecagemCode('3'); setSecagemDesc('Seco no Pátio + CoolSeed');
    } else {
      setSecagemCode(''); setSecagemDesc('');
    }
  };

  const generatedMTP = [
    localCode || '0',
    processoCode || '0',
    colheitaCode || '0',
    lavador ? '1' : '0',
    descascado ? '1' : '0',
    secagemCode || '0',
    numero || '0'
  ].join('.');

  const isValid = localCode && fazenda && processoCode && colheitaCode && secagemCode && numero;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    try {
      // Prioritize scannedTagId -> sacaToEdit.tagId -> Math.random() fallback
      const finalTagId = scannedTagId || sacaToEdit?.tagId || Math.random().toString(16).substring(2, 10).toUpperCase();
      
      await onSubmit({ 
        tagId: finalTagId, 
        status: sacaToEdit?.status || SacaStatus.RECEBIDA,
        codigo: generatedMTP,
        fazenda,
        local: localCode ? `${localCode} - ${localDesc}` : localDesc,
        processo: processoDesc,
        variedade: localDesc,
        colheita: colheitaDesc,
        lav: lavador,
        des: descascado,
        secagem: secagemDesc,
        numero: numero ? parseInt(numero) : undefined,
      });
      onClose();
    } catch (err) {
      alert('Erro ao salvar os dados.');
    } finally {
      setLoading(false);
    }
  };

  const labelStyle: React.CSSProperties = { fontSize: '0.8rem', fontWeight: 600, color: '#4a5568', marginBottom: '0.25rem' };
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', color: '#1e293b', outline: 'none', backgroundColor: '#fff' };
  const radioContainer: React.CSSProperties = { display: 'flex', gap: '1rem', alignItems: 'center', height: '38px' };
  const radioLabel: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: '#334155', cursor: 'pointer' };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      
      <div style={{ 
        width: '100%', maxWidth: '620px', backgroundColor: '#ffffff',
        border: '4px solid #7d5a44', borderRadius: '4px', padding: '1.5rem',
        position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        
        <button type="button" onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '1.5rem', fontFamily: 'inherit' }}>
          {sacaToEdit ? 'Editar Amostra' : 'Nova Amostra'}
        </h2>

        {scannedTagId && (
          <div style={{ backgroundColor: '#eff6ff', borderLeft: '4px solid #3b82f6', padding: '0.75rem', marginBottom: '1.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1rem' }}>📍</span>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#1e3a8a', fontWeight: 600 }}>TAG RFID LIDA PELO SCANNER</div>
              <div style={{ fontSize: '1rem', color: '#1e40af', fontWeight: 'bold', fontFamily: 'monospace' }}>{scannedTagId}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Local *</label>
              <select style={inputStyle} onChange={handleSelectLocal} required value={localCode === 'Igr2.13' ? 'igr213' : localCode === 'Igr2.14' ? 'igr214' : ''}>
                <option value="">Selecione...</option>
                <option value="igr213">Igr2.13 - Igrejinha II (Catucaí 2SL)</option>
                <option value="igr214">Igr2.14 - Igrejinha II (Arara)</option>
              </select>
              {localDesc && <span style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>Selecionado: {localDesc}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Fazenda *</label>
              <input required style={inputStyle} value={fazenda} onChange={(e) => setFazenda(e.target.value)} placeholder="Ex: IGR" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Processo *</label>
              <select style={inputStyle} onChange={handleSelectProcesso} required value={processoCode}>
                <option value="">Selecione...</option>
                <option value="8">Fermentação Espontânea / Aérobica</option>
                <option value="9">Vulcão / Volcanic Fermentation</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Colheita *</label>
              <select style={inputStyle} onChange={handleSelectColheita} required value={colheitaCode}>
                <option value="">Selecione...</option>
                <option value="1">Manual</option>
                <option value="2">Mecanizada</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Secagem *</label>
              <select style={inputStyle} onChange={handleSelectSecagem} required value={secagemCode}>
                <option value="">Selecione...</option>
                <option value="2">Seco em Camas Suspensas</option>
                <option value="3">Seco no Pátio + CoolSeed</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>N° Lote *</label>
              <input required type="number" style={inputStyle} value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Ex: 2" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Lavador *</label>
              <div style={radioContainer}>
                <label style={radioLabel}>
                  <input type="radio" name="lavador" checked={lavador} onChange={() => setLavador(true)} style={{ accentColor: '#a855f7', width: '16px', height: '16px' }} /> Sim
                </label>
                <label style={radioLabel}>
                  <input type="radio" name="lavador" checked={!lavador} onChange={() => setLavador(false)} style={{ accentColor: '#a855f7', width: '16px', height: '16px' }} /> Não
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Descascado *</label>
              <div style={radioContainer}>
                <label style={radioLabel}>
                  <input type="radio" name="descascado" checked={descascado} onChange={() => setDescascado(true)} style={{ accentColor: '#a855f7', width: '16px', height: '16px' }} /> Sim
                </label>
                <label style={radioLabel}>
                  <input type="radio" name="descascado" checked={!descascado} onChange={() => setDescascado(false)} style={{ accentColor: '#a855f7', width: '16px', height: '16px' }} /> Não
                </label>
              </div>
            </div>
          </div>

          {/* MTP CODE PREVIEW */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Código MTP Gerado</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Baseado no código: {localCode || '...'}</span>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', textAlign: 'center', fontWeight: 700, fontSize: '1.15rem', letterSpacing: '1px', color: '#0f172a' }}>
              {generatedMTP}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.5rem' }}>
              Formato: Local.Processo.Colheita.Lavador.Descascado.Secagem.Lote
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" onClick={onClose} style={{ padding: '0.5rem 1.25rem', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#fff', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>
              Cancelar
            </button>
            <button type="submit" disabled={!isValid || loading} style={{ padding: '0.5rem 1.25rem', border: 'none', borderRadius: '6px', backgroundColor: isValid ? '#2563eb' : '#94a3b8', color: '#fff', fontWeight: 600, cursor: isValid ? 'pointer' : 'not-allowed', transition: 'background-color 0.2s' }}>
              {loading ? 'Processando...' : 'Criar Amostra'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
