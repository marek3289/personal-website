const { withContentlayer } = require('next-contentlayer')

const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' })

// default-src: Określa, że domyślnym źródłem zasobów dla różnych typów treści (np. skryptów, styli, obrazów) jest bieżący adres URL.
// script-src: Definiuje, skąd mogą być pobierane skrypty, w tym z bieżącego adresu URL, z możliwością używania eval oraz inline, oraz z określonych domen giscus.app i analytics.umami.is.
// style-src: Określa, skąd mogą być pobierane arkusze stylów, w tym z bieżącego adresu URL oraz z możliwością używania stylów inline.
// font-src: Określa, skąd mogą być pobierane czcionki, tylko z bieżącego adresu URL.
// img-src:: Ustala, skąd mogą być pobierane obrazy, w tym z dowolnego źródła (*), z blob oraz z data URL.
// media-src: Definiuje, skąd mogą być pobierane media, w tym z poddomeny s3.amazonaws.com.
// frame-src giscus.app: Określa, z jakich źródeł mogą być wyświetlane ramki (frames), w tym z domeny giscus.app.
// connect-src: Określa, z jakich źródeł mogą być nawiązywane połączenia, w tym z dowolnego adresu URL (*).
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  img-src * blob: data:;
  media-src https://res.cloudinary.com;
  connect-src *;
`

// Third Parties do dodania
// const ContentSecurityPolicy = `
//   script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is;
//   media-src *.s3.amazonaws.com;
//   frame-src giscus.app
// `

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  // Określa zasady bezpieczeństwa dotyczące zasobów, takich jak skrypty, style, obrazy, które mogą być ładowane na stronie.
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  // Określa, jakie informacje o źródle (referrer) są wysyłane podczas nawigacji.
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  // Określa, czy strona może być wyświetlana w ramkach (frames) i z jakich źródeł.
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  // Zapobiega przeglądaniu typów MIME, które mogą prowadzić do ataków typu MIME-sniffing.
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  // Określa, czy przeglądarka ma przewidywać adresy DNS dla zasobów na stronie.
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  // Wymusza użycie protokołu HTTPS poprzez określenie maksymalnego czasu ważności i uwzględnienie subdomen.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Określa, jakie uprawnienia są udzielane dla różnych funkcji, takich jak kamera, mikrofon, geolokalizacja.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

/**
 * @type {import('next').NextConfig}
 * */
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]

  return plugins.reduce((acc, next) => next(acc), {
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
      dirs: ['app', 'components', 'layouts', 'scripts'],
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
        {
          protocol: 'https',
          hostname: 'picsum.photos',
        },
      ],
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
    webpack: (config, _options) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      return config
    },
  })
}
