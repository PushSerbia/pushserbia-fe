import { quillNbspFix } from './quill-nbsp-fix';
import { vi } from 'vitest';

describe('quillNbspFix', () => {
  it('should wrap getSemanticHTML and call legacy version', () => {
    const legacyFunction = vi.fn().mockReturnValue('<p>&nbsp;&nbsp;&nbsp;text</p>');
    const mockQuill = {
      getSemanticHTML: legacyFunction,
    } as unknown as any;

    quillNbspFix(mockQuill);

    expect(mockQuill.legacyGetSemanticHTML).toBe(legacyFunction);
    expect(typeof mockQuill.getSemanticHTML).toBe('function');
  });

  it('should replace multiple consecutive nbsp with reduced nbsps', () => {
    const legacyFunction = vi.fn().mockReturnValue(
      '<p>&nbsp;&nbsp;&nbsp;text</p>',
    );
    const mockQuill = {
      getSemanticHTML: legacyFunction,
    } as unknown as any;

    quillNbspFix(mockQuill);

    const result = mockQuill.getSemanticHTML(0, 10);
    expect(result).toBe('<p>&nbsp;&nbsp; text</p>');
  });

  it('should replace single nbsp with space', () => {
    const legacyFunction = vi.fn().mockReturnValue(
      '<p>text&nbsp;more</p>',
    );
    const mockQuill = {
      getSemanticHTML: legacyFunction,
    } as unknown as any;

    quillNbspFix(mockQuill);

    const result = mockQuill.getSemanticHTML(0, 10);
    expect(result).toBe('<p>text more</p>');
  });

  it('should handle mixed nbsp sequences', () => {
    const legacyFunction = vi.fn().mockReturnValue(
      '<p>&nbsp;&nbsp;text&nbsp; more</p>',
    );
    const mockQuill = {
      getSemanticHTML: legacyFunction,
    } as unknown as any;

    quillNbspFix(mockQuill);

    const result = mockQuill.getSemanticHTML(0, 15);
    expect(result).toBe('<p>&nbsp; text  more</p>');
  });

  it('should handle text without nbsp', () => {
    const legacyFunction = vi.fn().mockReturnValue(
      '<p>normal text</p>',
    );
    const mockQuill = {
      getSemanticHTML: legacyFunction,
    } as unknown as any;

    quillNbspFix(mockQuill);

    const result = mockQuill.getSemanticHTML(0, 10);
    expect(result).toBe('<p>normal text</p>');
  });

  it('should preserve empty string', () => {
    const legacyFunction = vi.fn().mockReturnValue('');
    const mockQuill = {
      getSemanticHTML: legacyFunction,
    } as unknown as any;

    quillNbspFix(mockQuill);

    const result = mockQuill.getSemanticHTML(0, 0);
    expect(result).toBe('');
  });

  it('should call legacy method with correct parameters', () => {
    const legacyMethod = vi.fn().mockReturnValue('<p>&nbsp;&nbsp;</p>');
    const mockQuill = {
      getSemanticHTML: legacyMethod,
    } as unknown as any;

    quillNbspFix(mockQuill);

    mockQuill.getSemanticHTML(5, 10);

    expect(mockQuill.legacyGetSemanticHTML).toHaveBeenCalledWith(5, 10);
  });
});
