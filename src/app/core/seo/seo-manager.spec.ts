import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { SeoManager, SeoConfig } from './seo-manager';

describe('SeoManager', () => {
  let service: SeoManager;
  let titleService: jasmine.SpyObj<Title>;
  let metaService: jasmine.SpyObj<Meta>;
  let mockDocument: jasmine.SpyObj<Document>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockLinkElement = {
    setAttribute: jasmine.createSpy('setAttribute'),
  };

  beforeEach(() => {
    mockDocument = jasmine.createSpyObj('Document', [
      'querySelector',
      'createElement',
    ]);
    mockRouter = jasmine.createSpyObj('Router', []);
    Object.defineProperty(mockRouter, 'url', {
      value: '/test-page',
      writable: true,
    });
    titleService = jasmine.createSpyObj('Title', ['setTitle']);
    metaService = jasmine.createSpyObj('Meta', ['updateTag']);

    Object.defineProperty(mockDocument, 'head', {
      value: {
        appendChild: jasmine.createSpy('appendChild'),
      },
      writable: true,
    });

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
      mockDocument.querySelector.and.returnValue(mockLinkElement as any);

      service.update({ url: 'https://example.com/page' });

      expect(mockDocument.querySelector).toHaveBeenCalledWith('link[rel="canonical"]');
      expect(mockLinkElement.setAttribute).toHaveBeenCalledWith('href', 'https://example.com/page');
    });

    it('should handle missing canonical link gracefully', () => {
      mockDocument.querySelector.and.returnValue(null);

      expect(() => service.update({ url: 'https://example.com/page' })).not.toThrow();
      expect(mockDocument.querySelector).toHaveBeenCalledWith('link[rel="canonical"]');
    });
  });

  describe('JSON-LD structured data', () => {
    let mockScript: any;
    let mockHead: any;

    beforeEach(() => {
      mockScript = {
        setAttribute: jasmine.createSpy('setAttribute'),
        textContent: '',
      };
      mockHead = {
        appendChild: jasmine.createSpy('appendChild'),
      };
      Object.defineProperty(mockDocument, 'head', {
        value: mockHead,
        writable: true,
      });
      mockDocument.createElement.and.returnValue(mockScript);
      mockDocument.querySelector.and.returnValue(null);
    });

    it('should add JSON-LD script when provided', () => {
      const jsonLdData = {
        '@type': 'Organization',
        name: 'Push Serbia',
        url: 'https://pushserbia.com',
      };

      service.update({ jsonLd: jsonLdData });

      expect(mockDocument.createElement).toHaveBeenCalledWith('script');
      expect(mockScript.setAttribute).toHaveBeenCalledWith('type', 'application/ld+json');
      expect(mockScript.setAttribute).toHaveBeenCalledWith('data-dynamic-seo', 'true');
      expect(mockScript.textContent).toContain('@context');
      expect(mockScript.textContent).toContain('https://schema.org');
      expect(JSON.parse(mockScript.textContent)['@type']).toBe('Organization');
      expect(mockHead.appendChild).toHaveBeenCalledWith(mockScript);
    });

    it('should remove existing JSON-LD before adding new one', () => {
      const existingScript = { remove: jasmine.createSpy('remove') };
      mockDocument.querySelector.and.returnValue(existingScript as any);

      service.update({ jsonLd: { '@type': 'Article' } });

      expect(mockDocument.querySelector).toHaveBeenCalledWith('script[data-dynamic-seo="true"]');
      expect(existingScript.remove).toHaveBeenCalled();
    });

    it('should remove JSON-LD when not provided in config', () => {
      const existingScript = { remove: jasmine.createSpy('remove') };
      mockDocument.querySelector.and.returnValue(existingScript as any);

      service.update({ title: 'Test' });

      expect(existingScript.remove).toHaveBeenCalled();
    });

    it('should not add JSON-LD script when not provided', () => {
      mockDocument.createElement.calls.reset();

      service.update({ title: 'Test' });

      const scriptCreations = mockDocument.createElement.calls.all()
        .filter(call => call.args[0] === 'script');
      expect(scriptCreations.length).toBe(0);
    });

    it('should include schema context in JSON-LD', () => {
      const jsonLdData = { '@type': 'Article' };

      service.update({ jsonLd: jsonLdData });

      const parsed = JSON.parse(mockScript.textContent);
      expect(parsed['@context']).toBe('https://schema.org');
      expect(parsed['@type']).toBe('Article');
    });
  });

  describe('integration tests', () => {
    let mockLinkElement: any;
    let mockScript: any;

    beforeEach(() => {
      mockLinkElement = {
        setAttribute: jasmine.createSpy('setAttribute'),
      };
      mockScript = {
        setAttribute: jasmine.createSpy('setAttribute'),
        textContent: '',
      };
      Object.defineProperty(mockDocument, 'head', {
        value: {
          appendChild: jasmine.createSpy('appendChild'),
        },
        writable: true,
      });
      mockDocument.createElement.and.callFake((tag: string) => {
        return tag === 'script' ? mockScript : {};
      });
      mockDocument.querySelector.and.returnValue(mockLinkElement);
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
      expect(metaService.updateTag).toHaveBeenCalledTimes(10);
      expect(mockLinkElement.setAttribute).toHaveBeenCalledWith('href', 'https://example.com/product');
      expect(mockScript.textContent).toContain('Product');
    });
  });
});
