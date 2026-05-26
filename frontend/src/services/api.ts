export const SacaStatus = {
  RECEBIDA: 'RECEBIDA',
  ARMAZENADA: 'ARMAZENADA',
  EM_TORRA: 'EM_TORRA',
  EXPEDIDA: 'EXPEDIDA',
} as const;

export type SacaStatus = typeof SacaStatus[keyof typeof SacaStatus];

export interface AccessLog {
  id: number;
  tagId: string;
  createdAt: string;
}

export interface Saca {
  id: number;
  tagId: string;
  peso: number | null;
  status: SacaStatus;
  codigo?: string | null;
  fazenda?: string | null;
  local?: string | null;
  processo?: string | null;
  variedade?: string | null;
  colheita?: string | null;
  lav: boolean;
  des: boolean;
  secagem?: string | null;
  numero?: number | null;
  loteGrande?: string | null;
  miniLotesCount: number;
  createdAt: string;
  updatedAt: string;
  logs?: AccessLog[];
}

const API_URL = '/api';

export const api = {
  getSacas: async (): Promise<Saca[]> => {
    const response = await fetch(`${API_URL}/sacas`);
    if (!response.ok) throw new Error('Falha ao buscar sacas');
    const data = await response.json();
    return data.sacas;
  },

  getSacaById: async (tagId: string): Promise<Saca> => {
    const response = await fetch(`${API_URL}/sacas/${tagId}`);
    if (!response.ok) throw new Error('Saca não encontrada');
    return response.json();
  },

  createSaca: async (data: Partial<Saca> & { tagId: string }): Promise<Saca> => {
    const response = await fetch(`${API_URL}/sacas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Falha ao criar saca');
    return response.json();
  },

  updateStatus: async (tagId: string, status: SacaStatus): Promise<Saca> => {
    const response = await fetch(`${API_URL}/sacas/${tagId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Falha ao atualizar status');
    return response.json();
  },

  checkIn: async (tagId: string): Promise<{ status: string; message: string; saca: Saca }> => {
    const response = await fetch(`${API_URL}/rfid/check-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tagId }),
    });
    if (!response.ok) throw new Error('Falha no check-in');
    return response.json();
  },

  deleteSaca: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/sacas/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Falha ao deletar saca');
  }
};
