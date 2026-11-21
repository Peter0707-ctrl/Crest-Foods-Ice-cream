import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  IceCreamCone,
  Leaf,
  MapPin,
  Star,
} from 'lucide-react';
import {
  GALLERY_PHOTOS,
  PRODUCTS,
} from '../data/catalog';
import { SectionHeading } from '../components/SectionHeading';
import { Lightbox } from '../components/Lightbox';
import { useCart } from '../context/useCart';

interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  tagline: string;
  video: string;
  poster: string;
}

const HERO_VIDEO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-ice-cream-1',
    badge: 'ARTISAN ICE CREAM · SMALL BATCH',
    title: 'Crest Foods & Ice Cream',
    subtitle: 'ARTISAN ICE CREAM & LOADED POPCORN',
    tagline: 'Where velvety artisan swirls meet golden loaded popcorn crunch',
    video: '/videos/ice-cream-1.mp4',
    poster: '/images/ice-cream-collection.jpg',
  },
  {
    id: 'slide-popcorn-1',
    badge: 'LOADED POPCORN CANOES · HAND DRIZZLED',
    title: 'Crest Foods & Ice Cream',
    subtitle: 'COOKIES & CREAM · STRAWBERRY SHORTCAKE',
    tagline: 'Showstopping loaded dessert popcorn canoes drizzled in white & dark chocolate',
    video: '/videos/popcorn-1.mp4',
    poster: '/images/popcorn-collection.jpg',
  },
  {
    id: 'slide-ice-cream-2',
    badge: 'FRESH HIGHLAND CREAM · REAL FRUIT',
    title: 'Crest Foods & Ice Cream',
    subtitle: 'PARLOUR SWIRLS & TAKE-HOME TUBS',
    tagline: 'Slow-churned vanilla bean, rich dark cocoa, and sun-ripened Zanzibar mango',
    video: '/videos/ice-cream-2.mp4',
    poster: '/images/hero-crest.jpg',
  },
  {
    id: 'slide-popcorn-2',
    badge: 'BIRTHDAY CAKE CONFETTI · CARAMEL KETTLE',
    title: 'Crest Foods & Ice Cream',
    subtitle: 'GOURMET POPCORN & EVENT PLATTERS',
    tagline: 'Freshly popped daily and crowned with real cookies, crumble, and sprinkles',
    video: '/videos/popcorn-2.mp4',
    poster: '/images/craft-kitchen.jpg',
  },
];

// Exact 4 Signature Ice Cream Columns from milkyicecream.com Screenshots 1 & 2
const MILKY_FLAVOR_COLUMNS = [
  {
    id: 'ic-dark-cocoa',
    title: 'Chocolate',
    cupImage: '/images/milky-cup-chocolate.png',
    bgClass: 'bg-[#F6DEEB]',
    paragraphs: [
      'Chocolate ice cream is a classic and highly popular dessert with an intense, rich chocolate flavor. It has a creamy, smooth texture that melts in your mouth, releasing a deep, cocoa aroma.',
      'This ice cream is made with high-quality cocoa and best quality fresh milk, giving it an exceptionally velvety consistency.',
      'This flavour is a perfect choice for chocolate lovers who appreciate an intense flavor and creamy texture, ideal for any occasion.',
    ],
  },
  {
    id: 'ic-vanilla-bean',
    title: 'Vanilla',
    cupImage: '/images/milky-cup-vanilla.png',
    bgClass: 'bg-[#F6DEEB]',
    paragraphs: [
      'Vanilla ice cream is a classic dessert with a mild, delicate vanilla flavor. Best quality fresh milk and selected ingredients makes it exceptionally creamy and smooth.',
      'The vanilla aroma, derived from natural vanilla gives the ice cream a subtle yet distinct taste.',
      "It's an excellent choice for a hot day, offering simplicity and a timeless flavor that never goes out of style.",
    ],
  },
  {
    id: 'ic-mango-passion',
    title: 'Mango',
    cupImage: '/images/milky-cup-mango.png',
    bgClass: 'bg-[#F6DEEB]',
    paragraphs: [
      'Mango sorbet is a refreshing, light dessert with the intense, fruity flavor of ripe mango. Unlike traditional ice cream, sorbet does not contain dairy, making it a perfect choice for those avoiding milk or lactose.',
      'It has a smooth, velvety texture that melts in your mouth, leaving behind the intense, natural taste of mango. This exotic flavour is an ideal way to cool down on hot days, delighting with its simplicity and bold taste.',
    ],
  },
  {
    id: 'ic-berry-cream',
    title: 'Strawberry',
    cupImage: '/images/milky-cup-strawberry.png',
    bgClass: 'bg-[#F6DEEB]',
    paragraphs: [
      "Strawberry sorbet is a refreshing, light dessert with the intense, fruity flavor of fresh strawberries. It's an excellent choice for those seeking a dairy-free and low-calorie treat.",
      'The sorbet has a smooth, slightly grainy texture that gently melts on the tongue, releasing the rich, sweet-tart taste of strawberries.',
      'This dessert is perfect for hot days, offering a refreshing experience with its intense, natural flavor.',
    ],
  },
];

// 4 Signature Popcorn Columns in the exact same tall pastel Milky column layout
const POPCORN_COLUMNS = [
  {
    id: 'pc-cookies-cream',
    title: 'Cookies & Cream',
    image: '/images/popcorn-cookies-cream.jpg',
    paragraphs: [
      'Cookies & Cream gourmet popcorn is our showstopping dessert creation with an irresistible white chocolate drizzle and crunchy dark cookie crumble.',
      'Each small-batch kettle pop is generously tumbled with real crushed chocolate sandwich cookies and creamy white chocolate squares.',
      'Served in our signature sharing pouches and elongated Popcorn Canoes, ideal for movie nights and celebrations.',
    ],
  },
  {
    id: 'pc-strawberry-shortcake',
    title: 'Strawberry Crunch',
    image: '/images/popcorn-strawberry-shortcake.jpg',
    paragraphs: [
      'Strawberry Shortcake gourmet popcorn combines a vibrant ruby-berry glaze with silky white chocolate ribbons and golden cookie pieces.',
      'Hand-crafted in small batches for a shatter-crisp texture that melts gently into sweet strawberry and vanilla cream notes.',
      'A favorite centerpiece for birthdays, bridal showers, and anyone who loves fruity dessert indulgence.',
    ],
  },
  {
    id: 'pc-birthday-cake',
    title: 'Caramel & Confetti',
    image: '/images/popcorn-birthday-cake.jpg',
    paragraphs: [
      'Copper-kettle caramel and vanilla cake glaze poured warm over jumbo mushroom kernels for a glossy, golden crunch.',
      'Finished with delicate sea-salt crystals, rainbow confetti sprinkles, and golden vanilla cookie crumble.',
      'Crafted fresh daily in our kitchen so every handful arrives crisp, aromatic, and unforgettable.',
    ],
  },
  {
    id: 'pc-savory-duo',
    title: 'Butter & Cheddar',
    image: '/images/popcorn-detail.jpg',
    paragraphs: [
      'Cinema Reserve Golden Butter and Aged White Cheddar popcorn offers the ultimate savory contrast to our sweet dessert canoes.',
      'Tender butterfly and mushroom kernels popped in pure oil and misted with clarified cultured butter and sharp aged cheddar.',
      'Light, aromatic, and freshly sealed for everyday snacking, office lounges, and family weekends.',
    ],
  },
];

// Authentic Tanzanian Google Reviews (Auto-sliding + Manual Arrows)
const GOOGLE_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Neema Mwakasege',
    date: '2026-11-18',
    stars: 5,
    text: 'Ice cream ya Vanilla na Mango ni tamu sana! Pia Cookies & Cream popcorn zao zimejaa chocolate ya kutosha 😍🍦',
    avatarBg: 'bg-[#EA337A]',
    initials: 'NM',
  },
  {
    id: 'rev-2',
    name: 'Juma Kikwete',
    date: '2026-11-15',
    stars: 5,
    text: 'Best ice cream parlour in Dar! Huduma nzuri sana na delivery imefika Masaki bado imeganda vizuri kabisa.',
    avatarBg: 'bg-[#1D2939]',
    initials: 'JK',
  },
  {
    id: 'rev-3',
    name: 'Fatma Said',
    date: '2026-11-12',
    stars: 5,
    text: 'Amazing! Chocolate ice cream yao ni nzito na tamu kama ya kimataifa. Nitakuja tena weekend hii 🍫✨',
    avatarBg: 'bg-[#0F4C3A]',
    initials: 'FS',
  },
  {
    id: 'rev-4',
    name: 'Baraka Massawe',
    date: '2026-11-09',
    stars: 5,
    text: 'Hizi Loaded Popcorn Canoes ni habari nyingine! Familia imependa sana Strawberry Crunch na Caramel.',
    avatarBg: 'bg-[#072B75]',
    initials: 'BM',
  },
  {
    id: 'rev-5',
    name: 'Kelvin Shirima',
    date: '2026-11-05',
    stars: 5,
    text: 'Tuliagiza cart ya Crest kwenye birthday party, wageni wote walifurahia sana swirls na gourmet popcorn!',
    avatarBg: 'bg-[#7A4B1E]',
    initials: 'KS',
  },
  {
    id: 'rev-6',
    name: 'Halima Abdallah',
    date: '2026-10-30',
    stars: 5,
    text: 'Mango sorbet ni fresh mno, haina maziwa lakini ladha yake ni ya embe halisi la Zanzibar. 10/10!',
    avatarBg: 'bg-[#8E1D41]',
    initials: 'HA',
  },
  {
    id: 'rev-7',
    name: 'Emmanuel Mushi',
    date: '2026-10-25',
    stars: 5,
    text: 'Customer service iko vizuri sana, unaweka order WhatsApp na ndani ya dakika 35 mzigo umefika.',
    avatarBg: 'bg-[#3B475C]',
    initials: 'EM',
  },
  {
    id: 'rev-8',
    name: 'Zawadi Kimaro',
    date: '2026-10-19',
    stars: 5,
    text: 'Yummm! Vanilla bean na Strawberry sorbet pamoja na Salted Caramel popcorn ni combination bora kabisa.',
    avatarBg: 'bg-[#C86E12]',
    initials: 'ZK',
  },
];

// Official 4-color Google 'G' SVG
const GoogleGIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export const HomePage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const { openProductModal } = useCart();

  // Automatically alternate between Ice Cream and Popcorn videos every 5.2 seconds
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_VIDEO_SLIDES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = HERO_VIDEO_SLIDES[activeSlide];
  const previewGallery = GALLERY_PHOTOS.slice(0, 6);

  const scrollToSection = (selector: string) => {
    if (selector === '#hero-top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOrderProduct = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) openProductModal(found);
  };

  return (
    <div id="hero-top" className="bg-white w-full overflow-x-hidden">
      {/* ==================== 1. HOME HERO (UNTOUCHED) ==================== */}
      <section className="relative h-screen min-h-[620px] w-full overflow-hidden flex flex-col justify-between select-none">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.15, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentSlide.poster}
              alt={currentSlide.title}
              className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
            />
            <video
              key={currentSlide.video}
              src={currentSlide.video}
              poster={currentSlide.poster}
              preload="metadata"
              autoPlay
              muted
              loop
              playsInline
              className="relative z-10 w-full h-full object-cover scale-[1.02]"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />

        <div className="h-20" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 text-center flex flex-col items-center my-auto">
          <div className="font-rounded inline-flex items-center gap-2 text-white/95 text-[11px] sm:text-xs uppercase tracking-[0.34em] mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            <MapPin className="w-3.5 h-3.5 text-white/90 stroke-[1.75]" />
            <span>DAR ES SALAAM, TANZANIA</span>
          </div>

          <h1 className="font-script text-[3.4rem] sm:text-[5.2rem] md:text-[6.2rem] text-white font-normal leading-[1.05] tracking-normal drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] py-1">
            {currentSlide.title}
          </h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide.subtitle}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45 }}
              className="font-rounded mt-1 text-xs sm:text-sm md:text-[15px] uppercase tracking-[0.36em] text-white/95 font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            >
              {currentSlide.subtitle}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="font-rounded mt-5 text-sm sm:text-base md:text-[18px] text-white/95 font-normal tracking-wide max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
            >
              {currentSlide.tagline}
            </motion.p>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => scrollToSection('#order-menu')}
            className="font-rounded mt-8 px-8 py-3.5 rounded-full bg-[#EA337A] hover:bg-white text-white hover:text-[#080808] text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] transition-all duration-300 shadow-[0_10px_28px_rgba(234,51,122,0.42)] hover:scale-105 cursor-pointer"
          >
            ORDER NOW
          </button>
        </div>

        <div className="relative z-10 w-full max-w-[1380px] mx-auto px-6 sm:px-10 pb-10 flex flex-col items-center">
          <button
            type="button"
            onClick={() => scrollToSection('#about-us')}
            aria-label="Scroll down"
            className="text-white/85 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>
      </section>

      {/* ==================== 2. "AFTER HOME" (LALA SALAMA SERENGETI SCREENSHOT LAYOUT) ==================== */}
      <section
        id="about-us"
        className="bg-[#F9F9F7] pt-14 sm:pt-18 pb-20 sm:pb-24 px-6 sm:px-10 scroll-mt-16"
      >
        <div className="max-w-[1340px] mx-auto">
          <div className="flex items-center justify-center gap-6 sm:gap-10 mb-14 sm:mb-16">
            <div className="h-px flex-1 bg-[#DCE0E2]" />
            <div className="text-center select-none shrink-0">
              <p className="font-sans text-2xl sm:text-[28px] tracking-[0.28em] font-light text-[#B2BABD] leading-none">
                CREST
              </p>
              <p className="text-[9px] tracking-[0.42em] uppercase text-[#B8C0C3] mt-1.5">
                FOOD &amp; BEVERAGE
              </p>
            </div>
            <div className="h-px flex-1 bg-[#DCE0E2]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[#F4B924]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-[#788386] font-normal">
                  Artisan Ice Cream &amp; Gourmet Popcorn
                </span>
              </div>

              <h2 className="font-script text-[3.1rem] sm:text-[3.8rem] text-[#556462] font-normal leading-[1.08] mt-3">
                Crest Foods &amp; Ice Cream
              </h2>

              <p className="font-rounded mt-5 text-[14.5px] sm:text-[15px] text-[#3B383A] leading-[1.82] font-normal">
                Right in the heart of East Africa, Crest Foods offers an unparalleled tasting
                experience where culinary luxury meets authentic craft. Our boutique kitchen pairs
                European-style slow-melting soft serve and gastronomy scoops with freshly glazed
                gourmet popcorn, ensuring personalized hospitality and pure indulgence in every bite.
              </p>

              <div className="font-rounded mt-9 space-y-5 border-t border-[#E4E7E8] pt-7">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#080808] shrink-0 mt-0.5 stroke-[1.8]" />
                  <div>
                    <p className="text-[15px] font-bold text-[#080808]">Location</p>
                    <p className="text-[13.5px] text-[#3B383A] mt-0.5 leading-[1.7]">
                      Dar es Salaam, Tanzania · Tasting Parlour &amp; Chilled City Dispatch
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <IceCreamCone className="w-5 h-5 text-[#080808] shrink-0 mt-0.5 stroke-[1.8]" />
                  <div>
                    <p className="text-[15px] font-bold text-[#080808]">
                      Slow-Melting Soft Serve &amp; Gastronomy Scoops
                    </p>
                    <p className="text-[13.5px] text-[#3B383A] mt-0.5 leading-[1.7]">
                      Full-fat highland cream, Madagascar bourbon vanilla, rich dark cocoa &amp; real
                      fruit ripples
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Leaf className="w-5 h-5 text-[#080808] shrink-0 mt-0.5 stroke-[1.8]" />
                  <div>
                    <p className="text-[15px] font-bold text-[#080808]">
                      Pure Natural · Zero Artificial Additives
                    </p>
                    <p className="text-[13.5px] text-[#3B383A] mt-0.5 leading-[1.7]">
                      Crafted without synthetic pastes or preservatives — pure orchard fruit &amp;
                      small-batch copper-kettle glaze
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="lg:col-span-7 flex"
            >
              <div className="relative w-full min-h-[340px] sm:min-h-[420px] lg:min-h-full overflow-hidden shadow-[0_18px_50px_rgba(5,27,71,0.09)] bg-[#ECEAE4]">
                <img
                  src="/images/ice-cream-collection.jpg"
                  alt="Crest Foods Artisan Ice Cream & Gourmet Popcorn"
                  className="w-full h-full lg:absolute lg:inset-0 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== 3. EXACT MILKYICECREAM.COM PRODUCT & BACKGROUND SECTION (SCREENSHOTS 1, 2 & 3) ==================== */}
      <section
        id="order-menu"
        className="bg-white pt-20 sm:pt-24 pb-16 px-4 sm:px-8 scroll-mt-16 overflow-hidden"
      >
        <div className="max-w-[1220px] mx-auto">
          {/* Exact Rounded Extra-Bold Centered Black Heading from Screenshot 1 */}
          <h2 className="font-rounded text-center text-[2.35rem] sm:text-[3.25rem] md:text-[3.75rem] font-bold text-[#050505] leading-[1.14] tracking-[-0.01em] max-w-4xl mx-auto mb-14 sm:mb-16">
            Immerse yourself in the
            <br />
            extraordinary taste of our
            <br />
            signature flavor.
          </h2>

          {/* Exact 4 Tall Pastel-Pink Columns (#F6DEEB) from Screenshots 1 & 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
            {MILKY_FLAVOR_COLUMNS.map((col) => (
              <div
                key={col.id}
                onClick={() => handleOrderProduct(col.id)}
                className={`${col.bgClass} flex flex-col items-center text-center pt-4 pb-10 px-6 transition-transform duration-300 hover:-translate-y-1.5 cursor-pointer`}
              >
                {/* Top Cup-Splash Graphic */}
                <div className="w-full flex items-center justify-center overflow-hidden">
                  <img
                    src={col.cupImage}
                    alt={col.title}
                    className="w-full max-w-[235px] h-auto object-contain select-none"
                  />
                </div>

                {/* Bold Centered Black Title */}
                <h3 className="font-rounded text-[1.75rem] sm:text-[1.9rem] font-bold text-[#080808] mt-3 mb-5">
                  {col.title}
                </h3>

                {/* Multi-Paragraph Centered Editorial Text (Exact Screenshot 2 layout) */}
                <div className="space-y-1.5 text-[13.5px] leading-[1.82] text-[#3B383A] font-normal flex-1">
                  {col.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {/* Subtle Order Button at base of column (No price) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOrderProduct(col.id);
                  }}
                  className="font-rounded mt-7 px-7 py-2.5 rounded-full bg-[#EA337A] hover:bg-[#051B47] text-white text-xs font-bold uppercase tracking-[0.18em] transition-colors shadow-sm cursor-pointer"
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>

          {/* Second Row: 4 Tall Pastel-Pink Columns (#F6DEEB) for Our Gourmet Popcorn Signatures */}
          <div id="delivery-info" className="mt-20 pt-8 scroll-mt-20">
            <h3 className="font-rounded text-center text-[2rem] sm:text-[2.7rem] font-bold text-[#050505] leading-[1.16] max-w-3xl mx-auto mb-12">
              Pair your scoop with our freshly glazed gourmet popcorn.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
              {POPCORN_COLUMNS.map((col) => (
                <div
                  key={col.id}
                  onClick={() => handleOrderProduct(col.id)}
                  className="bg-[#F6DEEB] flex flex-col items-center text-center pt-6 pb-10 px-6 transition-transform duration-300 hover:-translate-y-1.5 cursor-pointer"
                >
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-sm">
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h4 className="font-rounded text-[1.6rem] font-bold text-[#080808] mt-3 mb-4">
                    {col.title}
                  </h4>

                  <div className="space-y-1.5 text-[13.5px] leading-[1.82] text-[#3B383A] font-normal flex-1">
                    {col.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderProduct(col.id);
                    }}
                    className="font-rounded mt-7 px-7 py-2.5 rounded-full bg-[#EA337A] hover:bg-[#051B47] text-white text-xs font-bold uppercase tracking-[0.18em] transition-colors shadow-sm cursor-pointer"
                  >
                    Order Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Self-Moving Chocolate Splash + Floating Red Strawberry + Milk Splash on Pure White */}
        <div className="max-w-[1360px] mx-auto mt-14 sm:mt-18 grid grid-cols-3 items-center overflow-hidden py-4">
          <div className="flex justify-start animate-splash-left">
            <img
              src="/images/splash-chocolate.png"
              alt="Melted chocolate splash"
              className="w-full max-w-[460px] h-auto object-contain select-none"
            />
          </div>

          <div className="flex justify-center animate-splash-center">
            <img
              src="/images/splash-strawberry.png"
              alt="Fresh red strawberry"
              className="w-28 sm:w-36 md:w-44 h-auto object-contain select-none"
            />
          </div>

          <div className="flex justify-end animate-splash-right">
            <img
              src="/images/splash-milk.png"
              alt="Creamy milk splash"
              className="w-full max-w-[360px] h-auto object-contain select-none"
            />
          </div>
        </div>

        {/* Continuous Self-Moving Tanzanian Google Reviews Marquee Carousel */}
        <div className="max-w-[1340px] mx-auto mt-2 pb-12 overflow-hidden relative">
          {/* Soft white edge fade left & right */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="animate-review-marquee gap-5 py-3">
            {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((rev, idx) => (
              <div
                key={`${rev.id}-${idx}`}
                className="w-[290px] sm:w-[305px] shrink-0 bg-white border border-[#F0F0F0] rounded-md p-5 shadow-[0_3px_16px_rgba(0,0,0,0.05)] flex flex-col justify-between min-h-[195px]"
              >
                <div>
                  {/* Top Row: Avatar + Name/Date + Google G Icon */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${rev.avatarBg} text-white flex items-center justify-center text-xs font-bold shrink-0`}
                      >
                        {rev.initials}
                      </div>
                      <div>
                        <p className="text-[13.5px] font-bold text-[#141414] leading-tight">
                          {rev.name}
                        </p>
                        <p className="text-[11.5px] text-[#8C8C8C] mt-0.5">{rev.date}</p>
                      </div>
                    </div>
                    <GoogleGIcon />
                  </div>

                  {/* Star Rating Row */}
                  <div className="flex items-center gap-0.5 mt-3.5 mb-2.5">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className={`w-4 h-4 ${
                          sIdx < rev.stars
                            ? 'text-[#FBBC04] fill-[#FBBC04]'
                            : 'text-[#DCDCDC] fill-[#DCDCDC]'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Copy */}
                  <p className="text-[13.5px] text-[#262626] leading-relaxed whitespace-pre-line">
                    {rev.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 4. VISUAL JOURNAL (UNTOUCHED AS REQUESTED) ==================== */}
      <section className="py-20 sm:py-24 px-5 sm:px-8 bg-[#F2EBE0]/65 border-t border-[#E6DDD0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="Visual Journal"
              title="Moments From the Crest Table"
              italicWord="Crest Table"
            />
            <Link
              to="/gallery"
              className="font-rounded inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#080808] hover:text-[#EA337A] transition-colors shrink-0"
            >
              Open Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {previewGallery.map((photo, idx) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightboxIdx(idx)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-md ${
                  idx === 0 ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-[4/3] h-full'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        photos={previewGallery}
        activeIndex={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onNavigate={setLightboxIdx}
      />
    </div>
  );
};
