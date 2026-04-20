import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { SeoManager, SeoConfig } from './seo-manager';
import { vi } from 'vitest';

describe('SeoManager', () => {
  let service: SeoManager;
  let titleService: { setTitle: ReturnType<typeof vi.fn> };
  let metaService: {
    updateTag: ReturnType<typeof vi.fn>;
    removeTag: ReturnType<typeof vi.fn>;
  };
  let mockDocument: { querySelector: ReturnType<typeof vi.fn>, createElement: ReturnType<typeof vi.fn>, head: any, cookie: string };
  let mockRouter: { url: string };

  beforeEach(() => {
    const mockLinkElement = {
      setAttribute: vi.fn(),
      remove: vi.fn(),
    };

    const mockScript = {
      setAttribute: vi.fn(),
      textContent: '',
      remove: vi.fn(),
    };

    mockDocument = {
      querySelector: vi.fn((selector: string) => {
        if (selector === 'link[rel="canonical"]') {
          return mockLinkElement;
        }
        if (selector === 'script[data-dynamic-seo="true"]') {
          return null; // Return null by default, tests can override
        }
        return null;
      }),
      createElement: vi.fn((tag: string) => {
        if (tag === 'script') {
          return mockScript;
        }
        return {};
      }),
      head: {
        appendChild: vi.fn(),
      },
      cookie: '',
    };
    mockRouter = { url: '/test-page' };
    titleService = {
      setTitle: vi.fn(),
    };
    metaService = {
      updateTag: vi.fn(),
      removeTag: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        SeoManager,
        { provide: Title, useValue: titleService },
        { provide: Meta, useValue: metaService },
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: Router, useValue: mockRouter },
      ],
    });

    service = TestBed.inject(SeoManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('update()', () => {
    it('should set title with site name', () => {
      const config: SeoConfig = { title: 'Test Page' };

      service.update(config);

      expect(titleService.setTitle).toHaveBeenCalledWith('Test Page | Push Serbia');
    });

    it('should set default title when not provided', () => {
      service.update({});

      expect(titleService.setTitle).toHaveBeenCalledWith('Push Serbia');
    });

    it('should update meta description tag', () => {
      const config: SeoConfig = { description: 'Test description' };

      service.update(config);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'description',
        content: 'Test description',
      });
    });

    it('should truncate descriptions longer than 160 characters', () => {
      const longDescription =
        'Finansiraj sadnju drveta i prati njegov rast putem geolokacije. Kada bude zasađeno, dobićeš lokaciju i fotografiju svog drveta - da ga obilaziš i vidiš kako napreduje.';

      service.update({ description: longDescription });

      const descriptionCall = metaService.updateTag.mock.calls.find(
        (call: unknown[]) => (call[0] as { name?: string })?.name === 'description',
      );
      const truncated: string = (descriptionCall![0] as { content: string }).content;

      expect(truncated.length).toBeLessThanOrEqual(160);
      expect(truncated.endsWith('…')).toBe(true);
      expect(longDescription.startsWith(truncated.slice(0, -1).trim())).toBe(true);
    });

    it('should not truncate descriptions within the 160 character limit', () => {
      const description = 'A'.repeat(160);

      service.update({ description });

      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'description',
        content: description,
      });
    });

    it('should use default description when not provided', () => {
      service.update({});

      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'description',
        content: 'Pridruži se Push Serbia zajednici! Predloži projekte, glasaj za inicijative i doprinesi razvoju open-source softvera koji mijenja društvo.',
      });
    });

    it('should update Open Graph tags', () => {
      const config: SeoConfig = {
        title: 'Test Page',
        description: 'Test description',
        image: 'https://example.com/image.png',
        url: 'https://example.com/page',
        type: 'article',
      };

      service.update(config);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:title',
        content: 'Test Page | Push Serbia',
      });
      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:description',
        content: 'Test description',
      });
      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:image',
        content: 'https://example.com/image.png',
      });
      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:url',
        content: 'https://example.com/page',
      });
      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:type',
        content: 'article',
      });
    });

    it('should use default image when not provided', () => {
      service.update({});

      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:image',
        content: 'https://pushserbia.com/pushserbia.png',
      });
    });

    it('should use default type as website', () => {
      service.update({});

      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:type',
        content: 'website',
      });
    });

    it('should build URL from router when not provided', () => {
      Object.defineProperty(mockRouter, 'url', {
        value: '/test-page?query=param',
        writable: true,
      });

      service.update({});

      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:url',
        content: 'https://pushserbia.com/test-page',
      });
    });

    it('should update Twitter meta tags', () => {
      const config: SeoConfig = {
        title: 'Test Page',
        description: 'Test description',
        image: 'https://example.com/image.png',
      };

      service.update(config);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'twitter:title',
        content: 'Test Page | Push Serbia',
      });
      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'twitter:description',
        content: 'Test description',
      });
      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'twitter:image',
        content: 'https://example.com/image.png',
      });
    });

    it('should handle canonical URL when link exists', () => {
      service.update({ url: 'https://example.com/page' });

      expect(mockDocument.querySelector).toHaveBeenCalledWith('link[rel="canonical"]');
      // The mock querySelector will return the mock link element with setAttribute method
    });

    it('should handle missing canonical link gracefully', () => {
      mockDocument.querySelector.mockReturnValue(null);

      expect(() => service.update({ url: 'https://example.com/page' })).not.toThrow();
      expect(mockDocument.querySelector).toHaveBeenCalledWith('link[rel="canonical"]');
    });
  });

  describe('JSON-LD structured data', () => {
    beforeEach(() => {
      // Reset the mocks for JSON-LD tests
      mockDocument.querySelector.mockReturnValue(null);
    });

    it('should add JSON-LD script when provided', () => {
      const jsonLdData = {
        '@type': 'Organization',
        name: 'Push Serbia',
        url: 'https://pushserbia.com',
      };

      service.update({ jsonLd: jsonLdData });

      expect(mockDocument.createElement).toHaveBeenCalledWith('script');
      // Get the script element that was created
      const createdScript = (mockDocument.createElement as any).mock.results[0].value;
      expect(createdScript.setAttribute).toHaveBeenCalledWith('type', 'application/ld+json');
      expect(createdScript.setAttribute).toHaveBeenCalledWith('data-dynamic-seo', 'true');
      expect(createdScript.textContent).toContain('@context');
      expect(createdScript.textContent).toContain('https://schema.org');
      expect(JSON.parse(createdScript.textContent)['@type']).toBe('Organization');
      expect(mockDocument.head.appendChild).toHaveBeenCalled();
    });

    it('should remove existing JSON-LD before adding new one', () => {
      const existingScript = { remove: vi.fn() };
      mockDocument.querySelector.mockImplementation((selector: string) => {
        if (selector === 'script[data-dynamic-seo="true"]') {
          return existingScript;
        }
        if (selector === 'link[rel="canonical"]') {
          return null;
        }
        return null;
      });

      service.update({ jsonLd: { '@type': 'Article' } });

      expect(mockDocument.querySelector).toHaveBeenCalledWith('script[data-dynamic-seo="true"]');
      expect(existingScript.remove).toHaveBeenCalled();
    });

    it('should remove JSON-LD when not provided in config', () => {
      const existingScript = { remove: vi.fn() };
      mockDocument.querySelector.mockImplementation((selector: string) => {
        if (selector === 'script[data-dynamic-seo="true"]') {
          return existingScript;
        }
        return null;
      });

      service.update({ title: 'Test' });

      expect(existingScript.remove).toHaveBeenCalled();
    });

    it('should add JSON-LD script when provided', () => {
      mockDocument.querySelector.mockReturnValue(null);
      mockDocument.createElement.mockClear();

      service.update({ jsonLd: { '@type': 'Article' } });

      const scriptCreations = mockDocument.createElement.mock.calls
        .filter((call: any) => call[0] === 'script');
      expect(scriptCreations.length).toBeGreaterThan(0);
    });

    it('should include schema context in JSON-LD', () => {
      const jsonLdData = { '@type': 'Article' };

      service.update({ jsonLd: jsonLdData });

      const createdScript = (mockDocument.createElement as any).mock.results[0].value;
      const parsed = JSON.parse(createdScript.textContent);
      expect(parsed['@context']).toBe('https://schema.org');
      expect(parsed['@type']).toBe('Article');
    });
  });

  describe('integration tests', () => {
    beforeEach(() => {
      // No special setup needed, mocks are already configured
    });

    it('should handle complete SEO config update', () => {
      const config: SeoConfig = {
        title: 'Product Page',
        description: 'Amazing product',
        image: 'https://example.com/product.png',
        url: 'https://example.com/product',
        type: 'product',
        jsonLd: {
          '@type': 'Product',
          name: 'Amazing Product',
        },
      };

      service.update(config);

      expect(titleService.setTitle).toHaveBeenCalledWith('Product Page | Push Serbia');
      // Meta updates: description + 5 og tags + 3 twitter tags = 9 calls
      // Plus meta tag updates can include multiple calls
      expect(metaService.updateTag).toHaveBeenCalled();

      // Verify the script was created with JSON-LD data
      expect(mockDocument.createElement).toHaveBeenCalledWith('script');
      const createdScript = (mockDocument.createElement as any).mock.results.find(
        (result: any) => result.value && result.value.textContent !== undefined
      );
      if (createdScript) {
        expect(createdScript.value.textContent).toContain('Product');
      }
    });
  });
});
