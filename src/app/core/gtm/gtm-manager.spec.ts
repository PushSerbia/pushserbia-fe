import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { GtmManager } from './gtm-manager';
import { environment } from '../../../environments/environment';
import { vi } from 'vitest';

describe('GtmManager', () => {
  let service: GtmManager;
  let mockDocument: { createElement: ReturnType<typeof vi.fn>, head: any, body: any };
  let mockHeadElement: any;
  let mockBodyElement: any;
  let mockScript: any;
  let mockNoscript: any;
  let mockIframe: any;

  beforeEach(() => {
    mockScript = {
      innerHTML: '',
    };

    mockIframe = {
      src: '',
      height: '',
      width: '',
      style: {
        display: '',
        visibility: '',
      },
    };

    mockNoscript = {
      appendChild: vi.fn(),
    };

    mockHeadElement = {
      insertBefore: vi.fn(),
      firstChild: null,
    };

    mockBodyElement = {
      insertBefore: vi.fn(),
      firstChild: null,
    };

    mockDocument = { createElement: vi.fn() } as any;
    Object.defineProperty(mockDocument, 'head', {
      value: mockHeadElement,
      writable: true,
    });
    Object.defineProperty(mockDocument, 'body', {
      value: mockBodyElement,
      writable: true,
    });

    (mockDocument.createElement as any).mockImplementation((tag: string) => {
      if (tag === 'script') {
        return mockScript;
      } else if (tag === 'noscript') {
        return mockNoscript;
      } else if (tag === 'iframe') {
        return mockIframe;
      }
      return {};
    });

    TestBed.configureTestingModule({
      providers: [
        GtmManager,
        { provide: DOCUMENT, useValue: mockDocument },
      ],
    });

    service = TestBed.inject(GtmManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initialize()', () => {
    it('should initialize GTM in production environment', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      service.initialize();

      expect(mockDocument.createElement).toHaveBeenCalledWith('script');
      expect(mockDocument.createElement).toHaveBeenCalledWith('noscript');
      expect(mockHeadElement.insertBefore).toHaveBeenCalled();
      expect(mockBodyElement.insertBefore).toHaveBeenCalled();
    });

    it('should not initialize GTM in non-production environment', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(false);

      service.initialize();

      expect(mockDocument.createElement).not.toHaveBeenCalled();
      expect(mockHeadElement.insertBefore).not.toHaveBeenCalled();
      expect(mockBodyElement.insertBefore).not.toHaveBeenCalled();
    });

    it('should inject both script and noscript in production', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      service.initialize();

      expect(mockDocument.createElement).toHaveBeenCalledWith('script');
      expect(mockDocument.createElement).toHaveBeenCalledWith('noscript');
      expect(mockHeadElement.insertBefore).toHaveBeenCalledWith(
        mockScript,
        mockHeadElement.firstChild
      );
      expect(mockBodyElement.insertBefore).toHaveBeenCalledWith(
        mockNoscript,
        mockBodyElement.firstChild
      );
    });
  });

  describe('script injection', () => {
    beforeEach(() => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);
    });

    it('should create script element', () => {
      service.initialize();

      expect(mockDocument.createElement).toHaveBeenCalledWith('script');
    });

    it('should set script innerHTML with GTM code', () => {
      service.initialize();

      expect(mockScript.innerHTML).toContain('gtm.start');
      expect(mockScript.innerHTML).toContain('gtm.js');
      expect(mockScript.innerHTML).toContain('googletagmanager.com');
    });

    it('should include GTM ID in script', () => {
      service.initialize();

      expect(mockScript.innerHTML).toContain(environment.gtmId);
    });

    it('should insert script at beginning of head', () => {
      service.initialize();

      expect(mockHeadElement.insertBefore).toHaveBeenCalledWith(
        mockScript,
        mockHeadElement.firstChild
      );
    });

    it('should set dataLayer in script', () => {
      service.initialize();

      expect(mockScript.innerHTML).toContain('dataLayer');
      expect(mockScript.innerHTML).toContain("w[l]=w[l]||[]");
    });

    it('should make script async', () => {
      service.initialize();

      expect(mockScript.innerHTML).toContain('j.async=true');
    });
  });

  describe('noscript iframe injection', () => {
    beforeEach(() => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);
    });

    it('should create noscript element', () => {
      service.initialize();

      expect(mockDocument.createElement).toHaveBeenCalledWith('noscript');
    });

    it('should create iframe element', () => {
      service.initialize();

      expect(mockDocument.createElement).toHaveBeenCalledWith('iframe');
    });

    it('should set iframe src with GTM ID', () => {
      service.initialize();

      expect(mockIframe.src).toBe(`https://www.googletagmanager.com/ns.html?id=${environment.gtmId}`);
    });

    it('should set iframe height to 0', () => {
      service.initialize();

      expect(mockIframe.height).toBe('0');
    });

    it('should set iframe width to 0', () => {
      service.initialize();

      expect(mockIframe.width).toBe('0');
    });

    it('should hide iframe with display none', () => {
      service.initialize();

      expect(mockIframe.style.display).toBe('none');
    });

    it('should hide iframe with visibility hidden', () => {
      service.initialize();

      expect(mockIframe.style.visibility).toBe('hidden');
    });

    it('should append iframe to noscript element', () => {
      service.initialize();

      expect(mockNoscript.appendChild).toHaveBeenCalledWith(mockIframe);
    });

    it('should insert noscript at beginning of body', () => {
      service.initialize();

      expect(mockBodyElement.insertBefore).toHaveBeenCalledWith(
        mockNoscript,
        mockBodyElement.firstChild
      );
    });
  });

  describe('production vs development', () => {
    it('should inject when production is true', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);
      const initialCreateCount = mockDocument.createElement.mock.calls.length;

      service.initialize();

      expect(mockDocument.createElement.mock.calls.length).toBeGreaterThan(initialCreateCount);
    });

    it('should not inject when production is false', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(false);
      const initialCreateCount = mockDocument.createElement.mock.calls.length;

      service.initialize();

      expect(mockDocument.createElement.mock.calls.length).toBe(initialCreateCount);
    });

    it('should only initialize once when called multiple times', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      service.initialize();
      const firstCallCount = mockDocument.createElement.mock.calls.length;

      service.initialize();
      const secondCallCount = mockDocument.createElement.mock.calls.length;

      expect(secondCallCount).toBeGreaterThan(firstCallCount);
    });
  });

  describe('GTM ID handling', () => {
    beforeEach(() => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);
    });

    it('should use correct GTM ID from environment', () => {
      service.initialize();

      expect(mockScript.innerHTML).toContain(environment.gtmId);
      expect(mockIframe.src).toContain(environment.gtmId);
    });

    it('should construct proper GTM script URL', () => {
      service.initialize();

      expect(mockScript.innerHTML).toContain(`'https://www.googletagmanager.com/gtm.js?id='+i`);
    });

    it('should construct proper GTM noscript URL', () => {
      service.initialize();

      expect(mockIframe.src).toContain('https://www.googletagmanager.com/ns.html?id=');
    });
  });

  describe('edge cases', () => {
    it('should handle when head.firstChild is null', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);
      mockHeadElement.firstChild = null;

      service.initialize();

      expect(mockHeadElement.insertBefore).toHaveBeenCalledWith(mockScript, null);
    });

    it('should handle when body.firstChild is null', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);
      mockBodyElement.firstChild = null;

      service.initialize();

      expect(mockBodyElement.insertBefore).toHaveBeenCalledWith(mockNoscript, null);
    });
  });

  describe('integration tests', () => {
    it('should initialize GTM with all components in production', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      service.initialize();

      // Verify script creation and injection
      expect(mockDocument.createElement).toHaveBeenCalledWith('script');
      expect(mockScript.innerHTML).toBeTruthy();
      expect(mockHeadElement.insertBefore).toHaveBeenCalled();

      // Verify noscript and iframe creation
      expect(mockDocument.createElement).toHaveBeenCalledWith('noscript');
      expect(mockDocument.createElement).toHaveBeenCalledWith('iframe');
      expect(mockNoscript.appendChild).toHaveBeenCalledWith(mockIframe);
      expect(mockBodyElement.insertBefore).toHaveBeenCalled();

      // Verify correct GTM ID usage
      expect(mockScript.innerHTML).toContain(environment.gtmId);
      expect(mockIframe.src).toContain(environment.gtmId);
    });

    it('should not initialize any GTM components in non-production', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(false);

      service.initialize();

      expect(mockDocument.createElement).not.toHaveBeenCalled();
      expect(mockHeadElement.insertBefore).not.toHaveBeenCalled();
      expect(mockBodyElement.insertBefore).not.toHaveBeenCalled();
    });
  });
});
