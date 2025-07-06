import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle, Send, Phone, Clock, User, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  trigger?: React.ReactNode;
}

export default function Chatbot({ trigger }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm here to help with your property clearance needs. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isCollectingInfo, setIsCollectingInfo] = useState(false);
  const { toast } = useToast();

  const quickResponses = [
    "Get a free quote",
    "House clearance services", 
    "Business hours",
    "Emergency clearance",
    "Pricing information",
    "Coverage area"
  ];

  const botResponses: Record<string, string> = {
    "hello": "Hello! Welcome to SB Property Clearance. How can I help you today?",
    "quote": "I'd be happy to help you get a quote! Let me gather some basic information first.",
    "house clearance": "We provide full house clearance services including furniture removal, waste disposal, and property cleaning. Would you like a quote?",
    "business hours": "We're open Monday to Saturday, 8 AM to 6 PM. Sunday appointments available on request. Need immediate assistance?",
    "emergency": "We offer same-day emergency clearance services. Let me connect you directly with our team via WhatsApp for urgent requests.",
    "pricing": "Our pricing depends on property size and items to clear. We offer free, no-obligation quotes. Shall I help you request one?",
    "coverage": "We cover Stafford and surrounding areas within 25 miles. Where is your property located?",
    "default": "I understand you need help with property clearance. Let me connect you with our expert team who can provide detailed assistance."
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('quote') || message.includes('price') || message.includes('cost')) {
      return botResponses.quote;
    } else if (message.includes('house') || message.includes('clearance') || message.includes('removal')) {
      return botResponses["house clearance"];
    } else if (message.includes('hour') || message.includes('open') || message.includes('time')) {
      return botResponses["business hours"];
    } else if (message.includes('emergency') || message.includes('urgent') || message.includes('asap')) {
      return botResponses.emergency;
    } else if (message.includes('area') || message.includes('cover') || message.includes('location')) {
      return botResponses.coverage;
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return botResponses.hello;
    } else {
      return botResponses.default;
    }
  };

  const sendToWhatsApp = (conversationSummary: string) => {
    const phoneNumber = "447753226214";
    
    const message = `🤖 *New Chat Inquiry from Website*

*Customer Details:*
Name: ${customerName || 'Not provided'}
Phone: ${customerPhone || 'Not provided'}

*Conversation Summary:*
${conversationSummary}

*Next Steps:*
Please respond to this customer inquiry and provide personalized assistance.

*Generated:* ${new Date().toLocaleString('en-GB')}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Connecting to WhatsApp",
      description: "Opening WhatsApp to connect you with our team...",
    });
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    const botResponse = generateBotResponse(currentMessage);
    
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);

      // After 3 messages, suggest WhatsApp connection
      if (messages.length >= 4) {
        setTimeout(() => {
          const connectMessage: Message = {
            id: (Date.now() + 2).toString(),
            type: 'bot',
            content: "For more detailed assistance, I can connect you directly with our property clearance experts via WhatsApp. Would you like me to do that?",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, connectMessage]);
          setIsCollectingInfo(true);
        }, 1500);
      }
    }, 1000);

    setCurrentMessage("");
  };

  const handleQuickResponse = (response: string) => {
    setCurrentMessage(response);
    handleSendMessage();
  };

  const handleConnectToWhatsApp = () => {
    const conversationSummary = messages
      .filter(m => m.type === 'user')
      .map(m => `• ${m.content}`)
      .join('\n');
    
    sendToWhatsApp(conversationSummary);
  };

  const defaultTrigger = (
    <Button 
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-brand-green text-white shadow-lg hover:bg-brand-green-light z-50"
      size="sm"
    >
      <MessageCircle size={24} />
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-brand-green" />
            SB Property Clearance Chat
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-brand-green text-white'
                      : 'bg-white text-gray-800 border'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'bot' && <Bot size={16} className="mt-1 text-brand-green" />}
                    {message.type === 'user' && <User size={16} className="mt-1" />}
                    <div>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Responses */}
          <div className="py-3">
            <div className="flex flex-wrap gap-2">
              {quickResponses.map((response) => (
                <Button
                  key={response}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickResponse(response)}
                  className="text-xs"
                >
                  {response}
                </Button>
              ))}
            </div>
          </div>

          {/* Customer Info Collection */}
          {isCollectingInfo && (
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Connect via WhatsApp</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Your name (optional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <Input
                  placeholder="Your phone number (optional)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
                <Button 
                  onClick={handleConnectToWhatsApp}
                  className="w-full bg-brand-green text-white hover:bg-brand-green-light"
                >
                  <Phone size={16} className="mr-2" />
                  Connect via WhatsApp
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!currentMessage.trim()}
              className="bg-brand-green text-white hover:bg-brand-green-light"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}