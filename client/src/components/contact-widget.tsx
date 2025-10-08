import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Phone, MessageCircle, Mail, Clock, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactWidgetProps {
  trigger?: React.ReactNode;
}

export default function ContactWidget({ trigger }: ContactWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    urgency: "normal"
  });
  const { toast } = useToast();

  const businessPhone = "+447708152348";
  const whatsappNumber = "447708152348";
  const businessEmail = "info@sbpropertyclearance.co.uk";

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

  const handleFormSubmit = () => {
    if (!contactForm.name || !contactForm.message) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and message.",
        variant: "destructive",
      });
      return;
    }

    // Send via WhatsApp with form details
    const urgencyEmoji = contactForm.urgency === "urgent" ? "🚨 URGENT" : "📝";
    const message = `${urgencyEmoji} *Website Contact Form*

*Customer Details:*
Name: ${contactForm.name}
Phone: ${contactForm.phone || 'Not provided'}
Email: ${contactForm.email || 'Not provided'}

*Message:*
${contactForm.message}

*Urgency:* ${contactForm.urgency}
*Submitted:* ${new Date().toLocaleString('en-GB')}

Please respond to this customer inquiry promptly.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Message Sent",
      description: "Your message has been sent via WhatsApp to our team.",
    });

    // Reset form
    setContactForm({
      name: "",
      phone: "",
      email: "",
      message: "",
      urgency: "normal"
    });
    setIsOpen(false);
  };

  const defaultTrigger = (
    <Button 
      className="fixed bottom-6 left-6 bg-blue-600 text-white shadow-lg hover:bg-blue-700 z-50"
      size="sm"
    >
      <Phone size={16} className="mr-2" />
      Contact Us
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-brand-green" />
            Contact SB Property Clearance
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Contact Options */}
          <div className="grid gap-3">
            <h3 className="font-semibold text-gray-900">Quick Contact</h3>

            <Button 
              onClick={handleCallDirect}
              className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
            >
              <Phone size={16} className="mr-3" />
              Call Now: {businessPhone}
            </Button>

            <Button 
              onClick={handleWhatsAppDirect}
              className="w-full justify-start bg-green-500 hover:bg-green-600 text-white"
            >
              <MessageCircle size={16} className="mr-3" />
              WhatsApp Chat
            </Button>

            <Button 
              onClick={handleEmailDirect}
              variant="outline"
              className="w-full justify-start"
            >
              <Mail size={16} className="mr-3" />
              Send Email
            </Button>
          </div>

          {/* Business Hours */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p>Mon-Sat: 8 AM - 6 PM</p>
                  <p>Sunday: By appointment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Send Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Your name *"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Phone number"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <Input
                placeholder="Email address"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">Urgency Level</label>
                <select 
                  value={contactForm.urgency}
                  onChange={(e) => setContactForm(prev => ({ ...prev, urgency: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="normal">Normal Inquiry</option>
                  <option value="urgent">Urgent Request</option>
                  <option value="emergency">Emergency Service</option>
                </select>
              </div>

              <Textarea
                placeholder="Tell us about your property clearance needs... *"
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
              />

              <Button 
                onClick={handleFormSubmit}
                className="w-full bg-brand-green text-white hover:bg-brand-green-light"
              >
                <Send size={16} className="mr-2" />
                Send Message via WhatsApp
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Your message will be sent directly to our WhatsApp business account for immediate attention.
              </p>
            </CardContent>
          </Card>

          {/* Service Area */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} />
            <span>Serving Stafford & surrounding areas (25 mile radius)</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}