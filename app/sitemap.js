export default function sitemap() {
  return [
    { url: 'https://amoriva-films.de',        lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://amoriva-films.de/preise',  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://amoriva-films.de/anfrage', lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.8 },
  ];
}
