export interface GoogleAccountProfile {
  isConnected: boolean;
  email: string;
  name: string;
  avatarUrl?: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // timestamp ms
  connectedAt: string;
  scopes: string[];
}

export type EnvironmentMode = 'sandbox' | 'live';

const STORAGE_KEY_AUTH = 'omnimind_google_auth';
const STORAGE_KEY_MODE = 'omnimind_environment_mode';

const DEFAULT_AUTH: GoogleAccountProfile = {
  isConnected: false,
  email: 'ishukhan8661@gmail.com',
  name: 'Ishu Khan',
  accessToken: '',
  refreshToken: '',
  expiresAt: 0,
  connectedAt: '',
  scopes: [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/calendar.readonly',
  ],
};

export const GOOGLE_SCOPES_INFO = [
  {
    service: 'Google Drive',
    scope: 'https://www.googleapis.com/auth/drive.readonly',
    shortName: 'drive.readonly',
    description: 'Read and index your documents, spreadsheets, presentations, and files in Drive.',
    badgeColor: 'text-blue-400 bg-blue-950/60 border-blue-800/50',
  },
  {
    service: 'Gmail',
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
    shortName: 'gmail.readonly',
    description: 'Parse email threads, action items, board updates, and calendar invite attachments.',
    badgeColor: 'text-rose-400 bg-rose-950/60 border-rose-800/50',
  },
  {
    service: 'Google Calendar',
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    shortName: 'calendar.readonly',
    description: 'Access schedules, attendee responses, meeting agendas, and Google Meet video links.',
    badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-800/50',
  },
];

export function getGoogleAuthProfile(): GoogleAccountProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUTH);
    if (raw) {
      return { ...DEFAULT_AUTH, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.error('Failed to parse Google Auth Profile:', err);
  }
  return DEFAULT_AUTH;
}

export function saveGoogleAuthProfile(profile: GoogleAccountProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent('omnimind:google-auth-change', { detail: profile }));
  } catch (err) {
    console.error('Failed to save Google Auth Profile:', err);
  }
}

export function getEnvironmentMode(): EnvironmentMode {
  try {
    const mode = localStorage.getItem(STORAGE_KEY_MODE) as EnvironmentMode;
    if (mode === 'live' || mode === 'sandbox') {
      return mode;
    }
  } catch (_) {}
  return 'sandbox';
}

export function setEnvironmentMode(mode: EnvironmentMode): void {
  try {
    localStorage.setItem(STORAGE_KEY_MODE, mode);
    window.dispatchEvent(new CustomEvent('omnimind:mode-change', { detail: mode }));
  } catch (err) {
    console.error('Failed to save Environment Mode:', err);
  }
}

export async function simulateGoogleOAuthLogin(
  customEmail = 'ishukhan8661@gmail.com',
  customName = 'Ishu Khan'
): Promise<GoogleAccountProfile> {
  // Simulate network latency for authorization code grant exchange
  await new Promise((res) => setTimeout(res, 800));

  const randomHash = Math.random().toString(36).substring(2, 14);
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const profile: GoogleAccountProfile = {
    isConnected: true,
    email: customEmail,
    name: customName,
    accessToken: `ya29.a0AfH6SM_${randomHash}_sec789q`,
    refreshToken: `1//04${randomHash}_refresh_token_omnimind`,
    expiresAt: Date.now() + 3600 * 1000,
    connectedAt: `Today at ${timeStr}`,
    scopes: [
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/calendar.readonly',
    ],
  };

  saveGoogleAuthProfile(profile);
  // Auto-switch to live personal account mode upon connection
  setEnvironmentMode('live');

  return profile;
}

export function disconnectGoogleAccount(): void {
  const resetProfile: GoogleAccountProfile = {
    ...DEFAULT_AUTH,
    isConnected: false,
    accessToken: '',
    refreshToken: '',
    expiresAt: 0,
    connectedAt: '',
  };
  saveGoogleAuthProfile(resetProfile);
  // Revert back to sandbox mode
  setEnvironmentMode('sandbox');
}
