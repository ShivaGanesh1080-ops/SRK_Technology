import fs from 'fs';
import path from 'path';

const settingsPath = path.join(process.cwd(), 'data', 'settings.json');

export interface AppSettings {
  paymentUpiId: string;
  paymentInstructions: string;
}

const defaultSettings: AppSettings = {
  paymentUpiId: "srktechnology@sbi",
  paymentInstructions: "Please scan the QR code or send exactly ₹{amount} to the UPI ID above. Upload a clear screenshot showing the UTR/Transaction ID."
};

export function getSettings(): AppSettings {
  try {
    if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
      fs.mkdirSync(path.join(process.cwd(), 'data'));
    }
    
    if (fs.existsSync(settingsPath)) {
      const data = fs.readFileSync(settingsPath, 'utf8');
      return JSON.parse(data);
    }
    return defaultSettings;
  } catch (error) {
    console.error("Failed to read settings:", error);
    return defaultSettings;
  }
}

export function saveSettings(settings: Partial<AppSettings>) {
  const current = getSettings();
  const updated = { ...current, ...settings };
  
  if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
  }
  
  fs.writeFileSync(settingsPath, JSON.stringify(updated, null, 2));
  return updated;
}
