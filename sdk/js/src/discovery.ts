/**
 * Resolver Discovery Service for LinkID Client SDK
 */


import { ResolverInfo } from './types';


/**
 * Service for discovering LinkID resolvers
 */
export class ResolverDiscovery {
  private cache = new Map<string, { resolvers: string[]; expires: number }>();
  private readonly cacheTTL = 3600; // 1 hour


  /**
   * Discover available resolvers for a domain
   * @param domain - Domain to discover resolvers for
   * @returns Promise resolving to array of resolver URLs
   */
  async discover(domain: string): Promise<string[]> {
    // Check cache first
    const cached = this.cache.get(domain);
    if (cached && Date.now() < cached.expires) {
      return cached.resolvers;
    }


    const resolvers: string[] = [];


    try {
      // Try well-known URI discovery
      const wellKnownResolvers = await this.discoverWellKnown(domain);
      resolvers.push(...wellKnownResolvers);


      // Try DNS SRV record discovery
      // Note: DNS SRV discovery would require a server-side component
      // in browser environments due to CORS restrictions


      // Add default resolver if no others found
      if (resolvers.length === 0) {
        resolvers.push('https://resolver.linkid.io');
      }


      // Cache the results
      this.cache.set(domain, {
        resolvers,
        expires: Date.now() + this.cacheTTL * 1000
      });


      return resolvers;


    } catch (error) {
      console.warn(`Resolver discovery failed for ${domain}:`, error);
      return ['https://resolver.linkid.io']; // Fallback to default
    }
  }


  /**
   * Discover resolvers via well-known URI
   * @param domain - Domain to check
   * @returns Promise resolving to array of resolver URLs
   */
  private async discoverWellKnown(domain: string): Promise<string[]> {
    const wellKnownUrl = `https://${domain}/.well-known/linkid-resolver`;


    try {
      const response = await fetch(wellKnownUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });


      if (!response.ok) {
        return [];
      }
