import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { User, Briefcase, Target, ChevronRight, ChevronLeft, Check, PartyPopper, Loader2 } from 'lucide-react'; // Import Loader2 for spinner
import AagazLogo from '@/components/AagazLogo';
import { Link } from 'react-router-dom';
import BrandingCarousel from '@/components/BrandingCarousel';

// --- PROPS & DATA ---
interface FormData {
  name: string;
  contact: string;
  email: string; // Added email field
  state: string;
  visitorType: 'ib' | 'visitor' | '';
  interest: 'trading' | 'fixed_returns' | '';
}

const steps = [
    { id: 1, title: 'Personal Details', icon: User, fields: ['name', 'contact', 'email', 'state'] }, // Added email field
    { id: 2, title: 'Your Role', icon: Briefcase, fields: ['visitorType'] },
    { id: 3, title: 'Your Interest', icon: Target, fields: ['interest'] },
];

// --- MAIN COMPONENT ---
export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    email: '', // Initialize email
    state: '',
    visitorType: '',
    interest: '',
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading to true
    try {
      const response = await fetch('https://aagaz-submission.vercel.app/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // Handle error
        const errorData = await response.json();
        console.error('Submission failed:', errorData);
        // You can show a toast notification here
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // You can show a toast notification here
    } finally {
      setIsSubmitting(false); // Set loading to false
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setIsSubmitted(false);
    setIsSubmitting(false); // Reset loading state
    setFormData({ name: '', contact: '', email: '', state: '', visitorType: '', interest: '' });
  };

  const isStepValid = useMemo(() => {
    const currentFields = steps.find(s => s.id === currentStep)?.fields;
    if (!currentFields) return false;
    return currentFields.every(field => formData[field as keyof FormData] && formData[field as keyof FormData].trim() !== '');
  }, [formData, currentStep]);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row items-center justify-center">
      <div className="w-full md:w-1/2 h-64 md:h-screen">
        <BrandingCarousel />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 relative">
        <AagazLogo className="w-40 mb-8" />
        <div className="w-full max-w-md">
          {!isSubmitted ? (
            <>
              <ProgressIndicator currentStep={currentStep} />
              <form onSubmit={handleSubmit} className="flex flex-col h-full justify-center">
                <div className="flex-grow mt-8 overflow-hidden p-1">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={{
                        enter: (dir: number) => ({ x: `${100 * dir}%`, opacity: 0 }),
                        center: { x: '0%', opacity: 1 },
                        exit: (dir: number) => ({ x: `${-100 * dir}%`, opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <h2 className="text-2xl font-serif mb-6 text-center">{steps.find(s => s.id === currentStep)?.title}</h2>
                      {currentStep === 1 && <Step1 formData={formData} setFormData={setFormData} />}
                      {currentStep === 2 && <Step2 formData={formData} setFormData={setFormData} />}
                      {currentStep === 3 && <Step3 formData={formData} setFormData={setFormData} />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <Button variant="ghost" type="button" onClick={handleBack} disabled={currentStep === 1}>
                    <ChevronLeft size={16} className="mr-2" /> Back
                  </Button>
                  {currentStep < 3 ? (
                    <Button variant="gold" type="button" onClick={handleNext} disabled={!isStepValid}>
                      Next <ChevronRight size={16} className="ml-2" />
                    </Button>
                  ) : (
                    <Button variant="gold" type="submit" disabled={!isStepValid || isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                    </Button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <SuccessMessage resetForm={resetForm} />
          )}
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const ProgressIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="w-full max-w-xs mx-auto mb-8 z-20 px-4">
    <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-border/30" />
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 left-0 h-0.5 bg-gold"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep >= step.id;
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                  animate={{
                    backgroundColor: isActive ? '#D4AF37' : 'hsl(var(--background))',
                    borderColor: isActive ? '#D4AF37' : 'hsl(var(--border))'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep > step.id ? 
                    <Check className="text-background" size={20}/> : 
                    <Icon size={20} className={isActive ? "text-background" : "text-muted-foreground"}/>
                  }
                </motion.div>
            </div>
          );
        })}
    </div>
  </div>
);

// Form Step Components
const Step1 = ({ formData, setFormData }: { formData: FormData, setFormData: (data: FormData) => void }) => (
  <div className="space-y-4">
    <LabelledInput id="name" label="Full Name" placeholder="e.g. Sumit Singh" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
    <LabelledInput id="contact" type="tel" label="Contact Number" placeholder="10 Digit Phone number" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} />
    <LabelledInput id="email" type="email" label="Email Address" placeholder="e.g. your@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
    <LabelledInput id="state" label="State" placeholder="e.g. Haryana" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} />
  </div>
);

const Step2 = ({ formData, setFormData }: { formData: FormData, setFormData: (data: FormData) => void }) => (
  <div className="space-y-4">
    <RadioGroup value={formData.visitorType} onValueChange={(v) => setFormData({ ...formData, visitorType: v as any })} className="space-y-3">
      <RadioCard value="ib" label="Introducing Broker (IB)" description="I am a registered Introducing Broker" />
      <RadioCard value="visitor" label="Visitor" description="I am attending as a guest or prospect" />
    </RadioGroup>
  </div>
);

const Step3 = ({ formData, setFormData }: { formData: FormData, setFormData: (data: FormData) => void }) => (
  <div className="space-y-4">
    <RadioGroup value={formData.interest} onValueChange={(v) => setFormData({ ...formData, interest: v as any })} className="space-y-3">
      <RadioCard value="trading" label="Trading" description="Active FX trading and market opportunities" />
      <RadioCard value="fixed_returns" label="Fixed Returns" description="Stable investment with predictable returns" />
    </RadioGroup>
  </div>
);

const LabelledInput = (props: any) => (
  <div className="space-y-2">
    <Label htmlFor={props.id} className="font-serif text-sm font-medium text-muted-foreground">{props.label}</Label>
    <Input {...props} className="font-sans bg-transparent border-border/30 focus:border-gold/50" />
  </div>
);

const RadioCard = ({ value, label, description }: { value: string; label: string; description: string; }) => (
  <Label className="flex items-start space-x-4 p-4 border rounded-md cursor-pointer has-[:checked]:border-gold has-[:checked]:bg-gold/5 transition-all">
    <RadioGroupItem value={value} id={value} className="border-gold/50 text-gold mt-1" />
    <div>
      <span className="font-serif text-lg font-semibold text-foreground">{label}</span>
      <p className="font-sans text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  </Label>
);

const SuccessMessage = ({ resetForm }: { resetForm: () => void }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-10 text-center flex flex-col items-center justify-center h-full">
    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center"><PartyPopper className="w-10 h-10 text-gold" /></div>
    <h3 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3">Registration Confirmed!</h3>
    <p className="font-sans text-base text-muted-foreground mb-8 max-w-sm">
      Thank you for joining the AAGAZ movement. Your ID cards would be shared shortly. We look forward to seeing you.
    </p>
    <Link to="/">
        <Button variant="outline" onClick={resetForm} className="font-sans border-gold/30 hover:bg-gold/5">Back to Home</Button>
    </Link>
  </motion.div>
);

