
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, User } from 'lucide-react';

const Messages = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const [conversations] = useState([
    {
      id: '1',
      participantName: 'Alice Cooper',
      participantId: 'user-1',
      lastMessage: 'Is the apartment still available?',
      lastMessageTime: '2 hours ago',
      unreadCount: 2
    },
    {
      id: '2',
      participantName: 'Bob Wilson',
      participantId: 'user-2',
      lastMessage: 'Thank you for the quick response!',
      lastMessageTime: '1 day ago',
      unreadCount: 0
    }
  ]);

  const [messages] = useState([
    {
      id: '1',
      senderId: 'user-1',
      senderName: 'Alice Cooper',
      content: 'Hi! I saw your property listing and I\'m very interested.',
      createdAt: '10:30 AM'
    },
    {
      id: '2',
      senderId: user?.id || '',
      senderName: user?.name || '',
      content: 'Hello! Yes, the property is still available. Would you like to schedule a viewing?',
      createdAt: '10:35 AM'
    },
    {
      id: '3',
      senderId: 'user-1',
      senderName: 'Alice Cooper',
      content: 'That would be great! When would be a good time?',
      createdAt: '10:40 AM'
    }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Simulate sending message
      setNewMessage('');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-12">
          <p>Please log in to view your messages.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Communicate with property owners and renters</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedConversation === conversation.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {conversation.participantName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm">
                            {conversation.participantName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {conversation.lastMessageTime}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2">
            {selectedConversation ? (
              <>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>
                      {conversations.find(c => c.id === selectedConversation)?.participantName}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col h-[500px]">
                  <ScrollArea className="flex-1 mb-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.senderId === user.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.senderId === user.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.senderId === user.id
                                  ? 'text-blue-100'
                                  : 'text-gray-500'
                              }`}
                            >
                              {message.createdAt}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-[500px]">
                <p className="text-gray-500">Select a conversation to start chatting</p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
