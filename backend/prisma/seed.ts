import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando população do banco de dados...');

  // Limpando dados antigos para evitar duplicação (Unique constraint nas tags)
  await prisma.accessLog.deleteMany();
  await prisma.saca.deleteMany();

  console.log('🧹 Dados antigos removidos.');

  const sacasToCreate = [
    { tagId: '04 22 AB 1F', peso: 60.5, status: 'RECEBIDA', codigo: 'Igr2.13.9.1.0.1.6.3', fazenda: 'IGR 2. 13 (3)', local: 'Igrejinha II Igr2.13', processo: 'Vulcão / Volcanic Fermentation', variedade: 'Catucaí 2S...', colheita: 'Manual', lav: true, des: false, secagem: 'Seco no Pátio + CoolSeed', numero: 3, loteGrande: 'LOTE-GRANDE-001', miniLotesCount: 1 },
    { tagId: 'A1 B2 C3 D4', peso: 58.2, status: 'ARMAZENADA', codigo: 'Igr2.13.9.1.0.1.6.4', fazenda: 'IGR 2. 13 (4)', local: 'Igrejinha II Igr2.13', processo: 'Vulcão / Volcanic Fermentation', variedade: 'Catucaí 2S...', colheita: 'Manual', lav: false, des: false, secagem: 'Seco no Pátio + CoolSeed', numero: 4, loteGrande: 'LOTE-GRANDE-002', miniLotesCount: 0 },
    { tagId: '11 22 33 44', peso: 61.0, status: 'EM_TORRA', codigo: 'Igr2.13.9.1.0.1.6.5', fazenda: 'IGR 2. 13 (5)', local: 'Igrejinha II Igr2.13', processo: 'Vulcão / Volcanic Fermentation', variedade: 'Catucaí 2S...', colheita: 'Manual', lav: false, des: false, secagem: 'Seco no Pátio + CoolSeed', numero: 5, loteGrande: 'LOTE-GRANDE-003', miniLotesCount: 0 },
    { tagId: 'FF EE DD CC', peso: 59.8, status: 'EXPEDIDA', codigo: 'Igr2.13.9.1.0.1.6.6', fazenda: 'IGR 2. 13 (6)', local: 'Igrejinha II Igr2.13', processo: 'Vulcão / Volcanic Fermentation', variedade: 'Catucaí 2S...', colheita: 'Manual', lav: false, des: false, secagem: 'Seco no Pátio + CoolSeed', numero: 6, loteGrande: 'LOTE-GRANDE-004', miniLotesCount: 0 },
    { tagId: '99 88 77 66', peso: null, status: 'RECEBIDA', codigo: 'Igr2.13.9.1.0.1.6.7', fazenda: 'IGR 2. 13 (7)', local: 'Igrejinha II Igr2.13', processo: 'Vulcão / Volcanic Fermentation', variedade: 'Catucaí 2S...', colheita: 'Manual', lav: false, des: false, secagem: 'Seco no Pátio + CoolSeed', numero: 7, loteGrande: 'LOTE-GRANDE-005', miniLotesCount: 0 },
    { tagId: 'AA BB CC DD', peso: 60.0, status: 'ARMAZENADA', codigo: 'Igr2.13.9.1.0.1.6.8', fazenda: 'IGR 2. 13 (8)', local: 'Igrejinha II Igr2.13', processo: 'Vulcão / Volcanic Fermentation', variedade: 'Catucaí 2S...', colheita: 'Manual', lav: false, des: false, secagem: 'Seco no Pátio + CoolSeed', numero: 8, loteGrande: 'LOTE-GRANDE-006', miniLotesCount: 0 },
    { tagId: '12 34 56 78', peso: 59.5, status: 'EM_TORRA', codigo: 'Igr2.13.9.1.0.1.6.9', fazenda: 'IGR 2. 13 (9)', local: 'Igrejinha II Igr2.13', processo: 'Vulcão / Volcanic Fermentation', variedade: 'Catucaí 2S...', colheita: 'Manual', lav: false, des: false, secagem: 'Seco no Pátio + CoolSeed', numero: 9, loteGrande: 'LOTE-GRANDE-007', miniLotesCount: 0 },
  ];

  for (const saca of sacasToCreate) {
    const createdSaca = await prisma.saca.create({
      data: saca
    });

    // Simulando que elas passaram pelo leitor (gerando logs de acesso)
    await prisma.accessLog.create({
      data: { tagId: createdSaca.tagId }
    });
  }

  console.log(`✅ Banco de dados populado com ${sacasToCreate.length} sacas de café.`);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao popular banco:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
