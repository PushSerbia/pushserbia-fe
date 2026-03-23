// https://github.com/slab/quill/issues/4535#issuecomment-2838716249

import Quill from "quill";

type QuillWithSemanticHTML = Quill & {
  legacyGetSemanticHTML?: typeof Quill.prototype.getSemanticHTML;
  getSemanticHTML: typeof Quill.prototype.getSemanticHTML;
};

export function quillNbspFix(quill: QuillWithSemanticHTML): void {
  quill.legacyGetSemanticHTML = quill.getSemanticHTML;
  quill.getSemanticHTML = ((a: number, b: number) =>
    quill
      .legacyGetSemanticHTML!(a, b)
      .replaceAll(/((?:&nbsp;)*)&nbsp;/g, '$1 ')) as typeof Quill.prototype.getSemanticHTML;
}
