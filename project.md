https://github.com/shadcn-ui/taxonomy/issues/122

- Projekt musi być uruchomiony poprzez terminal VSC:

` yarn build
  yarn dev`

https://magicui.design/docs/templates/portfolio
https://portfolio-magicui.vercel.app/blog

## TODO:

-> open graph images, twitter cards
-> post banner component

// import type { ResolvingMetadata, Metadata } from 'next'
// export async function generateMetadata(\_params, parent: ResolvingMetadata): Promise<Metadata> {
// // read route params
// // const id = params.page

// // fetch data
// const product = await fetch(`https://.../${id}`).then(res => res.json())

// // optionally access and extend (rather than replace) parent metadata
// const previousImages = (await parent).openGraph?.images || []

// return {
// title: product.title,
// openGraph: {
// images: ['/some-specific-page-image.jpg', ...previousImages],
// },
// }
// }
// openGraph: {
// title: `${title} | ${site.shortTitle}`,
// description: description || site.description,
// url: './',
// siteName: site.shortTitle,
// // images: image ? [image] : [site.socialBanner],
// locale: 'en_US',
// type: 'website',
// },
// twitter: {
// title: `${title} | ${site.title}`,
// card: 'summary_large_image',
// // images: image ? [image] : [site.socialBanner],
// },

// <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
// <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
