export const whyUsIcons = ["warranty", "experts", "delivery", "support"] as const;

import { promos as rawPromos, testimonials as rawTestimonials, stats as rawStats } from "@/lib/data/site";

export const promos = rawPromos;
export const testimonials = rawTestimonials;
export const stats = rawStats;
