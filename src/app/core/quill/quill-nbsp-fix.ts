// https://github.com/slab/quill/issues/4535#issuecomment-2838716249


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function quillNbspFix(quill: any): void {
  quill.legacyGetSemanticHTML = quill.getSemanticHTML;
  quill.getSemanticHTML = (a: number, b: number) =>
    quill
      .legacyGetSemanticHTML(a, b)
      .replaceAll(/((?:&nbsp;)*)&nbsp;/g, '$1 ');
}
