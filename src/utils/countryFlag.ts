/**
 * Convert a country name (as returned by Cloudflare RUM `countryName`)
 * into an ISO-3166-1 alpha-2 code and a flag emoji.
 *
 * Cloudflare may also return ISO-2 codes directly in some datasets, so we
 * accept both. Falls back to a globe glyph for unknown values.
 */

const NAME_TO_CODE: Record<string, string> = {
  'Brazil': 'BR',
  'United States': 'US',
  'United States of America': 'US',
  'Portugal': 'PT',
  'Spain': 'ES',
  'Mexico': 'MX',
  'Argentina': 'AR',
  'Chile': 'CL',
  'Colombia': 'CO',
  'Peru': 'PE',
  'Uruguay': 'UY',
  'Paraguay': 'PY',
  'Canada': 'CA',
  'United Kingdom': 'GB',
  'Germany': 'DE',
  'France': 'FR',
  'Italy': 'IT',
  'Netherlands': 'NL',
  'Belgium': 'BE',
  'Switzerland': 'CH',
  'Austria': 'AT',
  'Sweden': 'SE',
  'Norway': 'NO',
  'Denmark': 'DK',
  'Finland': 'FI',
  'Ireland': 'IE',
  'Poland': 'PL',
  'Czech Republic': 'CZ',
  'Russia': 'RU',
  'Ukraine': 'UA',
  'Turkey': 'TR',
  'India': 'IN',
  'China': 'CN',
  'Japan': 'JP',
  'South Korea': 'KR',
  'Taiwan': 'TW',
  'Hong Kong': 'HK',
  'Singapore': 'SG',
  'Indonesia': 'ID',
  'Philippines': 'PH',
  'Vietnam': 'VN',
  'Thailand': 'TH',
  'Malaysia': 'MY',
  'Australia': 'AU',
  'New Zealand': 'NZ',
  'South Africa': 'ZA',
  'Egypt': 'EG',
  'Nigeria': 'NG',
  'Morocco': 'MA',
  'Israel': 'IL',
  'United Arab Emirates': 'AE',
  'Saudi Arabia': 'SA',
  'Pakistan': 'PK',
  'Bangladesh': 'BD'
}

export function countryNameToCode(input: string): string {
  if (!input) return ''
  // already an ISO-2 code
  if (/^[A-Z]{2}$/.test(input)) return input
  return NAME_TO_CODE[input] ?? ''
}

export function countryFlag(input: string): string {
  const code = countryNameToCode(input)
  if (!code) return '🌐'
  const A = 0x1f1e6 // Regional Indicator Symbol Letter A
  const codePoints = [...code.toUpperCase()].map(c => A + (c.charCodeAt(0) - 65))
  return String.fromCodePoint(...codePoints)
}
