import { quillNbspFix } from './quill-nbsp-fix';

describe('quillNbspFix', () => {
  it('should replace multiple consecutive nbsp with space and nbsp', () => {
    const mockQuill = {
      legacyGetSemanticHTML: jasmine.createSpy('legacyGetSemanticHTML').and.returnValue(
        '<p>&nbsp;&nbsp;&nbsp;text</p>',
      ),
      getSemanticHTML: jasmine.createSpy('getSemanticHTML'),
    } as unknown as any;

    quillNbspFix(mockQuill);

    const result = mockQuill.getSemanticHTML(0, 10);
    expect(result).toBe('<p>&nbsp; text</p>');
  });

  it('should preserve single nbsp characters', () => {
    const mockQuill = {
      legacyGetSemanticHTML: jasmine.createSpy('legacyGetSemanticHTML').and.returnValue(
        '<p>text&nbsp;more</p>',
      ),
      getSemanticHTML: jasmine.createSpy('getSemanticHTML'),
    } as unknown as any;

    quillNbspFix(mockQuill);

    const result = mockQuill.getSemanticHTML(0, 10);
    expect(result).toBe('<p>text more</p>');
  });

  it('should handle mixed nbsp and regular spaces', () => {
    const mockQuill = {
      legacyGetSemanticHTML: jasmine.createSpy('legacyGetSemanticHTML').and.returnValue(
        '<p>&nbsp;&nbsp;text&nbsp; more</p>',
      ),
      getSemanticHTML: jasmine.createSpy('getSemanticHTML'),
    } as unknown as any;

    quillNbspFix(mockQuill);

    const result = mockQuill.getSemanticHTML(0, 15);
    expect(result).toBe('<p>&nbsp; text more</p>');
  });

  it('should handle text without nbsp', () => {
    const mockQuill = {
      legacyGetSemanticHTML: jasmine.createSpy('legacyGetSemanticHTML').and.returnValue(
        '<p>normal text</p>',
      ),
      getSemanticHTML: jasmine.createSpy('getSemanticHTML'),
    } as unknown as any;

    quillNbspFix(mockQuill);

    const result = mockQuill.getSemanticHTML(0, 10);
    expect(result).toBe('<p>normal text</p>');
  });

  it('should replace multiple nbsp groups in same string', () => {
    const mockQuill = {
      legacyGetSemanticHTML: jasmine.createSpy('legacyGetSemanticHTML').and.returnValue(
        '<p>&nbsp;&nbsp;first&nbsp;&nbsp;second</p>',
      ),
      getSemanticHTML: jasmine.createSpy('getSemanticHTML'),
    } as unknown as any;

    quillNbspFix(mockQuill);

    const result = mockQuill.getSemanticHTML(0, 20);
    expect(result).toBe('<p>&nbsp; first&nbsp; second</p>');
  });

  it('should preserve the legacy getSemanticHTML method', () => {
    const originalGetSemanticHTML = jasmine.createSpy('originalGetSemanticHTML').and.returnValue(
      '<p>original</p>',
    );
    const mockQuill = {
      getSemanticHTML: originalGetSemanticHTML,
    } as unknown as any;

    quillNbspFix(mockQuill);

    expect(mockQuill.legacyGetSemanticHTML).toBe(originalGetSemanticHTML);
  });

  it('should call legacy method with correct parameters', () => {
    const legacyMethod = jasmine.createSpy('legacyMethod').and.returnValue('<p>&nbsp;&nbsp;</p>');
    const mockQuill = {
      getSemanticHTML: undefined,
      legacyGetSemanticHTML: legacyMethod,
    } as unknown as any;

    quillNbspFix(mockQuill);

    mockQuill.getSemanticHTML(5, 10);

    expect(legacyMethod).toHaveBeenCalledWith(5, 10);
  });

  it('should handle complex HTML with multiple nbsp patterns', () => {
    const mockQuill = {
      legacyGetSemanticHTML: jasmine.createSpy('legacyGetSemanticHTML').and.returnValue(
        '<div><p>&nbsp;&nbsp;&nbsp;test&nbsp;&nbsp;</p><span>&nbsp;more&nbsp;&nbsp;&nbsp;</span></div>',
      ),
      getSemanticHTML: jasmine.createSpy('getSemanticHTML'),
    } as unknown as any;

    quillNbspFix(mockQuill);

    const result = mockQuill.getSemanticHTML(0, 50);
    expect(result).toBe(
      '<div><p>&nbsp; test </p><span> more&nbsp; </span></div>',
    );
  });

  it('should work with leading nbsp characters', () => {
    const mockQuill = {
      legacyGetSemanticHTML: jasmine.createSpy('legacyGetSemanticHTML').and.returnValue(
        '&nbsp;&nbsp;&nbsp;start',
      ),
      getSemanticHTML: jasmine.createSpy('getSemanticHTML'),
    } as unknown as any;

    quillNbspFix(mockQuill);

    const result = mockQuill.getSemanticHTML(0, 10);
    expect(result).toBe('&nbsp; start');
  });

  it('should work with trailing nbsp characters', () => {
    const mockQuill = {
      legacyGetSemanticHTML: jasmine.createSpy('legacyGetSemanticHTML').and.returnValue(
        'end&nbsp;&nbsp;&nbsp;',
      ),
      getSemanticHTML: jasmine.createSpy('getSemanticHTML'),
    } as unknown as any;

    quillNbspFix(mockQuill);

    const result = mockQuill.getSemanticHTML(0, 10);
    expect(result).toBe('end&nbsp; ');
  });

  it('should preserve empty string', () => {
    const mockQuill = {
      legacyGetSemanticHTML: jasmine.createSpy('legacyGetSemanticHTML').and.returnValue(''),
      getSemanticHTML: jasmine.createSpy('getSemanticHTML'),
    } as unknown as any;

    quillNbspFix(mockQuill);

    const result = mockQuill.getSemanticHTML(0, 0);
    expect(result).toBe('');
  });
});
