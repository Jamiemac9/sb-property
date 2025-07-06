
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Phone, Mail, Clock, MapPin, Send, Bot, User, Calculator, FileText, Truck, Recycle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  isQuickReply?: boolean;
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
      content: "Hello! I'm here to help with your property clearance needs. What can I assist you with today?",
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    propertyType: "",
    serviceType: "",
    timeframe: "",
    accessDetails: "",
    additionalInfo: ""
  });
  const { toast } = useToast();

  const businessPhone = "07946495782";
  const whatsappNumber = "447946495782";
  const businessEmail = "sbpropertyclearance@gmail.com";

  const quickResponses = [
    { text: "Get a free quote", action: "quote" },
    { text: "House clearance pricing", action: "pricing" },
    { text: "Business hours", action: "hours" },
    { text: "Emergency clearance", action: "emergency" },
    { text: "Coverage area", action: "coverage" },
    { text: "Call us now", action: "call" },
    { text: "WhatsApp chat", action: "whatsapp" },
    { text: "Email us", action: "email" }
  ];

  const propertyTypes = [
    { value: "house", label: "House" },
    { value: "flat", label: "Flat/Apartment" },
    { value: "bungalow", label: "Bungalow" },
    { value: "office", label: "Office" },
    { value: "shop", label: "Shop/Retail" },
    { value: "warehouse", label: "Warehouse" },
    { value: "garden", label: "Garden/Outdoor" },
    { value: "other", label: "Other" }
  ];

  const serviceTypes = [
    { value: "full-house-clearance", label: "Full House Clearance" },
    { value: "office-clearance", label: "Office & Commercial Clearance" },
    { value: "garden-waste", label: "Garden & Green Waste" },
    { value: "builders-waste", label: "Builder's & DIY Waste" },
    { value: "single-item", label: "Single Item & Bulky Waste" },
    { value: "weee-electrical", label: "WEEE & Electricals" },
    { value: "partial-clearance", label: "Partial Property Clearance" },
    { value: "end-of-tenancy", label: "End of Tenancy Clean" },
    { value: "other", label: "Other" }
  ];

  const timeframes = [
    { value: "asap", label: "As soon as possible" },
    { value: "this-week", label: "This week" },
    { value: "next-week", label: "Next week" },
    { value: "within-month", label: "Within a month" },
    { value: "flexible", label: "I'm flexible" }
  ];

  const addMessage = (content: string, type: 'bot' | 'user', isQuickReply?: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      isQuickReply
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickResponse = (action: string, text: string) => {
    addMessage(text, 'user', true);
    simulateTyping();
    
    setTimeout(() => {
      switch (action) {
        case "quote":
          setShowQuoteForm(true);
          addMessage("Great! I'll help you get a free quote. Please fill out the form below with your details, and I'll send it directly to our team via WhatsApp.", 'bot');
          break;
        case "pricing":
          addMessage("Our pricing depends on several factors including property size, amount of items, and location. Here's a rough guide:\n\n• Single room: £150-£300\n• Full house: £400-£1,200\n• Commercial spaces: £200-£800\n\nFor an accurate quote, please use our quote form - it's completely free and no obligation!", 'bot');
          break;
        case "hours":
          addMessage("Our business hours are:\n\n📅 Monday-Saturday: 8 AM - 6 PM\n📅 Sunday: By appointment only\n\nWe offer emergency clearance services 24/7 for urgent situations.", 'bot');
          break;
        case "emergency":
          addMessage("We provide 24/7 emergency clearance services for urgent situations like:\n\n• Flooding or water damage\n• Fire damage cleanup\n• Urgent property sales\n• Landlord emergencies\n\nCall us immediately at 07946 495782 for emergency service.", 'bot');
          break;
        case "coverage":
          addMessage("We serve Stafford and surrounding areas within a 25-mile radius, including:\n\n• Stafford town center\n• Stone\n• Eccleshall\n• Rugeley\n• Cannock\n• Lichfield\n• Uttoxeter\n\nNot sure if we cover your area? Just ask!", 'bot');
          break;
        case "call":
          handleCallDirect();
          break;
        case "whatsapp":
          handleWhatsAppDirect();
          break;
        case "email":
          handleEmailDirect();
          break;
        default:
          addMessage("I can help you with property clearance services. What would you like to know more about?", 'bot');
      }
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    addMessage(currentMessage, 'user');
    setCurrentMessage("");
    simulateTyping();
    
    // Simple AI-like responses
    setTimeout(() => {
      const lowerMessage = currentMessage.toLowerCase();
      if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
        addMessage("I'd be happy to help you get a quote! The best way is to fill out our quote form which includes all the details we need. Would you like me to open it for you?", 'bot');
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('phone')) {
        addMessage("You can reach us at:\n\n📞 Phone: 07946 495782\n💬 WhatsApp: Same number\n📧 Email: sbpropertyclearance@gmail.com\n\nWe're available Mon-Sat 8 AM - 6 PM, Sunday by appointment.", 'bot');
      } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
        addMessage("For emergency clearance services, please call us immediately at 07946 495782. We offer 24/7 emergency response for urgent situations.", 'bot');
      } else {
        addMessage("Thanks for your message! I can help you with property clearance services, quotes, pricing, and contact information. What would you like to know more about?", 'bot');
      }
    }, 1000);
  };

  const handleCallDirect = () => {
    window.location.href = `tel:${businessPhone}`;
    toast({
      title: "Calling SB Property Clearance",
      description: "Initiating call to our team...",
    });
  };

  const handleWhatsAppDirect = () => {
    const message = "Hello! I found your website and would like to discuss property clearance services.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Opening WhatsApp",
      description: "Connecting you directly with our team...",
    });
  };

  const handleEmailDirect = () => {
    const subject = "Property Clearance Inquiry";
    const body = "Hello,\n\nI found your website and would like to discuss property clearance services.\n\nBest regards";
    const mailtoUrl = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    
    toast({
      title: "Opening Email",
      description: "Your email client will open with our details...",
    });
  };

  const handleQuoteFormSubmit = () => {
    if (!quoteFormData.name || !quoteFormData.phone || !quoteFormData.address || !quoteFormData.propertyType || !quoteFormData.serviceType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (marked with *).",
        variant: "destructive",
      });
      return;
    }

    // Send via WhatsApp with comprehensive form details
    const message = `🏠 *Website Quote Request*

*Contact Details:*
Name: ${quoteFormData.name}
Email: ${quoteFormData.email || 'Not provided'}
Phone: ${quoteFormData.phone}
Address: ${quoteFormData.address}

*Service Details:*
Property Type: ${propertyTypes.find(p => p.value === quoteFormData.propertyType)?.label || quoteFormData.propertyType}
Service Needed: ${serviceTypes.find(s => s.value === quoteFormData.serviceType)?.label || quoteFormData.serviceType}
Timeframe: ${timeframes.find(t => t.value === quoteFormData.timeframe)?.label || quoteFormData.timeframe || 'Not specified'}

*Additional Information:*
Access Details: ${quoteFormData.accessDetails || 'None provided'}
Additional Info: ${quoteFormData.additionalInfo || 'None provided'}

*Submitted via:* Website Chat
*Time:* ${new Date().toLocaleString('en-GB')}

Please provide a detailed quote for this customer.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Quote Request Sent!",
      description: "Your request has been sent via WhatsApp to our team.",
    });

    // Reset form and add confirmation message
    setQuoteFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      propertyType: "",
      serviceType: "",
      timeframe: "",
      accessDetails: "",
      additionalInfo: ""
    });
    setShowQuoteForm(false);
    addMessage("Perfect! Your quote request has been sent to our team via WhatsApp. We'll get back to you within 24 hours with a detailed quote.", 'bot');
  };

  const defaultTrigger = (
    <Button 
      className="fixed bottom-6 right-6 bg-brand-green text-white shadow-lg hover:bg-brand-green-light z-50 rounded-full w-16 h-16"
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-brand-green" />
            Chat with SB Property Clearance
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col min-h-0">
          {!showQuoteForm ? (
            <>
              {/* Chat Messages */}
              <ScrollArea className="flex-1 pr-4 mb-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user' 
                          ? 'bg-brand-green text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <div className="flex items-start gap-2">
                          {message.type === 'bot' && <Bot size={16} className="mt-1 text-brand-green" />}
                          {message.type === 'user' && <User size={16} className="mt-1" />}
                          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center gap-2">
                          <Bot size={16} className="text-brand-green" />
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Response Buttons */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {quickResponses.map((response, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-brand-green hover:text-white transition-colors"
                      onClick={() => handleQuickResponse(response.action, response.text)}
                    >
                      {response.text}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                  className="bg-brand-green hover:bg-brand-green-light"
                >
                  <Send size={16} />
                </Button>
              </div>

              {/* Quick Contact Options */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>Mon-Sat: 8 AM - 6 PM</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleCallDirect}>
                      <Phone size={14} className="mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleWhatsAppDirect}>
                      <MessageCircle size={14} className="mr-1" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Quote Form */
            <div className="flex-1 overflow-y-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator size={20} className="text-brand-green" />
                    Get Your FREE Quote
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Full Name *</label>
                      <Input
                        placeholder="John Smith"
                        value={quoteFormData.name}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone Number *</label>
                      <Input
                        placeholder="07123 456789"
                        value={quoteFormData.phone}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Email Address</label>
                    <Input
                      placeholder="john@example.com"
                      type="email"
                      value={quoteFormData.email}
                      onChange={(e) => setQuoteFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Property Address *</label>
                    <Input
                      placeholder="123 Main Street, Stafford, ST17 4AH"
                      value={quoteFormData.address}
                      onChange={(e) => setQuoteFormData(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Property Type *</label>
                      <Select onValueChange={(value) => setQuoteFormData(prev => ({ ...prev, propertyType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Service Needed *</label>
                      <Select onValueChange={(value) => setQuoteFormData(prev => ({ ...prev, serviceType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">When do you need this done?</label>
                    <Select onValueChange={(value) => setQuoteFormData(prev => ({ ...prev, timeframe: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeframes.map((time) => (
                          <SelectItem key={time.value} value={time.value}>
                            {time.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Access Details</label>
                    <Textarea
                      placeholder="e.g., Parking available, narrow stairs, ground floor access..."
                      value={quoteFormData.accessDetails}
                      onChange={(e) => setQuoteFormData(prev => ({ ...prev, accessDetails: e.target.value }))}
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Additional Information</label>
                    <Textarea
                      placeholder="Any other details about the clearance..."
                      value={quoteFormData.additionalInfo}
                      onChange={(e) => setQuoteFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowQuoteForm(false)}
                      className="flex-1"
                    >
                      Back to Chat
                    </Button>
                    <Button 
                      onClick={handleQuoteFormSubmit}
                      className="flex-1 bg-brand-green hover:bg-brand-green-light"
                    >
                      Send Quote Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
