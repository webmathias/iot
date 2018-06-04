/**
 *  Created by Mathias H. Weber 16-04-2018
 * 
 * Esta aplicação tem como objetivo conectar a um WebSocket para
 * mandar informações como um sensor (comentado no código) e 
 * receber o valor de vindo do websocket (como um controle ou sensor)
 * e ativar os leds conforme o valor recebido * 
 * 
 * Para testar a interação desta aplicação, depois de iniciar o 
 * programa no arduino basta acessar a URL:
 * http://webmathias-com-br.umbler.net/api/sensor?name=TESTE1&value=5
 * Nesta URL contem dois parametros que pode ser alterados,
 *   - name: Nome do sensor a ser monitorado ou alterado, 
 * apenas lembre-se de alterar no código para manter a consistência
 *   - value: O valor que desejá que o arduino receba
 * 
 * Testado em Arduino UNO + EthernetShield
 * 
 */ 
#include <SPI.h>
#include <Ethernet.h>
#include <ArduinoHttpClient.h>

// Endereço do WebSocket
char server[] = "webmathias-com-br.umbler.net";
int port = 80;
char path[] = "/api/sensor/wsstatus?sensors=[\"TESTE1\"]&live=1";

// Variavel para controlar o EthernetShield
EthernetClient eth;

// Varivaveis para definir MAC da placa de rede
byte mac[] = {0xA4, 0x28, 0x72, 0xCA, 0x55, 0x2F};
// Varivaveis caso queira iniciar a placa em modo ip fixo
// byte ip[] = {192, 168, 1, 125};
// byte gateway[] = {192, 168, 1, 1};
// byte subnet[] = {255, 255, 255, 0};

// Iniciando intancia para conectar no WebSocket
WebSocketClient client = WebSocketClient(eth, server, port);

// Definição dos LED que serão acesos conforme valor vindo do WebSocket
int leds[] = {2, 3, 4, 5, 6, 7, 8, 9, 10, 11};
void setup()
{
  Serial.begin(9600);
  // Iniciar Ethernet em modo DHCP
  if (Ethernet.begin(mac))
  {
    Serial.println("Ethernet ON");
  }
  else
  {
    Serial.println("Ethernet OFF");
  }
  // Define todos os pinos de LED como saida para poder ligar quando vir o valor do WebSocket
  for (int i = 0; i < 10; i++)
  {
    pinMode(leds[i], OUTPUT);
  }
}

void loop()
{

  Serial.println("starting WebSocket client");
  // Conecta no webSocket
  client.begin(path);
  while (client.connected())
  {
    // Se acaso precisa mandar informações de um sensor para o servidor usa este processo 
    // client.beginMessage(TYPE_TEXT);
    // client.print(count);
    // client.endMessage();
 
    // Pega uma informação na fila da placa de rede vindo do websocket
    int messageSize = client.parseMessage();
    if (messageSize > 0)
    {
      Serial.println("Received a message:");
      String data = client.readString();
      // Converte para inteiro
      float value = data.toFloat();
      Serial.println(data);
      // Validação por causa do vetor de leds
      if (value < 0)
      {
        value = 0;
      }
      if (value > 9)
      {
        value = 9;
      }
      // FOR para poder ligar os leds conforme valor recebido
      for (int i = 0; i < 10; i++)
      {
        if (i < value)
        {
          Serial.println(String(leds[i]) + " - ON");
          digitalWrite(leds[i], HIGH);
        }
        else
        {
          Serial.println(String(leds[i]) + " - OFF");
          digitalWrite(leds[i], LOW);
        }
      }
    }
    // wait 5 seconds
    delay(500);
  }
  delay(1000);
  Serial.println("disconnected");
}
