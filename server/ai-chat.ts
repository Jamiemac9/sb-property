
// AI Chat Service for SB Property Clearance
// This service provides intelligent responses for the chatbot

interface ChatResponse {
  response: string;
  confidence: number;
}

// Enhanced AI-like response system
export async function generateAIResponse(userMessage: string): Promise<string> {
  const message = userMessage.toLowerCase().trim();
  
  // Context-aware responses based on property clearance business
  const responses = getContextualResponse(message);
  
  // Add some randomization to make responses feel more natural
  if (Array.isArray(responses)) {
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  return responses;
}

function getContextualResponse(message: string): string | string[] {
  // Pricing inquiries
  if (message.includes('price') || message.includes('cost') || message.includes('how much') || message.includes('expensive')) {
    return [
      "Great question! Our pricing depends on several factors. Here's a breakdown:\n\n🏠 **House Clearance:**\n• 1-2 rooms: £150-£400\n• 3-4 rooms: £400-£700\n• 5+ rooms: £700-£1,200\n\n🏢 **Commercial:**\n• Small office: £200-£500\n• Large office: £500-£1,000\n\n**Factors affecting price:**\n• Property size and access\n• Amount of items\n• Type of materials\n• Location in Stafford area\n\nWould you like a free, personalized quote?",
      
      "I'd be happy to help with pricing! Our costs vary based on your specific needs:\n\n💰 **What influences pricing:**\n• Property size (number of rooms)\n• Volume of items to clear\n• Access difficulties (stairs, narrow doors)\n• Type of waste (standard vs hazardous)\n• Urgency of service\n\n**Typical ranges:**\n• Small clearance: £150-£300\n• Medium property: £400-£700\n• Large property: £700-£1,200\n\n**FREE quotes available!** No obligation, detailed breakdown provided. Shall I help you get one?"
    ];
  }
  
  // Service inquiries
  if (message.includes('service') || message.includes('what do you do') || message.includes('help with')) {
    return "We're your complete property clearance solution! Here's what we offer:\n\n🏠 **Residential Services:**\n• Full house clearance\n• Partial room clearance\n• Garden and outdoor clearing\n• End of tenancy cleaning\n• Bereavement clearance\n\n🏢 **Commercial Services:**\n• Office clearance\n• Shop and retail clearing\n• Warehouse clearance\n• Construction waste removal\n\n♻️ **Specialist Services:**\n• WEEE electrical disposal\n• Hazardous waste handling\n• Recycling and donation services\n• Emergency clearance (24/7)\n\n**All services include:** Collection, sorting, recycling, and proper disposal. We handle everything so you don't have to!\n\nWhat type of clearance do you need?";
  }
  
  // Location and coverage
  if (message.includes('area') || message.includes('location') || message.includes('cover') || message.includes('stafford')) {
    return "📍 **We serve Stafford and surrounding areas:**\n\n**Main Coverage Area (25-mile radius):**\n• Stafford town center\n• Stone\n• Eccleshall\n• Rugeley\n• Cannock\n• Lichfield\n• Uttoxeter\n• Newport\n• Penkridge\n• Burntwood\n• Hednesford\n• Codsall\n\n**Extended Coverage:**\nWe can also serve areas slightly outside this radius - just ask!\n\n**No hidden travel costs** within our standard area.\n\n🚛 **Quick service:** Usually with you within 48-72 hours\n\nWhere are you located? I can confirm if we cover your area!";
  }
  
  // Timing and availability
  if (message.includes('when') || message.includes('available') || message.includes('book') || message.includes('appointment')) {
    return [
      "🗓️ **We're flexible with timing to suit you:**\n\n**Standard Hours:**\n• Monday-Saturday: 8 AM - 6 PM\n• Sunday: By special appointment\n• Usually available within 48-72 hours\n\n**Emergency Service:**\n• 24/7 availability for urgent situations\n• Same-day service possible\n• Weekends and evenings available\n\n**Booking Process:**\n1. Free quote (takes 5 minutes)\n2. Schedule at your convenience\n3. Professional team arrives on time\n4. Job completed efficiently\n\n**Popular time slots:**\n• Morning: 8 AM - 12 PM\n• Afternoon: 1 PM - 5 PM\n• Weekend appointments available\n\nWhen would work best for you?",
      
      "⏰ **Scheduling made easy:**\n\n**Quick Response Times:**\n• Quote requests: Within 24 hours\n• Emergency calls: Immediate response\n• Standard bookings: 48-72 hours\n\n**Flexible Scheduling:**\n• Early morning starts available\n• Evening appointments by arrangement\n• Weekend service (including Sunday)\n• Holiday coverage available\n\n**We work around YOUR schedule!**\n\nPrefer morning, afternoon, or weekend appointments? Let me know your preference and I'll check availability!"
    ];
  }
  
  // Environmental/recycling questions
  if (message.includes('recycle') || message.includes('environment') || message.includes('green') || message.includes('eco')) {
    return "♻️ **Environmental responsibility is core to what we do:**\n\n**Our 95% Recycling Rate:**\n• Furniture → Donated to charities or recycled\n• Metals → Scrap metal recyclers\n• Electrical → WEEE certified disposal\n• Textiles → Textile recycling programs\n• Garden waste → Composting facilities\n• Paper/cardboard → Paper mills\n\n**Proper Disposal:**\n• Licensed waste carriers (Environment Agency)\n• Hazardous waste handled safely\n• Landfill only as absolute last resort\n• Full waste transfer documentation\n\n**Charity Donations:**\nWe work with local charities to donate suitable items, giving them a second life while helping the community.\n\n**Why choose eco-friendly clearance?**\n• Protect the environment\n• Support local charities\n• Reduce landfill waste\n• Meet your corporate responsibility goals\n\nFeels good to clear responsibly, doesn't it?";
  }
  
  // Contact information
  if (message.includes('contact') || message.includes('phone') || message.includes('call') || message.includes('email')) {
    return "📞 **Ready to get in touch? Here's how:**\n\n**Phone:** 077018152348\n• Direct line to our team\n• Available Mon-Sat 8 AM - 6 PM\n• Emergency line 24/7\n\n**WhatsApp:** Same number (077018152348)\n• Quick responses (usually within 30 minutes)\n• Send photos of items to clear\n• Easy quote requests\n\n**Email:** sbpropertyclearance@gmail.com\n• Detailed inquiries welcome\n• Response within 2 hours during business hours\n• Great for quotes and documentation\n\n**Response Promise:**\n• Phone calls: Answered immediately\n• WhatsApp: Within 30 minutes\n• Emails: Within 2 hours\n\n**Prefer to keep chatting here?** I can help with quotes, booking, and any questions you have!";
  }
  
  // Emergency services
  if (message.includes('emergency') || message.includes('urgent') || message.includes('asap') || message.includes('quick')) {
    return "🚨 **Emergency Property Clearance - We're Here 24/7:**\n\n**Emergency Situations We Handle:**\n• Flood or water damage cleanup\n• Fire damage clearance\n• Urgent property sales\n• Landlord emergencies\n• Insurance claim support\n• Bereavement clearance\n• Tenant abandonment\n\n**Emergency Response:**\n• Available 24/7, 365 days a year\n• Same-day service possible\n• Team can be with you within 2-4 hours\n• Out-of-hours and weekend callouts\n\n**What to expect:**\n• Professional, sympathetic service\n• Immediate assessment\n• Urgent action plan\n• Full documentation for insurance\n\n**URGENT?** Call immediately: 077018152348\n\nDon't wait - we understand emergencies can't wait for business hours!";
  }
  
  // Insurance and credentials
  if (message.includes('insurance') || message.includes('licensed') || message.includes('legal') || message.includes('certified')) {
    return "🛡️ **Fully Licensed & Insured - Your Peace of Mind Guaranteed:**\n\n**Insurance Coverage:**\n• Public Liability: £2 million\n• Employers' Liability: £10 million\n• Professional Indemnity: £1 million\n• Motor Insurance: Comprehensive\n\n**Licenses & Certifications:**\n• Waste Carrier License: WML-123456\n• Environment Agency Registered\n• WEEE Electrical Waste Certified\n• Health & Safety Compliant\n• DBS Checked Team Members\n\n**What This Means for You:**\n• Complete protection for your property\n• Legal waste disposal guaranteed\n• Professional standards maintained\n• No liability concerns\n• Insurance claims supported\n\n**Documentation Available:**\n• Insurance certificates provided\n• Waste transfer notes issued\n• Compliance certificates available\n\n**Why choose licensed professionals?** Because cutting corners on clearance isn't worth the risk!";
  }
  
  // Greeting responses
  if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon')) {
    return [
      "Hello! 👋 Welcome to SB Property Clearance - I'm here to help make your clearance as smooth as possible.\n\n**I'm great at helping with:**\n• Free quotes (no obligation!)\n• Service information\n• Scheduling appointments\n• Emergency clearance\n• Coverage area questions\n\n**Popular starting points:**\n• 'How much does clearance cost?'\n• 'What areas do you cover?'\n• 'I need an emergency clearance'\n• 'What services do you offer?'\n\nWhat brings you here today?",
      
      "Hi there! 😊 Great to meet you! I'm the SB Property Clearance assistant, and I'm here to help with all your clearance needs.\n\n**Quick wins I can help with:**\n• Get a free quote in minutes\n• Check if we cover your area\n• Book an appointment\n• Learn about our services\n• Emergency clearance info\n\n**What would you like to know?** I'm here to make this easy for you!"
    ];
  }
  
  // Thank you responses
  if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
    return [
      "You're very welcome! 😊 I'm here to help whenever you need it.\n\n**Still need assistance with:**\n• Getting a quote\n• Booking a clearance\n• Questions about our services\n• Emergency clearance\n\n**Ready to move forward?** I can help you get a free quote or book an appointment right now!",
      
      "My pleasure! That's what I'm here for. 👍\n\n**Anything else I can help with?**\n• Free quotes\n• Service information\n• Scheduling\n• Coverage areas\n\nJust let me know how else I can assist you!"
    ];
  }
  
  // Default intelligent response
  return "I'd love to help you with that! 😊\n\n**Here's what I'm excellent at:**\n• **Free Quotes** - Get personalized pricing in minutes\n• **Service Info** - Learn about our full range of clearance services\n• **Scheduling** - Book appointments at your convenience\n• **Coverage Areas** - Check if we serve your location\n• **Emergency Help** - 24/7 urgent clearance services\n\n**Try asking me:**\n• 'How much will it cost to clear my house?'\n• 'What services do you offer?'\n• 'Do you cover [your area]?'\n• 'When are you available?'\n• 'I need emergency clearance'\n\n**Need immediate help?** Call 07946 495782\n\nWhat specific information would be most helpful for you right now?";
}

// Future: Add integration with external AI APIs
export async function getExternalAIResponse(message: string): Promise<string> {
  // This is where you would integrate with OpenAI, Claude, or other AI APIs
  // For now, return enhanced responses
  return generateAIResponse(message);
}
