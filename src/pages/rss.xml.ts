// src/pages/rss.xml.ts
import { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { RSSBuilder } from '@astrojs/rss';

export const get: APIRoute = async () => {
  const posts = await getCollection('blog'); // Adjust if your collection name is different

  const rss = new RSSBuilder({
    title: 'Warm',
    description: "Bernard Valentine's personal blog",
    site: 'https://warm.nu',
    language: 'en-us', // Optional
    pubDate: new Date(),
    ttl: 60, // Time to live in minutes
    author: 'Your Name', // Optional
  });

  // Map your posts to RSS items
  const items = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description || post.data.excerpt, // Use description or excerpt
    url: `${rss.site}/blog/${post.slug}`, // Adjust based on your routing
    date: new Date(post.data.date || post.data.publishDate),
    // Optional fields:
    // categories: post.data.tags,
    // enclosure: {
    //   url: 'https://yourwebsite.com/path/to/media.mp3',
    //   type: 'audio/mpeg',
    //   size: '12345', // Size in bytes
    // },
  }));

  // Add items to the RSS feed
  items.forEach((item) => rss.addItem(item));

  // Generate XML
  const xml = rss.build();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
};