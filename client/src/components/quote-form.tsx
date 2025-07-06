import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { insertQuoteRequestSchema } from "@shared/schema";
import { z } from "zod";
import { Upload, FileImage, X, Calculator, Search, MapPin } from "lucide-react";

// Extend schema for frontend validation
const quoteFormSchema = insertQuoteRequestSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Please provide a complete address"),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

interface QuoteFormProps {
  trigger?: React.ReactNode;
}

export default function QuoteForm({ trigger }: QuoteFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [postcodeSearch, setPostcodeSearch] = useState("");
  const [addresses, setAddresses] = useState<string[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      propertyType: "",
      serviceType: "",
      accessDetails: "",
      timeframe: "",
      additionalInfo: "",
      images: [],
    },
  });

  const propertyTypes = [
    { value: "house", label: "House" },
    { value: "flat", label: "Flat/Apartment" },
    { value: "bungalow", label: "Bungalow" },
    { value: "office", label: "Office" },
    { value: "shop", label: "Shop/Retail" },
    { value: "warehouse", label: "Warehouse" },
    { value: "garden", label: "Garden/Outdoor" },
    { value: "other", label: "Other" },
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
    { value: "other", label: "Other (please specify in additional info)" },
  ];

  const timeframes = [
    { value: "asap", label: "As soon as possible" },
    { value: "this-week", label: "This week" },
    { value: "next-week", label: "Next week" },
    { value: "within-month", label: "Within a month" },
    { value: "flexible", label: "I'm flexible" },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "File Upload Warning",
        description: "Some files were skipped. Only images under 5MB are allowed.",
        variant: "destructive",
      });
    }

    setUploadedFiles(prev => [...prev, ...validFiles].slice(0, 10)); // Max 10 files
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Real UK address lookup using multiple APIs
  const lookupPostcode = async () => {
    if (!postcodeSearch.trim()) return;
    
    setLoadingAddresses(true);
    try {
      const cleanPostcode = postcodeSearch.replace(/\s/g, '').toUpperCase();
      
      // Try multiple address lookup services
      let foundAddresses = [];
      
      // Method 1: Try OpenStreetMap Nominatim API for real addresses
      try {
        const nominatimResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&countrycodes=gb&postalcode=${cleanPostcode}&addressdetails=1&limit=50`
        );
        
        if (nominatimResponse.ok) {
          const nominatimData = await nominatimResponse.json();
          
          if (nominatimData && nominatimData.length > 0) {
            foundAddresses = nominatimData
              .filter(item => item.display_name && item.address)
              .map(item => {
                const addr = item.address;
                let formattedAddress = '';
                
                // Build proper UK address format
                if (addr.house_number && addr.road) {
                  formattedAddress = `${addr.house_number} ${addr.road}`;
                } else if (addr.road) {
                  formattedAddress = addr.road;
                } else if (addr.residential) {
                  formattedAddress = addr.residential;
                } else {
                  formattedAddress = item.display_name.split(',')[0];
                }
                
                // Add locality/town
                if (addr.suburb) formattedAddress += `, ${addr.suburb}`;
                if (addr.town) formattedAddress += `, ${addr.town}`;
                if (addr.city) formattedAddress += `, ${addr.city}`;
                if (addr.county) formattedAddress += `, ${addr.county}`;
                
                formattedAddress += `, ${cleanPostcode}`;
                
                return formattedAddress;
              })
              .filter(addr => addr.length > 0)
              .slice(0, 30);
          }
        }
      } catch (nominatimError) {
        console.log('Nominatim lookup failed, continuing with fallback...');
      }
      
      // Method 2: If no real addresses found, validate postcode and show manual entry
      if (foundAddresses.length === 0) {
        const postcodeResponse = await fetch(`https://api.postcodes.io/postcodes/${cleanPostcode}`);
        
        if (postcodeResponse.ok) {
          const postcodeData = await postcodeResponse.json();
          if (postcodeData.result) {
            // Show a message that manual entry is needed
            toast({
              title: "Postcode Validated",
              description: `${cleanPostcode} is a valid postcode. Please enter your full address manually below.`,
            });
            
            // Set the postcode in the address field to help user
            const baseAddress = `${postcodeData.result.admin_district}, ${postcodeData.result.admin_county}, ${cleanPostcode}`;
            form.setValue('address', baseAddress);
            
            setAddresses([]); // Clear addresses to show manual entry
            return;
          }
        }
        
        throw new Error('Invalid postcode');
      }
      
      // Remove duplicates and sort
      const uniqueAddresses = [...new Set(foundAddresses)].sort();
      setAddresses(uniqueAddresses);
      
      toast({
        title: "Real Addresses Found",
        description: `Found ${uniqueAddresses.length} actual addresses for ${cleanPostcode}`,
      });
      
    } catch (error) {
      toast({
        title: "Postcode Not Found",
        description: "Please check your postcode and enter your full address manually.",
        variant: "destructive",
      });
    } finally {
      setLoadingAddresses(false);
    }
  };

  // WhatsApp integration function
  const sendToWhatsApp = (quoteData: QuoteFormData) => {
    const phoneNumber = "447123456789"; // Replace with your WhatsApp business number
    
    const message = `🏠 *New Quote Request*
    
*Contact Details:*
Name: ${quoteData.name}
Email: ${quoteData.email}
Phone: ${quoteData.phone}
Address: ${quoteData.address}

*Service Details:*
Property Type: ${quoteData.propertyType}
Service Needed: ${quoteData.serviceType}
Timeframe: ${quoteData.timeframe || 'Not specified'}

*Additional Info:*
Access Details: ${quoteData.accessDetails || 'None provided'}
Additional Information: ${quoteData.additionalInfo || 'None provided'}

*Images:* ${uploadedFiles.length} file(s) uploaded

Please respond with a detailed quote for this request.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const convertFilesToBase64 = async (files: File[]): Promise<string[]> => {
    const promises = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(promises);
  };

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);

    try {
      // Convert uploaded files to base64 strings
      const imageData = await convertFilesToBase64(uploadedFiles);
      
      const submitData = {
        ...data,
        images: imageData,
      };

      // Send to backend for record keeping
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        // Show success message and send to WhatsApp
        toast({
          title: "Quote Request Submitted!",
          description: "Opening WhatsApp to send your request directly to our team...",
        });
        
        // Send to WhatsApp
        sendToWhatsApp(data);
        
        // Reset form and close dialog
        form.reset();
        setUploadedFiles([]);
        setAddresses([]);
        setPostcodeSearch("");
        setIsOpen(false);
      } else {
        throw new Error("Failed to submit quote request");
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Sorry, we couldn't submit your quote request. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTrigger = (
    <Button className="bg-brand-green text-white hover:bg-brand-green-light">
      <Calculator className="mr-2" size={20} />
      Get a FREE Quote
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-green">
            Get Your FREE Quote
          </DialogTitle>
          <DialogDescription>
            Tell us about your property clearance needs and we'll provide you with a detailed, no-obligation quote within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="07123 456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Address *</FormLabel>
                      <div className="space-y-3">
                        {/* Postcode Lookup */}
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter postcode (e.g., ST17 4AH)"
                            value={postcodeSearch}
                            onChange={(e) => setPostcodeSearch(e.target.value.toUpperCase())}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            onClick={lookupPostcode}
                            disabled={loadingAddresses || !postcodeSearch.trim()}
                            variant="outline"
                            size="sm"
                          >
                            {loadingAddresses ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-green"></div>
                            ) : (
                              <Search size={16} />
                            )}
                          </Button>
                        </div>

                        {/* Address Dropdown */}
                        {addresses.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm text-brand-green font-medium flex items-center">
                              <MapPin size={14} className="mr-1" />
                              Real addresses found ({addresses.length}):
                            </p>
                            <Select onValueChange={(value) => {
                              field.onChange(value);
                              form.setValue('address', value);
                            }}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose your actual address" />
                              </SelectTrigger>
                              <SelectContent className="max-h-60">
                                {addresses.map((address, index) => (
                                  <SelectItem key={index} value={address}>
                                    <div className="flex flex-col text-left">
                                      <span className="font-medium">{address.split(',')[0]}</span>
                                      <span className="text-xs text-gray-500">{address.split(',').slice(1).join(',')}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500">
                              These are real addresses from OpenStreetMap. If your address isn't listed, please enter it manually below.
                            </p>
                          </div>
                        )}

                        {/* Manual Address Input */}
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Or enter your full address manually:</p>
                          <FormControl>
                            <Input 
                              placeholder="123 Main Street, Stafford, ST17 4AH" 
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                // Clear addresses when user starts typing manually
                                if (e.target.value && addresses.length > 0) {
                                  setAddresses([]);
                                }
                              }}
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Needed *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {serviceTypes.map((service) => (
                              <SelectItem key={service.value} value={service.value}>
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>When do you need this done?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeframes.map((time) => (
                            <SelectItem key={time.value} value={time.value}>
                              {time.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accessDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Access Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="e.g., Parking available, narrow stairs, ground floor access only, keys available..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please provide any additional details about the items to be cleared, special requirements, or questions you have..."
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Photos (Optional)</CardTitle>
                <p className="text-sm text-gray-600">
                  Upload photos of the items or areas to be cleared to help us provide a more accurate quote.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload size={48} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload images or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Max 10 files, 5MB each. JPG, PNG, GIF supported.
                      </p>
                    </label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="relative">
                          <div className="bg-gray-100 rounded-lg p-2 flex flex-col items-center">
                            <FileImage size={24} className="text-brand-green mb-1" />
                            <p className="text-xs text-gray-600 text-center truncate w-full">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(1)}MB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-green text-white hover:bg-brand-green-light"
              >
                {isSubmitting ? "Submitting..." : "Submit & Send via WhatsApp"}
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-600 mt-4">
              <p>Your request will be saved and sent directly to our WhatsApp for immediate attention.</p>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}