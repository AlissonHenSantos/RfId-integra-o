import React, { useState } from 'react';
import { type Saca } from '../services/api';
import { ChevronRight, ChevronDown, Trash2, Check, X } from 'lucide-react';

interface SacaTableProps {
  sacas: Saca[];
  onDelete?: (id: number) => void;
}

export const SacaTable: React.FC<SacaTableProps> = ({ sacas, onDelete }) => {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRow = (id: number) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Using real data from Saca directly now

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>CÓDIGO</th>
            <th>FAZ.</th>
            <th>LOCAL</th>
            <th>PROCESSO</th>
            <th>VARIEDADE</th>
            <th>COLHEITA</th>
            <th>LAV</th>
            <th>DES</th>
            <th>SECAGEM</th>
            <th>N°</th>
            <th>LOTE GRANDE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sacas.map((saca) => {
            const isExpanded = !!expandedRows[saca.id];

            return (
              <React.Fragment key={saca.id}>
                {/* Expandable Header Row */}
                <tr style={{ cursor: 'pointer', backgroundColor: '#fff', borderBottom: isExpanded ? 'none' : '1px solid var(--border)' }} onClick={() => toggleRow(saca.id)}>
                  <td colSpan={11} style={{ padding: '0.75rem 1rem', color: 'var(--primary)', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {isExpanded ? <ChevronDown size={16} color="var(--text-gray)" /> : <ChevronRight size={16} color="var(--text-gray)" />}
                      <span style={{ fontSize: '0.75rem' }}>{saca.loteGrande || 'S/ Lote Grande'}</span>
                      <span style={{ marginLeft: '1rem', color: 'var(--text-gray)', fontWeight: 400, fontSize: '0.75rem' }}>
                        {saca.miniLotesCount} mini-lote{saca.miniLotesCount !== 1 && 's'} vinculado{saca.miniLotesCount !== 1 && 's'}
                      </span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', padding: '0.75rem 1rem' }}>
                    <button className="btn-danger" onClick={(e) => { e.stopPropagation(); onDelete && onDelete(saca.id); }}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>

                {/* Expanded Details Row */}
                {isExpanded && (
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <td style={{ color: 'var(--primary)', fontWeight: 600 }}>{saca.codigo || '-'}</td>
                    <td>{saca.fazenda || '-'}</td>
                    <td>{saca.local || '-'}</td>
                    <td>{saca.processo || '-'}</td>
                    <td>{saca.variedade || '-'}</td>
                    <td>{saca.colheita || '-'}</td>
                    <td>{saca.lav ? <Check size={16} color="var(--success)" /> : <X size={16} color="var(--danger)" />}</td>
                    <td>{saca.des ? <Check size={16} color="var(--success)" /> : <X size={16} color="var(--danger)" />}</td>
                    <td>{saca.secagem || '-'}</td>
                    <td>{saca.numero || '-'}</td>
                    <td style={{ color: 'var(--primary)', fontWeight: 600 }}>{saca.loteGrande || '-'}</td>
                    <td></td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
