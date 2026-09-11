'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Calendar,
  Camera,
  Check,
  Coffee,
  Copy,
  CreditCard,
  Gift,
  Heart,
  House as HomeIcon,
  MapPin,
  Navigation,
  Phone,
  QrCode,
  ScanLine,
  Share2,
  Sparkles,
  Star,
  Tag,
  Trophy,
  UserRound,
  Users,
  WalletCards,
  X,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Club', href: '#club' },
  { label: 'Rewards', href: '#rewards' },
  { label: 'Offers', href: '#offers' },
  { label: 'Visit Us', href: '#visit-us' },
];

const experiences: Array<{
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
  tone: string;
}> = [
  {
    number: '01',
    title: 'Premium desserts',
    copy: 'Familiar favourites, made with a little more obsession.',
    icon: Coffee,
    tone: 'experience-pink',
  },
  {
    number: '02',
    title: 'Biscavo Club',
    copy: 'Your key to a sweeter side of Biscavo.',
    icon: CreditCard,
    tone: 'experience-dark',
  },
  {
    number: '03',
    title: 'Member rewards',
    copy: 'Useful rewards that give you a reason to come back.',
    icon: Gift,
    tone: 'experience-cream',
  },
  {
    number: '04',
    title: 'Limited drops',
    copy: 'Small-batch specials, here for a good time—not forever.',
    icon: Sparkles,
    tone: 'experience-pistachio',
  },
  {
    number: '05',
    title: 'Refer & earn',
    copy: 'Bring good people. Get good things.',
    icon: Users,
    tone: 'experience-white',
  },
];

const benefits = [
  ['Monthly reward', 'Exclusive Biscavo credit, ready to use in store.', WalletCards],
  ['Member prices', 'Club-only pricing on selected favourites.', Tag],
  ['Exclusive drops', 'Try limited desserts before everyone else.', Sparkles],
  ['Birthday reward', 'A little Biscavo something on your birthday.', Gift],
  ['Refer & earn', 'Invite friends and collect Biscavo credit.', Users],
] as const;

const offers = [
  {
    tag: 'Member exclusive',
    title: '20% off selected waffles',
    note: 'Valid Sunday–Thursday',
    className: 'offer-primary',
  },
  {
    tag: 'Limited drop',
    title: 'Pistachio dream',
    note: 'Available this weekend',
    className: 'offer-photo',
  },
  {
    tag: 'Your Club reward',
    title: '£5 off £20+',
    note: 'Expires Sunday',
    className: 'offer-dark',
  },
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-90px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a
      href="#home"
      className={`wordmark ${inverse ? 'wordmark-inverse' : ''}`}
      aria-label="Biscavo home"
    >
      <Image
        src="/images/biscavo-wordmark.webp"
        alt="Biscavo Desserts"
        width={1198}
        height={505}
        className="wordmark-image"
      />
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`section-eyebrow ${light ? 'section-eyebrow-light' : ''}`}>{children}</p>;
}

function SectionHeading({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <h2 className={`section-heading ${light ? 'section-heading-light' : ''}`}>{children}</h2>;
}

function DataLabel({ inverse = false }: { inverse?: boolean }) {
  return <span className={`placeholder-label ${inverse ? 'placeholder-label-inverse' : ''}`}>Preview data</span>;
}

function CountUp({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState('0');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(String(value));
      return;
    }
    const controls = animate(motionValue, value, { duration: 0.9, ease: 'easeOut' });
    const unsubscribe = motionValue.on('change', (latest) => setDisplay(Math.round(latest).toString()));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [motionValue, reduceMotion, value]);

  return <>{display}</>;
}

function MembershipCard({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotion();
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 170, damping: 18 });
  const rotateY = useSpring(rotateYValue, { stiffness: 170, damping: 18 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || window.matchMedia('(hover: none)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateXValue.set(-((event.clientY - rect.top) / rect.height - 0.5) * 8);
    rotateYValue.set(((event.clientX - rect.left) / rect.width - 0.5) * 10);
  };

  const resetTilt = () => {
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  return (
    <div className={`membership-card-stage ${compact ? 'membership-card-stage-compact' : ''}`}>
      <motion.div
        className="membership-card"
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="card-shine" aria-hidden="true" />
        <motion.div className="card-drip-texture" animate={reduceMotion ? undefined : { y: [0, 3, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
          <Image src="/images/biscavo-drip.webp" alt="" width={1254} height={335} />
        </motion.div>
        <div className="card-topline">
          <Wordmark inverse />
          <span className="card-club-label">Club</span>
        </div>
        <div className="card-chip" aria-hidden="true"><span /><span /><span /></div>
        <div className="card-details">
          <div>
            <span>Member</span>
            <strong>HAMZA C.</strong>
          </div>
          <div>
            <span>Member since</span>
            <strong>09 / 26</strong>
          </div>
          <div className="card-member-id">
            <span>Member ID</span>
            <strong>BCV·8427</strong>
          </div>
        </div>
        <div className="card-qr" aria-label="Member QR preview"><QrCode aria-hidden="true" /></div>
      </motion.div>
    </div>
  );
}

function JoinFlow({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<'monthly' | 'annual'>('annual');
  const [firstName, setFirstName] = useState('');

  const close = (value: boolean) => {
    onOpenChange(value);
    if (!value) window.setTimeout(() => setStep(1), 300);
  };

  const continueForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep(2);
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="join-dialog" showCloseButton={false}>
        <div className="join-visual" aria-hidden="true">
          <Wordmark inverse />
          <MembershipCard compact />
          <p>Dessert has its perks.</p>
        </div>
        <div className="join-content">
          <button className="join-close" onClick={() => close(false)} aria-label="Close signup">
            <X aria-hidden="true" />
          </button>
          <div className="join-progress" aria-label={`Step ${step} of 4`}>
            {[1, 2, 3, 4].map((item) => <span key={item} className={item <= step ? 'active' : ''} />)}
          </div>

          {step === 1 && (
            <form onSubmit={continueForm} className="join-step">
              <Eyebrow>Step 1 of 4</Eyebrow>
              <DialogTitle>Create your Biscavo account.</DialogTitle>
              <DialogDescription>One minute now. More Biscavo later.</DialogDescription>
              <FieldGroup className="join-fields">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="first-name">First name</FieldLabel>
                    <Input id="first-name" required autoComplete="given-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                    <Input id="last-name" required autoComplete="family-name" />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input id="phone" required type="tel" autoComplete="tel" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" required type="email" autoComplete="email" />
                </Field>
              </FieldGroup>
              <Button type="submit" className="primary-button join-next">Continue <ArrowRight /></Button>
              <p className="join-legal">UI preview only — details are not submitted or stored in this phase.</p>
            </form>
          )}

          {step === 2 && (
            <div className="join-step">
              <Eyebrow>Step 2 of 4</Eyebrow>
              <DialogTitle>Choose your Club plan.</DialogTitle>
              <DialogDescription>Simple pricing. The same member experience.</DialogDescription>
              <div className="join-plan-list">
                <button onClick={() => setPlan('monthly')} className={plan === 'monthly' ? 'selected' : ''}>
                  <span><b>Monthly</b><small>£4.99 every month</small></span><span className="radio-dot" />
                </button>
                <button onClick={() => setPlan('annual')} className={plan === 'annual' ? 'selected' : ''}>
                  <span><b>Annual <em>Best value</em></b><small>£39.99 every year</small></span><span className="radio-dot" />
                </button>
              </div>
              <Button className="primary-button join-next" onClick={() => setStep(3)}>Continue <ArrowRight /></Button>
              <button className="join-back" onClick={() => setStep(1)}>Back</button>
            </div>
          )}

          {step === 3 && (
            <div className="join-step">
              <Eyebrow>Step 3 of 4</Eyebrow>
              <DialogTitle>Pay securely.</DialogTitle>
              <DialogDescription>Stripe Checkout, Apple Pay and Google Pay connect in the subscription phase.</DialogDescription>
              <div className="payment-preview">
                <div><span>Biscavo Club · {plan}</span><strong>{plan === 'annual' ? '£39.99 / year' : '£4.99 / month'}</strong></div>
                <span className="payment-placeholder"><CreditCard /> Secure payment preview</span>
              </div>
              <Button className="primary-button join-next" onClick={() => setStep(4)}>Preview success <ArrowRight /></Button>
              <button className="join-back" onClick={() => setStep(2)}>Back</button>
              <p className="join-legal">No payment is taken. Membership is activated only by verified Stripe webhooks in the production phase.</p>
            </div>
          )}

          {step === 4 && (
            <motion.div className="join-step join-success" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }}>
              <motion.span className="success-check" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: .12 }}><Check /></motion.span>
              <Eyebrow>Welcome to Biscavo Club</Eyebrow>
              <DialogTitle>{firstName || 'Hamza'}, you’re in.</DialogTitle>
              <DialogDescription>This is the designed success state. Account creation and card activation arrive with the secure backend phase.</DialogDescription>
              <Button className="primary-button join-next" onClick={() => close(false)}>View my card</Button>
              <button className="join-back" onClick={() => { close(false); window.location.hash = 'benefits'; }}>Explore my benefits</button>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [annual, setAnnual] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedOffer, setSelectedOffer] = useState<(typeof offers)[number] | null>(null);
  const [toast, setToast] = useState('');
  const [openStatus, setOpenStatus] = useState('Checking hours…');
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.14], [0, -75]);
  const heroCopyOpacity = useTransform(scrollYProgress, [0, 0.11], [1, 0.18]);

  useEffect(() => {
    const hasSeenIntro = window.sessionStorage.getItem('biscavo-intro-seen');
    if (!hasSeenIntro && !reduceMotion) {
      setShowIntro(true);
      window.sessionStorage.setItem('biscavo-intro-seen', 'true');
      const timeout = window.setTimeout(() => setShowIntro(false), 1350);
      return () => window.clearTimeout(timeout);
    }
  }, [reduceMotion]);

  useEffect(() => {
    const ids = ['home', 'club', 'rewards', 'offers', 'footer'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveTab(visible.target.id);
      },
      { rootMargin: '-30% 0px -55%', threshold: 0.02 },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(new Date());
    const weekday = parts.find((part) => part.type === 'weekday')?.value;
    const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
    const sunday = weekday === 'Sun';
    const opens = sunday ? 14 : 15;
    const closes = sunday ? 22 : 23;
    setOpenStatus(hour >= opens && hour < closes ? `Open now · closes ${closes}:00` : `Closed · opens ${opens}:00`);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 2000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const shareReferral = async () => {
    const url = `${window.location.origin}/r/BCV-HAMZA`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Join Biscavo Club', text: 'Dessert is better together.', url });
      } else {
        await navigator.clipboard.writeText(url);
        setToast('Referral link copied');
      }
    } catch {
      // Closing a native share sheet is not an error the visitor needs to see.
    }
  };

  const mobileItems = useMemo(() => [
    { id: 'home', label: 'Home', href: '#home', icon: HomeIcon },
    { id: 'club', label: 'Club', href: '#club', icon: CreditCard },
    { id: 'rewards', label: 'Rewards', href: '#rewards', icon: Gift },
    { id: 'offers', label: 'Offers', href: '#offers', icon: Tag },
    { id: 'footer', label: 'Account', href: '#footer', icon: UserRound },
  ], []);

  return (
    <main id="home" className="min-h-screen overflow-x-clip bg-background text-foreground">
      {showIntro && (
        <motion.div
          className="intro-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 1.35, times: [0, 0.72, 1] }}
          aria-hidden="true"
        >
          <motion.div className="intro-logo-art" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 150, damping: 18 }}>
            <Image src="/images/biscavo-logo.webp" alt="" width={1000} height={1000} priority />
          </motion.div>
        </motion.div>
      )}

      <header className="nav-shell">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <a key={item.label} href={item.href} className="nav-link">{item.label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="sign-in" onClick={() => setJoinOpen(true)}>Sign in</button>
          <Button className="primary-button nav-join" onClick={() => setJoinOpen(true)}>Join the club</Button>
          <button className="icon-button mobile-profile" aria-label="Open account preview" onClick={() => setJoinOpen(true)}><UserRound aria-hidden="true" /></button>
        </div>
      </header>

      <section className="hero-section">
        <motion.div className="hero-drip-crown" initial={{ y: -50, scaleY: .86 }} animate={{ y: 0, scaleY: 1 }} transition={{ type: 'spring', stiffness: 95, damping: 17, delay: .08 }} aria-hidden="true">
          <Image src="/images/biscavo-drip.webp" alt="" width={1254} height={335} priority />
        </motion.div>
        <motion.div className="hero-copy" style={reduceMotion ? undefined : { opacity: heroCopyOpacity }}>
          <motion.div className="hero-brand-lockup" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 }}>
            <Image src="/images/biscavo-wordmark.webp" alt="Biscavo Desserts" width={1198} height={505} priority />
          </motion.div>
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 }}>BISCAVO / EST. 2026</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24, duration: .6 }}>
            Dessert,<br />done <em>differently.</em>
          </motion.h1>
          <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .34, duration: .5 }}>
            Premium desserts. Exclusive rewards. One club.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .42 }}>
            <Button className="primary-button hero-button" onClick={() => setJoinOpen(true)}>Join Biscavo Club</Button>
            <Button variant="outline" className="secondary-button hero-button" onClick={() => document.getElementById('experience')?.scrollIntoView()}>
              Explore Biscavo <ArrowDown aria-hidden="true" />
            </Button>
          </motion.div>
          <motion.div className="review-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65 }}>
            <span className="review-stars" aria-label="Five stars">
              {Array.from({ length: 5 }).map((_, index) => <Star key={index} aria-hidden="true" />)}
            </span>
            <span>Loved locally.</span><DataLabel />
          </motion.div>
        </motion.div>

        <motion.div className="hero-visual" style={reduceMotion ? undefined : { y: heroImageY }} initial={{ opacity: 0, scale: .93, y: 26 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: .2, duration: .7, ease: [0.22, 1, 0.36, 1] }}>
          <div className="hero-orbit" aria-hidden="true"><span>WARM</span><span>GLOSSY</span><span>ICONIC</span></div>
          <motion.div animate={reduceMotion ? undefined : { y: [0, -10, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}>
            <Image src="/images/biscavo-signature-waffle.webp" alt="Biscavo signature waffle with soft serve, chocolate, pistachio and strawberries" width={1122} height={1402} priority className="hero-dessert" />
          </motion.div>
          <div className="product-tag"><span>01</span><p><b>The Signature</b><br />Waffle · chocolate · pistachio</p></div>
        </motion.div>
        <p className="hero-footnote">Concept photography and product details are placeholders pending the final Biscavo menu.</p>
      </section>

      <motion.div className="brand-drip-divider" initial={{ y: -16 }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 100, damping: 18 }} aria-hidden="true">
        <Image src="/images/biscavo-drip.webp" alt="" width={1254} height={335} />
      </motion.div>

      <section id="experience" className="experience-section section-pad">
        <motion.div className="section-title-row" {...reveal}>
          <div><Eyebrow>The Biscavo experience</Eyebrow><SectionHeading>Not just dessert.</SectionHeading></div>
          <p>Good enough to crave.<br />Different enough to remember.</p>
        </motion.div>
        <div className="experience-track" aria-label="Biscavo experience highlights">
          {experiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article key={item.title} className={`experience-card ${item.tone}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: index * .08, duration: .45 }} whileHover={reduceMotion ? undefined : { y: -5, rotate: index % 2 ? -.5 : .5 }}>
                {item.tone === 'experience-pink' && <Image src="/images/biscavo-drip.webp" alt="" width={1254} height={335} className="experience-drip" aria-hidden="true" />}
                <div className="experience-card-top"><span>{item.number}</span><Icon aria-hidden="true" /></div>
                <div><h3>{item.title}</h3><p>{item.copy}</p></div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="club" className="club-section">
        <div className="club-glow" aria-hidden="true" />
        <motion.div className="club-intro section-pad" {...reveal}>
          <Eyebrow light>Biscavo Club</Eyebrow>
          <SectionHeading light>Dessert tastes better<br />when you’re a <em>member.</em></SectionHeading>
          <p className="club-lead">A membership made for regulars, reward hunters and people who always say yes to dessert.</p>
        </motion.div>
        <motion.div className="club-card-wrap" initial={{ opacity: 0, y: 45, scale: .96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}>
          <MembershipCard />
          <p>Scan in store. Unlock rewards. Look very good doing it. <DataLabel inverse /></p>
        </motion.div>

        <div id="benefits" className="benefits-grid section-pad">
          {benefits.map(([title, copy, Icon], index) => (
            <motion.article key={title} className="benefit-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}>
              <span className="benefit-icon"><Icon aria-hidden="true" /></span><span className="benefit-number">0{index + 1}</span>
              <h3>{title}</h3><p>{copy}</p>
            </motion.article>
          ))}
        </div>

        <motion.div className="pricing-panel" {...reveal}>
          <div className="pricing-copy"><Eyebrow light>One club. Two ways in.</Eyebrow><h3>Pick your pace.</h3><p>Simple membership. No inflated savings claims. Pricing remains configurable for launch.</p></div>
          <div className="pricing-control">
            <div className="pricing-toggle" role="group" aria-label="Membership billing period">
              <button className={!annual ? 'active' : ''} onClick={() => setAnnual(false)}>Monthly</button>
              <button className={annual ? 'active' : ''} onClick={() => setAnnual(true)}>Annual</button>
            </div>
            <motion.div key={annual ? 'annual' : 'monthly'} className="price" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <span>£</span><strong>{annual ? '39.99' : '4.99'}</strong><small>/ {annual ? 'year' : 'month'}</small>
            </motion.div>
            {annual && <span className="best-value">Best value</span>}
            <Button className="primary-button pricing-button" onClick={() => setJoinOpen(true)}>Join Biscavo Club <ArrowRight /></Button>
          </div>
        </motion.div>
      </section>

      <section id="rewards" className="rewards-section section-pad">
        <motion.div className="rewards-copy" {...reveal}>
          <Eyebrow>Rewards that feel rewarding</Eyebrow>
          <SectionHeading>Your next Biscavo<br />is already closer.</SectionHeading>
          <p>Club credit, referral rewards and carefully chosen surprises—all in one simple balance.</p>
          <Button variant="outline" className="text-link-button" onClick={() => setJoinOpen(true)}>Join to start earning <ArrowRight /></Button>
        </motion.div>
        <motion.div className="reward-wallet" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: .55 }}>
          <div className="wallet-header"><span>Available</span><DataLabel /></div>
          <p className="reward-balance">£<CountUp value={5} />.00</p>
          <div className="reward-chip"><span>+£5</span> Monthly Club reward <Check /></div>
          <div className="reward-progress">
            <div><span>Two visits away</span><strong>3 / 5</strong></div>
            <div className="progress-track"><motion.span initial={{ width: 0 }} whileInView={{ width: '60%' }} viewport={{ once: true }} transition={{ duration: .8, delay: .2 }} /></div>
            <p>Progress is illustrative. Launch reward rules will be configurable.</p>
          </div>
          <div className="wallet-footer"><div><Calendar /><span>Next reward<b>01 Oct</b></span></div><div><Trophy /><span>Total saved<b>£18.50</b></span></div></div>
        </motion.div>
      </section>

      <section id="offers" className="offers-section section-pad">
        <motion.div className="section-title-row" {...reveal}>
          <div><Eyebrow>Fresh from Biscavo</Eyebrow><SectionHeading>Just for you.</SectionHeading></div>
          <p>Member-only perks and small-batch moments, without the fake countdowns.</p>
        </motion.div>
        <div className="offers-grid">
          {offers.map((offer, index) => (
            <motion.article key={offer.title} className={`offer-card ${offer.className}`} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .09 }}>
              {offer.className === 'offer-primary' && <Image src="/images/biscavo-drip.webp" alt="" width={1254} height={335} className="offer-drip" aria-hidden="true" />}
              {offer.className === 'offer-photo' && <Image src="/images/biscavo-signature-waffle.webp" alt="Pistachio waffle offer concept" width={1122} height={1402} className="offer-dessert" loading="lazy" />}
              <div className="offer-content"><span>{offer.tag}</span><h3>{offer.title}</h3><p>{offer.note}</p><button onClick={() => setSelectedOffer(offer)}>View offer <ArrowRight /></button></div>
              <DataLabel inverse={offer.className !== 'offer-primary'} />
            </motion.article>
          ))}
        </div>
      </section>

      <section className="referral-section section-pad">
        <div className="referral-mark" aria-hidden="true">B</div>
        <motion.div className="referral-copy" {...reveal}>
          <Eyebrow light>Refer & earn</Eyebrow>
          <SectionHeading light>Dessert is better<br />together.</SectionHeading>
          <p>Give your friend £3. Get £4 Biscavo credit after their first qualifying visit or order.</p>
          <Button className="referral-button" onClick={shareReferral}><Share2 /> Share with a friend</Button>
          <div className="referral-rule"><DataLabel inverse /> Offer and qualification rules are illustrative and admin-configurable.</div>
        </motion.div>
        <motion.div className="referral-ticket" initial={{ opacity: 0, rotate: 4, y: 30 }} whileInView={{ opacity: 1, rotate: -2, y: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 110, damping: 16 }}>
          <div className="ticket-top"><Wordmark /><QrCode /></div><span>Your invite code</span><strong>BCV-HAMZA</strong><button onClick={() => { navigator.clipboard.writeText('BCV-HAMZA'); setToast('Invite code copied'); }}><Copy /> Copy code</button>
          <div className="ticket-stats"><span>Friends joined<b>3</b></span><span>Rewards earned<b>£12</b></span></div>
        </motion.div>
      </section>

      <section id="visit-us" className="visit-section">
        <Image src="/images/biscavo-store-concept.webp" alt="Concept visual of a warm modern Biscavo dessert bar interior" fill sizes="100vw" className="visit-image" loading="lazy" />
        <div className="visit-overlay" />
        <motion.div className="visit-copy" {...reveal}>
          <div className="visit-status"><span />{openStatus}</div>
          <Eyebrow light>Visit Biscavo</Eyebrow>
          <SectionHeading light>Come for dessert.<br />Stay for one more.</SectionHeading>
          <p><MapPin /> Launch location to be confirmed</p>
          <div className="visit-actions"><Button className="visit-button" onClick={() => setToast('Directions unlock when the launch address is confirmed')}><Navigation /> Get directions</Button><Button className="visit-button visit-button-ghost" onClick={() => setToast('Phone number will be connected before launch')}><Phone /> Call</Button></div>
          <div className="visit-footnote"><DataLabel inverse /> Concept image, location and opening hours schedule.</div>
        </motion.div>
      </section>

      <section className="social-section section-pad">
        <motion.div className="social-title" {...reveal}>
          <Eyebrow>Follow the good stuff</Eyebrow>
          <SectionHeading>Made to be seen.</SectionHeading>
          <p>Drops, late-night cravings and what’s fresh behind the counter.</p>
        </motion.div>
        <div className="social-grid">
          <motion.button className="social-tile social-photo" whileHover={reduceMotion ? undefined : { scale: .985 }} onClick={() => setToast('Instagram profile will be connected before launch')}>
            <Image src="/images/biscavo-signature-waffle.webp" alt="Biscavo waffle social content concept" width={1122} height={1402} loading="lazy" />
            <span><Camera /> @BISCAVO</span><DataLabel inverse />
          </motion.button>
          <motion.button className="social-tile social-type" whileHover={reduceMotion ? undefined : { rotate: -.6 }} onClick={() => setToast('TikTok profile will be connected before launch')}>
            <span className="social-quote">“SAVE ROOM<br />FOR THIS.”</span><span className="social-platform">TT &nbsp; @BISCAVO</span><DataLabel />
          </motion.button>
          <motion.button className="social-tile social-stamp" whileHover={reduceMotion ? undefined : { rotate: .6 }} onClick={() => setToast('Instagram profile will be connected before launch')}>
            <Heart /><strong>SOFT<br />SERVE<br />SEASON</strong><span>02:14 AM · LONDON</span><DataLabel inverse />
          </motion.button>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-ring" aria-hidden="true" />
        <motion.div {...reveal}><Eyebrow light>Ready to join?</Eyebrow><h2>BISCAVO<br /><em>Club.</em></h2><p>Dessert has its perks.</p><Button className="primary-button final-button" onClick={() => setJoinOpen(true)}>Join the club <ArrowRight /></Button></motion.div>
      </section>

      <footer id="footer" className="footer section-pad">
        <div className="footer-top"><Wordmark inverse /><p>Premium desserts.<br />Exclusive rewards.<br />One club.</p></div>
        <div className="footer-links"><div><span>Explore</span><a href="#home">Home</a><a href="#club">Club</a><a href="#rewards">Rewards</a><a href="#offers">Offers</a></div><div><span>Find us</span><button onClick={() => setToast('Instagram profile will be connected before launch')}>Instagram</button><button onClick={() => setToast('TikTok profile will be connected before launch')}>TikTok</button><a href="#visit-us">Visit us</a></div><div><span>Help</span><button onClick={() => setToast('Help centre arrives with member accounts')}>Help centre</button><button onClick={() => setToast('Privacy policy content is pending legal review')}>Privacy</button><button onClick={() => setToast('Terms content is pending legal review')}>Terms</button></div></div>
        <div className="footer-bottom"><span>© 2026 Biscavo. Concept homepage.</span><span>Made for proper dessert people.</span></div>
      </footer>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return <a key={item.id} href={item.href} className={active ? 'active' : ''}>{active && <motion.span className="mobile-active-pill" layoutId="active-mobile-tab" />}<Icon aria-hidden="true" /><span>{item.label}</span></a>;
        })}
      </nav>

      <JoinFlow open={joinOpen} onOpenChange={setJoinOpen} />

      <Drawer open={!!selectedOffer} onOpenChange={(open) => !open && setSelectedOffer(null)} showSwipeHandle>
        <DrawerContent className="offer-drawer">
          <DrawerHeader>
            <DrawerTitle>{selectedOffer?.title}</DrawerTitle>
            <DrawerDescription>{selectedOffer?.tag} · {selectedOffer?.note}</DrawerDescription>
          </DrawerHeader>
          <div className="drawer-body"><div className="drawer-icon"><ScanLine /></div><p>Show this offer in store from your Biscavo account. Full eligibility, expiry and redemption rules will be connected to the member backend.</p><DataLabel /></div>
          <DrawerFooter><Button className="primary-button drawer-button" onClick={() => setSelectedOffer(null)}>Got it</Button></DrawerFooter>
        </DrawerContent>
      </Drawer>

      {toast && <motion.output className="toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{toast} <Check /></motion.output>}
    </main>
  );
}
