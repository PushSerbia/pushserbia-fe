import { MaybeAsync, RedirectFunction, UrlTree } from '@angular/router';
import { getPreferredLang } from './get-prefered-lang';

export function rootRedirect(): MaybeAsync<string | UrlTree> {
  return `/${getPreferredLang()}`;
}

export function wildcardRedirect(data: any) {
  const lang = getPreferredLang();
  const segments = (data.url ?? []).map((s: any) => s.path).filter(Boolean);
  const first = segments[0] ?? '';

  // If already prefixed with supported lang, keep as-is
  if (first === 'sr' || first === 'en') {
    return (
      `/${segments.join('/')}` +
      buildQueryAndFragment(data.queryParams, data.fragment)
    );
  }

  // Build new URL with preferred lang
  const path = segments.length ? `/${segments.join('/')}` : '';
  const base = `/${lang}${path}`;
  return base + buildQueryAndFragment(data.queryParams, data.fragment);
}

function buildQueryAndFragment(
  queryParams: Record<string, any> | undefined,
  fragment: string | null | undefined,
): string {
  const qp =
    queryParams && Object.keys(queryParams).length
      ? '?' +
        new URLSearchParams(
          Object.entries(queryParams).reduce<Record<string, string>>(
            (acc, [k, v]) => {
              // Normalize values to string for URLSearchParams
              if (v == null) {
                return acc;
              }
              if (Array.isArray(v)) {
                // Repeat key for array values
                v.forEach((val) => {
                  acc[k] = String(val);
                });
              } else {
                acc[k] = String(v);
              }
              return acc;
            },
            {},
          ),
        ).toString()
      : '';
  const frag = fragment ? `#${fragment}` : '';
  return `${qp}${frag}`;
}
