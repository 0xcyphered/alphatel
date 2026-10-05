import type { Localized } from "./products";

export type DeviceTier = "flagship" | "mid" | "budget";
export type RepairIssue =
  | "screen"
  | "battery"
  | "water"
  | "software"
  | "camera"
  | "charging";

export type RepairDevice = {
  id: string;
  brand: string;
  brandLabel: Localized;
  model: string;
  tier: DeviceTier;
};

export const repairDevices: RepairDevice[] = [
  { id: "ap-15pm", brand: "Apple", brandLabel: { en: "Apple", fa: "اپل" }, model: "iPhone 15 Pro Max", tier: "flagship" },
  { id: "ap-15", brand: "Apple", brandLabel: { en: "Apple", fa: "اپل" }, model: "iPhone 15 / 15 Plus", tier: "flagship" },
  { id: "ap-14", brand: "Apple", brandLabel: { en: "Apple", fa: "اپل" }, model: "iPhone 14 Pro", tier: "flagship" },
  { id: "ap-13", brand: "Apple", brandLabel: { en: "Apple", fa: "اپل" }, model: "iPhone 13", tier: "mid" },
  { id: "ap-12", brand: "Apple", brandLabel: { en: "Apple", fa: "اپل" }, model: "iPhone 12 / 11", tier: "mid" },
  { id: "ap-se", brand: "Apple", brandLabel: { en: "Apple", fa: "اپل" }, model: "iPhone SE / XR", tier: "budget" },
  { id: "ss-s24u", brand: "Samsung", brandLabel: { en: "Samsung", fa: "سامسونگ" }, model: "Galaxy S24 / S23 Ultra", tier: "flagship" },
  { id: "ss-s23", brand: "Samsung", brandLabel: { en: "Samsung", fa: "سامسونگ" }, model: "Galaxy S23 / S22", tier: "mid" },
  { id: "ss-z", brand: "Samsung", brandLabel: { en: "Samsung", fa: "سامسونگ" }, model: "Galaxy Z Fold / Flip", tier: "flagship" },
  { id: "ss-a5x", brand: "Samsung", brandLabel: { en: "Samsung", fa: "سامسونگ" }, model: "Galaxy A5x / A3x", tier: "mid" },
  { id: "ss-m", brand: "Samsung", brandLabel: { en: "Samsung", fa: "سامسونگ" }, model: "Galaxy M series", tier: "budget" },
  { id: "mi-14", brand: "Xiaomi", brandLabel: { en: "Xiaomi", fa: "شیائومی" }, model: "Xiaomi 14 / 13", tier: "flagship" },
  { id: "mi-rn", brand: "Xiaomi", brandLabel: { en: "Xiaomi", fa: "شیائومی" }, model: "Redmi Note 13 / 12", tier: "mid" },
  { id: "mi-poco", brand: "Xiaomi", brandLabel: { en: "Xiaomi", fa: "شیائومی" }, model: "Poco / Redmi 9-12C", tier: "budget" },
  { id: "hw-p", brand: "Huawei", brandLabel: { en: "Huawei", fa: "هوآوی" }, model: "Huawei P / Mate", tier: "flagship" },
  { id: "hw-n", brand: "Huawei", brandLabel: { en: "Huawei", fa: "هوآوی" }, model: "Huawei Nova", tier: "mid" },
  { id: "gg-8", brand: "Google", brandLabel: { en: "Google", fa: "گوگل" }, model: "Pixel 8 / 7", tier: "flagship" },
  { id: "gg-a", brand: "Google", brandLabel: { en: "Google", fa: "گوگل" }, model: "Pixel 6a / 7a", tier: "mid" },
  { id: "op-12", brand: "OnePlus", brandLabel: { en: "OnePlus", fa: "وان‌پلاس" }, model: "OnePlus 12 / 11", tier: "flagship" },
  { id: "other", brand: "Other", brandLabel: { en: "Other brand", fa: "برند دیگر" }, model: "Other / not listed", tier: "mid" },
];

export const repairIssues: RepairIssue[] = [
  "screen",
  "battery",
  "water",
  "software",
  "camera",
  "charging",
];

const basePrice: Record<RepairIssue, Record<DeviceTier, number>> = {
  screen: { flagship: 14_500_000, mid: 7_800_000, budget: 4_200_000 },
  battery: { flagship: 3_400_000, mid: 2_200_000, budget: 1_500_000 },
  water: { flagship: 6_500_000, mid: 4_800_000, budget: 3_500_000 },
  software: { flagship: 1_800_000, mid: 1_400_000, budget: 1_100_000 },
  camera: { flagship: 5_200_000, mid: 3_100_000, budget: 2_000_000 },
  charging: { flagship: 2_900_000, mid: 2_100_000, budget: 1_600_000 },
};

const turnaroundHours: Record<RepairIssue, number> = {
  screen: 2,
  battery: 1,
  water: 48,
  software: 4,
  camera: 3,
  charging: 2,
};

export function estimateRepair(issue: RepairIssue, tier: DeviceTier) {
  const price = basePrice[issue][tier];
  const min = Math.round((price * 0.9) / 100_000) * 100_000;
  const max = Math.round((price * 1.1) / 100_000) * 100_000;
  return { min, max, typical: price, hours: turnaroundHours[issue] };
}

export type RepairStatus = "received" | "diagnosed" | "repairing" | "qc" | "ready";

export type RepairTicket = {
  id: string;
  device: string;
  issue: RepairIssue;
  status: RepairStatus;
  estimate: number;
  technician: string;
  updatedAt: string;
  customer: string;
  mode: "inStore" | "mailIn";
};

export const sampleTickets: RepairTicket[] = [
  {
    id: "MH-RPR-1042",
    device: "iPhone 14 Pro",
    issue: "screen",
    status: "repairing",
    estimate: 14_500_000,
    technician: "Eng. Saman R.",
    updatedAt: "2026-09-22T14:30:00",
    customer: "Sara M.",
    mode: "inStore",
  },
  {
    id: "MH-RPR-1043",
    device: "Galaxy S23 Ultra",
    issue: "battery",
    status: "diagnosed",
    estimate: 3_400_000,
    technician: "Shirin A.",
    updatedAt: "2026-09-23T10:05:00",
    customer: "Amir H.",
    mode: "mailIn",
  },
  {
    id: "MH-RPR-1044",
    device: "Xiaomi Redmi Note 12",
    issue: "water",
    status: "received",
    estimate: 4_800_000,
    technician: "—",
    updatedAt: "2026-09-23T09:00:00",
    customer: "Niloufar",
    mode: "inStore",
  },
  {
    id: "MH-RPR-1039",
    device: "iPhone 13",
    issue: "charging",
    status: "ready",
    estimate: 2_100_000,
    technician: "Kian M.",
    updatedAt: "2026-09-21T17:45:00",
    customer: "Reza K.",
    mode: "inStore",
  },
  {
    id: "MH-RPR-1040",
    device: "Pixel 8 Pro",
    issue: "software",
    status: "qc",
    estimate: 1_800_000,
    technician: "Parsa N.",
    updatedAt: "2026-09-22T20:10:00",
    customer: "Leila",
    mode: "mailIn",
  },
];

export function findTicket(id: string) {
  const normalized = id.trim().toUpperCase();
  return sampleTickets.find((t) => t.id.toUpperCase() === normalized);
}

export const statusOrder: RepairStatus[] = [
  "received",
  "diagnosed",
  "repairing",
  "qc",
  "ready",
];
