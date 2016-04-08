using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace AngularDemo
{
    [HubName("messageHub")]
    public class MessageHub : Hub
    {
        public void GetAllMessageHub()
        {
            Clients.All.getMessageHub("hello");
        }
    }
}