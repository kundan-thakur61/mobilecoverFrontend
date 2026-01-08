
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts, fetchTrendingProducts } from '../redux/slices/productSlice';
import { FiShoppingCart, FiZap, FiShield, FiTruck, FiStar, FiHeart } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import ThemeShowcase from '../components/ThemeShowcase';
import SEO from '../components/SEO';
let phone = 7827205492;
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ featured: true, limit: 8 }));
    dispatch(fetchTrendingProducts({ limit: 8 }));
  }, [dispatch]);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "CoverGhar",
        "url": "https://www.coverghar.in",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.coverghar.in/products?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "name": "CoverGhar",
        "url": "https://www.coverghar.in",
        "logo": "https://res.cloudinary.com/dwmytphop/image/upload/v1766473299/ChatGPT_Image_Dec_23_2025_12_30_26_PM_oyeb3g.jpg",
        "sameAs": [
          "https://www.facebook.com/coverghar",
          "https://www.instagram.com/coverghar",
          "https://twitter.com/coverghar"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Service",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I design a custom mobile cover?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply select your phone model, upload your photo or choose from our design templates, customize using our easy design tool, and place your order. Your custom mobile cover will be delivered within 5-7 days across India."
            }
          },
          {
            "@type": "Question",
            "name": "What is the starting price for custom mobile covers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our custom mobile covers start from just ₹99, making it affordable to create personalized phone cases for all major brands including iPhone, Samsung, OnePlus, Realme, and more."
            }
          },
          {
            "@type": "Question",
            "name": "Which phone brands are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We support all major smartphone brands including iPhone (15, 14, 13, SE), Samsung Galaxy (S24, S23, A series), OnePlus, Realme, Vivo, Oppo, Xiaomi, Google Pixel, and many more models."
            }
          },
          {
            "@type": "Question",
            "name": "How long does delivery take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer fast shipping across India with standard delivery within 5-7 business days. Express delivery options are available for select locations for faster delivery."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEO
        title="Custom Mobile Covers Online @₹99 | Design Your Phone Case - CoverGhar India"
        description="Create personalized mobile covers with your photos. Premium quality custom phone cases for iPhone, Samsung, OnePlus, Realme. Fast shipping across India starting at ₹99. Design now!"
        keywords="custom mobile covers India, personalized phone cases, mobile cover printing online, design your own phone case, custom iPhone covers, Samsung Galaxy cases, photo mobile covers, mobile back cover online India"
        url="/"
        schema={schema}
      />

      <div className="min-h-screen">
        {/* Hero Section with SEO-Optimized Content */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Create Custom Mobile Covers Online
                  <span className="block text-yellow-300">Starting at Just ₹199</span>
                </h1>
                <p className="text-xl text-white/90">
                  Design personalized phone cases with your photos. Premium quality printing for all phone models. Fast delivery across India.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/customizer"
                    className="inline-flex items-center justify-center bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg"
                  >
                    Design Your Cover Now
                  </Link>
                  <Link
                    to="/themes"
                    className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors border-2 border-white/30"
                  >
                    Browse Designs
                  </Link>

                   <a 
              href={`https://wa.me/91${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <FiShield className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm">Premium Quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiTruck className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm">Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiStar className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm">4.8/5 Rating</span>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </section>

        {/* Design Options - Keyword-Rich */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Two Ways to Get Your Perfect Mobile Cover
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose from thousands of pre-designed themes or create your own custom phone case with our easy-to-use design tool
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pre-Designed Themes */}
              <Link
                to="/themes"
                className="group relative "
              >
                <img
                  src="https://res.cloudinary.com/dwmytphop/image/upload/v1766311084/main_background_theame_ni9f5a.png"
                  alt="Pre-designed mobile cover themes - anime, sports, nature, abstract designs"
                  className="w-full h-auto object-cover "
                />
                <div className="absolute inset-0 p-6">
                  <div className="text-white">
                   
                  </div>
                </div>
              </Link>

              {/* Custom Design */}
              <Link
                to="/customizer"
                className="group relative "
              >
                <img
                  src="https://res.cloudinary.com/dwmytphop/image/upload/v1766311082/Customised_theam_ghg4jm.png"
                  alt="Create custom mobile cover with your own photos and designs"
                  className="w-full h-auto object-cover  transition-transform duration-300"
                />
                <div className="absolute  p-6">
                  <div className="text-white">
                 
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Feature-Rich SEO Content */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why CoverGhar for Custom Mobile Covers?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Premium quality phone cases with advanced printing technology, perfect fit for all phone models, and fast delivery across India
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiZap className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Easy Design Tool
                </h3>
                <p className="text-gray-600">
                  User-friendly customization tool to create your perfect mobile cover in minutes. No design skills needed.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiShield className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Premium Quality
                </h3>
                <p className="text-gray-600">
                  High-quality materials with advanced UV printing technology for long-lasting, scratch-resistant prints.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTruck className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Fast Delivery
                </h3>
                <p className="text-gray-600">
                  Quick production and delivery across India in just 5-7 days. Express shipping available.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiHeart className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Perfect Fit Guaranteed
                </h3>
                <p className="text-gray-600">
                  Precise cutouts for cameras, ports, and buttons. Compatible with all major phone brands and models.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Brands - SEO Keywords */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Custom Covers for All Phone Brands
              </h2>
              <p className="text-lg text-gray-600">
                We support all major smartphone brands with perfect-fit mobile covers
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { name: 'iPhone', models: '15, 14, 13, SE' },
                { name: 'Samsung', models: 'S24, S23, A series' },
                { name: 'OnePlus', models: '12, 11R, Nord' },
                { name: 'Realme', models: 'GT, Pro series' },
                { name: 'Vivo', models: 'V series, Y series' },
                { name: 'Xiaomi', models: 'Redmi, Mi series' },
              ].map((brand) => (
                <div key={brand.name} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors">
                  <p className="font-bold text-gray-900 mb-1">{brand.name}</p>
                  <p className="text-sm text-gray-600">{brand.models}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/products"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All Supported Models →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section - Schema Markup */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about custom mobile covers
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "How do I design a custom mobile cover?",
                  a: "Simply select your phone model, upload your photo or choose from our design templates, customize using our easy design tool, and place your order. Your custom mobile cover will be delivered within 5-7 days across India."
                },
                {
                  q: "What is the starting price for custom mobile covers?",
                  a: "Our custom mobile covers start from just ₹99, making it affordable to create personalized phone cases for all major brands including iPhone, Samsung, OnePlus, Realme, and more."
                },
                {
                  q: "Which phone brands are supported?",
                  a: "We support all major smartphone brands including iPhone (15, 14, 13, SE), Samsung Galaxy (S24, S23, A series), OnePlus, Realme, Vivo, Oppo, Xiaomi, Google Pixel, and many more models."
                },
                {
                  q: "How long does delivery take?",
                  a: "We offer fast shipping across India with standard delivery within 5-7 business days. Express delivery options are available for select locations for faster delivery."
                }
              ].map((faq, index) => (
                <details key={index} className="bg-white rounded-lg shadow-sm p-6 group">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.q}
                    </h3>
                    <span className="text-primary-600 group-open:rotate-180 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Create Your Custom Mobile Cover?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of happy customers who trust CoverGhar for their phone case needs
            </p>
            <Link
              to="/customizer"
              className="inline-flex items-center justify-center bg-white text-primary-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Designing Now - From ₹199
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;