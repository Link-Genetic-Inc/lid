/**
 * LinkID Client - Main client class for LinkID operations
 */


import {
  LinkIDClientConfig,
  LinkIDRecord,
  ResolutionOptions,
  ResolutionResult,
  RegistrationRequest,
  RegistrationResult,
  UpdateRequest,
  WithdrawalRequest,
  Cache
} from './types';
import { MemoryCache } from './cache';
import { ResolverDiscovery } from './discovery';
import {
  LinkIDError,
  LinkIDNotFoundError,
  LinkIDWithdrawnError,
  NetworkError,
  ValidationError
} from './errors';


/**
 * Main LinkID client class
 */
export class LinkIDClient {
  private readonly config: LinkIDClientConfig & {
    resolverUrl: string;
    timeout: number;
    retries: number;
    caching: boolean;
    cacheTTL: number;
    userAgent: string;
    headers: Record<string, string>;
    validateSSL: boolean;
  };
  private readonly cache: Cache;
  private readonly discovery: ResolverDiscovery;


  constructor(config: LinkIDClientConfig) {
    // Set default configuration
    this.config = {
      resolverUrl: config.resolverUrl || 'https://resolver.linkid.io',
      apiKey: config.apiKey,
      timeout: config.timeout || 10000,
      retries: config.retries || 3,
      caching: config.caching !== false,
      cacheTTL: config.cacheTTL || 3600,
      userAgent: config.userAgent || `LinkID-Client-JS/1.0.0`,
      headers: config.headers || {},
      validateSSL: config.validateSSL !== false
    };


    // Initialize cache
    this.cache = config.cache || new MemoryCache({
      maxSize: 1000,
      defaultTTL: this.config.cacheTTL
    });


    // Initialize resolver discovery
    this.discovery = new ResolverDiscovery();
  }


  /**
   * Resolve a LinkID to its current resource location
   *
   * @param linkId - The LinkID identifier to resolve
   * @param options - Resolution options
   * @returns Promise resolving to the resolution result
   *
   * @example
