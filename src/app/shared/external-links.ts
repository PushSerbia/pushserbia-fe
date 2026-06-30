// Direct workspace join URL (avoids the extra 302 hop that the
// join.slack.com/t/... invite link performs).
export const SLACK_INVITE_URL =
  'https://pushserbia.slack.com/join/shared_invite/zt-34h9oiyc4-w8eLTnI9f5I6EbTueg8HWQ';

export const EXTERNAL_LINKS = {
  // Link straight to the Slack workspace instead of the internal
  // `/pridruzi-se-slack` route. The internal route only 301-redirects here, so
  // pointing at it from navigation/footer created "links to redirect" and
  // "nofollow internal link" SEO warnings on every page. Linking directly to
  // the external destination removes the redirect hop entirely.
  slack: SLACK_INVITE_URL,
  github: 'https://github.com/pushserbia',
  linkedin: 'https://www.linkedin.com/company/pushserbia',
} as const;
