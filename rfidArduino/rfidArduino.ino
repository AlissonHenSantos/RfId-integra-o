#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9

MFRC522 rfid(SS_PIN, RST_PIN);

void setup() 
{
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();

  Serial.println("Aproxime o RFID...");
}

void loop() 
{
  // Verifica se há cartão presente
  if (!rfid.PICC_IsNewCardPresent()) 
  {
    return;
  }

  // Lê o cartão
  if (!rfid.PICC_ReadCardSerial()) 
  {
    return;
  }

  // Mostra UID no Serial Monitor
  Serial.print("UID da tag: ");

  for (byte i = 0; i < rfid.uid.size; i++) 
  {
    if (rfid.uid.uidByte[i] < 0x10)
    {
      Serial.print("0");
    }

    Serial.print(rfid.uid.uidByte[i], HEX);
    Serial.print(" ");
  }

  Serial.println();

  // Finaliza leitura
  rfid.PICC_HaltA();
}
