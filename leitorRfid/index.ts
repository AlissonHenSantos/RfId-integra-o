import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import axios from 'axios';

// Configuração da porta (Verifique o caminho: COM3, /dev/ttyUSB0, etc.)
const port = new SerialPort({
  path: 'COM6', 
  baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', async (data: string) => {
  const uid = data.replace('UID:', '').trim();
  
  if (!uid) return;

  console.log(`📡 Tag Detectada: ${uid}`);

  try {
    // Envio para o seu backend Prisma/Node
    await axios.post('http://localhost:3333/rfid/check-in', {
      tagId: uid,
      timestamp: new Date()
    });
  } catch (error: any) {
    console.error('❌ Falha na integração:', error.message);
  }
});
