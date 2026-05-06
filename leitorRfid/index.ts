import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import axios from 'axios';


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
    await axios.post('http://localhost:3333/rfid/check-in', {
      tagId: uid,
      timestamp: new Date()
    });
  } catch (error: any) {
    console.error('❌ Falha na integração:', error.message);
  }
});
