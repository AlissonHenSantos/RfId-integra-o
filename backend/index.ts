import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

fastify.register(cors, { 
  origin: true 
});

export enum SacaStatus {
  RECEBIDA = 'RECEBIDA',
  ARMAZENADA = 'ARMAZENADA',
  EM_TORRA = 'EM_TORRA',
  EXPEDIDA = 'EXPEDIDA'
}

fastify.post('/rfid/check-in', async (request, reply) => {
  const { tagId } = request.body as { tagId: string };

  if (!tagId) {
    return reply.status(400).send({ error: 'Missing tagId' });
  }

  let saca = await prisma.saca.findUnique({ where: { tagId } });

  if (!saca) {
    saca = await prisma.saca.create({
      data: { tagId, status: SacaStatus.RECEBIDA }
    });
  }

  const log = await prisma.accessLog.create({
    data: { tagId }
  });

  return { 
    status: 'success', 
    message: 'Check-in processado com sucesso',
    saca,
    log_id: log.id 
  };
});

// Endpoint GET facilitado para o ESP8266
fastify.get('/rfid/check-in/:tagId', async (request, reply) => {
  const { tagId } = request.params as { tagId: string };

  if (!tagId) {
    return reply.status(400).send({ error: 'Missing tagId' });
  }

  let saca = await prisma.saca.findUnique({ where: { tagId } });

  if (!saca) {
    saca = await prisma.saca.create({
      data: { tagId, status: SacaStatus.RECEBIDA }
    });
  }

  const log = await prisma.accessLog.create({
    data: { tagId }
  });

  return { 
    status: 'success', 
    message: 'Check-in processado com sucesso (via GET)',
    saca,
    log_id: log.id 
  };
});


fastify.post('/sacas', async (request, reply) => {
  const data = request.body as any;

  if (!data.tagId) {
    return reply.status(400).send({ error: 'O campo tagId é obrigatório' });
  }

  const sacaStatus = data.status && Object.values(SacaStatus).includes(data.status) ? data.status : SacaStatus.RECEBIDA;

  try {
    const saca = await prisma.saca.create({
      data: { 
        // @ts-ignore - Forçando a IDE a ignorar o cache temporário
        tagId: data.tagId, 
        peso: data.peso, 
        status: sacaStatus,
        codigo: data.codigo,
        fazenda: data.fazenda,
        local: data.local,
        processo: data.processo,
        variedade: data.variedade,
        colheita: data.colheita,
        lav: data.lav,
        des: data.des,
        secagem: data.secagem,
        numero: data.numero,
        loteGrande: data.loteGrande,
        miniLotesCount: data.miniLotesCount
      }
    });
    return reply.status(201).send(saca);
  } catch (error) {
    return reply.status(400).send({ error: 'Falha ao cadastrar saca, verifique se a tag já está em uso.' });
  }
});


fastify.get('/sacas', async (request, reply) => {
  const sacas = await prisma.saca.findMany();
  return { sacas };
});


fastify.get('/sacas/:tagId', async (request, reply) => {
  const { tagId } = request.params as { tagId: string };
  
  const saca = await prisma.saca.findUnique({
    where: { tagId },
    include: { logs: true } 
  });

  if (!saca) {
    return reply.status(404).send({ error: 'Saca não encontrada' });
  }

  return saca;
});


fastify.patch('/sacas/:tagId/status', async (request, reply) => {
  const { tagId } = request.params as { tagId: string };
  const { status } = request.body as { status: SacaStatus };

  if (!Object.values(SacaStatus).includes(status)) {
    return reply.status(400).send({ error: 'Status inválido' });
  }

  try {
    const sacaAtualizada = await prisma.saca.update({
      where: { tagId },
      data: { status }
    });
    return sacaAtualizada;
  } catch (error) {
    return reply.status(404).send({ error: 'Saca não encontrada' });
  }
});

fastify.delete('/sacas/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  
  try {
    const sacaId = parseInt(id, 10);
    // Delete access logs first due to foreign key constraints if any
    const saca = await prisma.saca.findUnique({ where: { id: sacaId } });
    if (saca) {
      await prisma.accessLog.deleteMany({ where: { tagId: saca.tagId } });
    }

    await prisma.saca.delete({
      where: { id: sacaId }
    });
    
    return reply.status(204).send();
  } catch (error) {
    return reply.status(400).send({ error: 'Falha ao deletar saca.' });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3333 });
    console.log('🚀 Backend de teste rodando em http://localhost:3333');
  } catch (err) {
    process.exit(1);
  }
};

start();
