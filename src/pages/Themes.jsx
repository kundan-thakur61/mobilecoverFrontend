import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import collectionAPI from '../api/collectionAPI';
import { FALLBACK_COLLECTIONS } from '../data/fallbackCollections';
import { resolveImageUrl } from '../utils/helpers';
import SEO from '../components/SEO';

const DEFAULT_ACCENT = '#0ea5e9';
const DEFAULT_TAGLINE = 'Fresh drop';

/* Fallback cards (local images only) */
const FALLBACK_CARDS = FALLBACK_COLLECTIONS.map((collection) => ({
  id: collection._id,
  handle: collection.handle,
  title: collection.title,
  image: (typeof collection.heroImage === 'string' ? collection.heroImage : collection.heroImage?.url) || collection.images?.[0]?.url || '',
  tagline: collection.tagline || DEFAULT_TAGLINE,
  accent: collection.accentColor || DEFAULT_ACCENT,
}));

const IMAGE_ERROR_FALLBACK =
  FALLBACK_CARDS[0]?.image || '/frames/frame-1-fixed.svg';

const Themes = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fetchCollections = async () => {
      try {
        const res = await collectionAPI.listPublic();
        if (!cancelled) {
          setCollections(res?.data?.data?.collections || []);
        }
      } catch {
        if (!cancelled) setCollections([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCollections();
    return () => {
      cancelled = true;
    };
  }, []);

  /* Build cards */
  const cards = useMemo(() => {

    return FALLBACK_CARDS;


    // if (!collections.length) return FALLBACK_CARDS;
    

    // const primaryCards = collections.map((item, idx) =>
    // {

    //   const heroCandidate = typeof item?.heroImage === 'string' ? item.heroImage : item?.heroImage?.url;
    //   const hero = resolveImageUrl(heroCandidate);
    //   const fallback = FALLBACK_CARDS[idx % FALLBACK_CARDS.length];
    //   return {
    //     id: item._id || `${item.handle || `c-${idx}`}`,
    //     handle: item.handle || item._id || fallback?.handle || `${idx}`,
    //     title: item.title || fallback?.title || 'Untitled',
    //     image: hero || fallback?.image,
    //     accent: item.accentColor || fallback?.accent || DEFAULT_ACCENT,
    //     tagline: item.tagline || fallback?.tagline || DEFAULT_TAGLINE,
    //     isFallback: false,
    //   };
    // });

    // const seenHandles = new Set(
    //   primaryCards.map((card) => (card.handle || '').toString().toLowerCase())
    // );

    // const fillerCards = FALLBACK_CARDS.filter(
    //   (fallback) => !seenHandles.has((fallback.handle || '').toLowerCase())
    // ).map((fallback, index) => ({
    //   ...fallback,
    //   id: fallback.id || `${fallback.handle || 'fallback'}-${index}`,
    //   isFallback: true,
    // }));

    // return [...primaryCards, ...fillerCards];
  }, [collections]);

  const handleImgError = (e) => {
    e.currentTarget.src = IMAGE_ERROR_FALLBACK;
  };

  const handleKeyDown = (e, handle) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/collection/${handle}`);
    }
  };

  const themesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Mobile Cover Themes & Collections",
    "description": "Explore our curated themes and collections for custom mobile covers"
  };

  return (
    <>
      <SEO
        title="Themes & Collections | Mobile Covers"
        description="Explore our curated themes and collections for custom mobile covers. Designer patterns, trending styles, and exclusive collections."
        keywords="mobile cover themes, phone case collections, designer covers, trending patterns"
        url="/themes"
        schema={themesSchema}
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* SEO Content for Themes */}
      {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Mobile Cover Themes & Collections - Designer Phone Cases</h1>
        <p className="text-gray-700 mb-4">
          Discover our exclusive collection of themed mobile covers designed to match your style and personality. From trending anime designs to elegant minimalist patterns, our curated themes offer something for everyone. Each collection features high-quality prints with premium protection for your smartphone.
        </p>
        <p className="text-gray-700 mb-4">
          Browse through our carefully crafted themes including pop culture references, nature-inspired designs, abstract art, and seasonal collections. All theme-based covers are available for customization, allowing you to add personal touches while maintaining the aesthetic of the original design. Perfect for those who want unique phone cases that stand out.
        </p>
        <p className="text-gray-700">
          Our themed collections are regularly updated with new designs based on trending styles and customer preferences. Whether you're an anime fan, nature lover, or minimalist enthusiast, find the perfect mobile cover theme that represents your unique style. Shop now and enjoy fast delivery across India with premium quality guaranteed.
        </p>
      </div> */}

     <div className="w-full">
  <div className="bg-white/25 rounded-2xl p-3 backdrop-blur-sm">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      
        {loading
          ? FALLBACK_CARDS.map((card) => (
              <div
                key={card.id}
                className="h-56 sm:h-64 rounded-2xl bg-gray-200 animate-pulse"
              />
            ))
          : cards.map((card) => (
              <Link
                key={card.id}
                to={`/collection/${card.handle}`}
                onKeyDown={(e) => handleKeyDown(e, card.handle)}
                aria-label={card.title}
                className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {/* Image */}
                <img
                  src={resolveImageUrl(card.image) || IMAGE_ERROR_FALLBACK}
                  alt={card.title}
                  loading="lazy"
                  onError={handleImgError}
  className="absolute inset-0 w-full h-full "
                />

                {/* Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /> */}

                {/* Text */}
                {/* <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 text-white">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">
                    {card.tagline}
                  </p>
                </div> */}
                 {/* Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /> */}

                {/* Text */}
                {/* <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 text-white">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">
                    {card.tagline}
                  </p>
                </div> */}
              </Link>
            ))}
      </div>
    </div>
  </div>
  </section>
    </>
  );
};

export default Themes;
