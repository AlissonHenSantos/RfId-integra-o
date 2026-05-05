import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

fastify.post('/rfid/check-in', async (request, reply) => {
  const { tagId } = request.body as { tagId: string };

  if (!tagId) {
    return reply.status(400).send({ error: 'Missing tagId' });
  }

  const log = await prisma.accessLog.create({
    data: { tagId }
  });

  return { 
    status: 'success', 
    received: tagId,
    db_id: log.id 
  };
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
