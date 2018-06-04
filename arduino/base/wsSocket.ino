#include <SPI.h>
#include <Ethernet.h>
#include <ArduinoHttpClient.h>

// byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
// char server[] = "webmathias-com-br.umbler.net";
char server[] = "192.168.1.118";
// char server[] = "echo.websocket.org";
int port = 8080;
char path[] = "/api/sensor/ws/LIGHT001";
EthernetClient eth;

int count = 0;
byte mac[] = { 0xA4, 0x28, 0x72, 0xCA, 0x55, 0x2F };
byte ip[] = { 192, 168, 1, 125 };
byte gateway[] = { 192, 168, 1, 1 };
byte subnet[] = { 255, 255, 255, 0 };
WebSocketClient client = WebSocketClient(eth, server, port);
void setup()
{
  Serial.begin(9600);
  if(Ethernet.begin(mac)){
    Serial.println("Ethernet ON");
  }else{
    Serial.println("Ethernet OFF");
  }
 
}

void loop()
{

  Serial.println("starting WebSocket client");
  client.begin(path);

  while (client.connected()) {
    Serial.print("Sending hello ");
    Serial.println(count);

    // send a hello #
    client.beginMessage(TYPE_TEXT);
    // client.print("hello ");
    client.print(count);
    client.endMessage();

    // increment count for next message
    count++;

    // check if a message is available to be received
    int messageSize = client.parseMessage();

    if (messageSize > 0) {
      Serial.println("Received a message:");
      Serial.println(client.readString());
    }

    // wait 5 seconds
    delay(5000);
  }

  Serial.println("disconnected");
}
