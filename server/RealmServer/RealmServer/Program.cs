using System;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace RealmServer
{
    public class GameplayService : WebSocketBehavior
    {
        protected override void OnMessage(MessageEventArgs e)
        {
            Send("echo: " + e.Data);
        }
        protected override void OnError(ErrorEventArgs e)
        {
            Console.WriteLine(e.Message);
        }

    }

    public class Program
    {
        public static void Main(string[] args)
        {
            var server = new WebSocketServer(3000);
            server.AddWebSocketService<GameplayService>("/game");
            server.Start();
            Console.WriteLine("Server listening on 3000");
            Console.ReadKey(true);
            server.Stop();
        }
    }
}
