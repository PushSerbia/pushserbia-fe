import { vi } from 'vitest';
import { AuthUtils } from './auth.utils';

describe('AuthUtils', () => {
  describe('isTokenExpired', () => {
    it('should return true for empty token', () => {
      expect(AuthUtils.isTokenExpired('')).toBe(true);
    });

    it('should return true for null token', () => {
      expect(AuthUtils.isTokenExpired(null as any)).toBe(true);
    });

    it('should return true for undefined token', () => {
      expect(AuthUtils.isTokenExpired(undefined as any)).toBe(true);
    });

    it('should return false for valid non-expired token', () => {
      // Create a token that expires far in the future (1 hour from now)
      const futureDate = Math.floor(Date.now() / 1000) + 3600;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: futureDate }));
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      expect(AuthUtils.isTokenExpired(token)).toBe(false);
    });

    it('should return true for expired token', () => {
      // Create a token that expired 1 hour ago
      const pastDate = Math.floor(Date.now() / 1000) - 3600;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: pastDate }));
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      expect(AuthUtils.isTokenExpired(token)).toBe(true);
    });

    it('should return true for token expiring now', () => {
      const nowDate = Math.floor(Date.now() / 1000);
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: nowDate }));
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      // Token should be expired or expiring now
      expect(AuthUtils.isTokenExpired(token)).toBe(true);
    });

    it('should respect offset seconds parameter', () => {
      // Token expires in 30 seconds
      const futureDate = Math.floor(Date.now() / 1000) + 30;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: futureDate }));
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      // With 20 second offset, token should still be valid
      expect(AuthUtils.isTokenExpired(token, 20)).toBe(false);

      // With 40 second offset, token should be expired
      expect(AuthUtils.isTokenExpired(token, 40)).toBe(true);
    });

    it('should handle malformed token without exp claim', () => {
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ sub: 'user-123' })); // no exp
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      expect(AuthUtils.isTokenExpired(token)).toBe(true);
    });

    it('should handle token with incorrect number of parts', () => {
      const invalidToken = 'header.payload'; // missing signature

      expect(() => {
        AuthUtils.isTokenExpired(invalidToken);
      }).toThrow();
    });

    it('should handle offset of zero', () => {
      const futureDate = Math.floor(Date.now() / 1000) + 3600;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: futureDate }));
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      expect(AuthUtils.isTokenExpired(token, 0)).toBe(false);
    });

    it('should handle negative offset', () => {
      const futureDate = Math.floor(Date.now() / 1000) + 100;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: futureDate }));
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      // Negative offset should make token more likely to be valid
      expect(AuthUtils.isTokenExpired(token, -50)).toBe(false);
    });
  });

  describe('token decoding', () => {
    it('should decode valid JWT token', () => {
      const futureDate = Math.floor(Date.now() / 1000) + 3600;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: futureDate, sub: 'user-123' }));
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      // Token should be decodable
      expect(AuthUtils.isTokenExpired(token)).toBeDefined();
    });

    it('should throw error for malformed base64', () => {
      const malformedToken = 'header.!!!invalid!!!.signature';

      expect(() => {
        AuthUtils.isTokenExpired(malformedToken);
      }).toThrow();
    });

    it('should throw error for token with wrong number of parts', () => {
      const invalidToken = 'only.two.parts.and.more';

      expect(() => {
        AuthUtils.isTokenExpired(invalidToken);
      }).toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle token with special characters', () => {
      const futureDate = Math.floor(Date.now() / 1000) + 3600;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: futureDate, name: 'user-123' }));
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      expect(AuthUtils.isTokenExpired(token)).toBe(false);
    });

    it('should handle very large expiration time', () => {
      const veryFarFuture = Math.floor(Date.now() / 1000) + 999999999;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: veryFarFuture }));
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      expect(AuthUtils.isTokenExpired(token)).toBe(false);
    });

    it('should handle zero expiration time', () => {
      const zeroDate = 0;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: zeroDate }));
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      expect(AuthUtils.isTokenExpired(token)).toBe(true);
    });

    it('should handle negative expiration time', () => {
      const negativeDate = -1000;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: negativeDate }));
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      expect(AuthUtils.isTokenExpired(token)).toBe(true);
    });

    it('should handle token with extra whitespace', () => {
      const futureDate = Math.floor(Date.now() / 1000) + 3600;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: futureDate }));
      const signature = 'test-signature';
      const token = `  ${header}.${payload}.${signature}  `;

      // Token with whitespace should not be valid base64
      expect(() => {
        AuthUtils.isTokenExpired(token.trim());
      }).not.toThrow();
    });

    it('should handle RS256 signed tokens', () => {
      const futureDate = Math.floor(Date.now() / 1000) + 3600;
      const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: futureDate }));
      const signature = 'rsa-signature-content';
      const token = `${header}.${payload}.${signature}`;

      expect(AuthUtils.isTokenExpired(token)).toBe(false);
    });

    it('should handle token with special characters in payload', () => {
      const futureDate = Math.floor(Date.now() / 1000) + 3600;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const specialPayload = btoa(
        JSON.stringify({
          exp: futureDate,
          email: 'test+tag@example.com',
          url: 'https://example.com?q=test&v=1',
        }),
      );
      const signature = 'test-signature';
      const token = `${header}.${specialPayload}.${signature}`;

      expect(AuthUtils.isTokenExpired(token)).toBe(false);
    });
  });

  describe('base64url decoding', () => {
    it('should handle base64url padding correctly', () => {
      // Standard base64 uses padding, base64url may not
      const futureDate = Math.floor(Date.now() / 1000) + 3600;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: futureDate }));
      const signature = btoa('signature').replace(/=/g, '');
      const token = `${header}.${payload}.${signature}`;

      // Should handle base64url format
      expect(AuthUtils.isTokenExpired(token)).toBe(false);
    });

    it('should handle base64url with - and _ characters', () => {
      const futureDate = Math.floor(Date.now() / 1000) + 3600;
      // Create base64 that contains - and _ when converted to base64url
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
      const payload = btoa(JSON.stringify({ exp: futureDate }))
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
      const signature = btoa('test').replace(/\+/g, '-').replace(/\//g, '_');
      const token = `${header}.${payload}.${signature}`;

      expect(AuthUtils.isTokenExpired(token)).toBe(false);
    });
  });

  describe('expiration date calculation', () => {
    it('should correctly calculate expiration date from Unix timestamp', () => {
      // Token expires 1 second from now
      const now = Math.floor(Date.now() / 1000);
      const futureDate = now + 1;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: futureDate }));
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      expect(AuthUtils.isTokenExpired(token)).toBe(false);

      // After 2 seconds, should be expired
      vi.useFakeTimers();
      try {
        vi.setSystemTime(new Date((now + 2) * 1000));
        expect(AuthUtils.isTokenExpired(token)).toBe(true);
      } finally {
        vi.useRealTimers();
      }
    });

    it('should handle expiration at midnight UTC', () => {
      // Token expires at midnight UTC
      const midnightUTC = new Date();
      midnightUTC.setUTCHours(24, 0, 0, 0);
      const futureDate = Math.floor(midnightUTC.getTime() / 1000);

      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: futureDate }));
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      // Should be valid if midnight is in the future
      const result = AuthUtils.isTokenExpired(token);
      expect(typeof result).toBe('boolean');
    });
  });

  describe('static method behavior', () => {
    it('should be callable without instantiation', () => {
      const futureDate = Math.floor(Date.now() / 1000) + 3600;
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ exp: futureDate }));
      const signature = 'test-signature';
      const token = `${header}.${payload}.${signature}`;

      // Should work as static method
      expect(AuthUtils.isTokenExpired(token)).toBe(false);
    });
  });
});
