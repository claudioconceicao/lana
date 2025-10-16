import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


/**
 * Merge Tailwind CSS classes conditionally.
 * Example: className={cn("p-2", isActive && "bg-orange-500")}
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date in "dd/mm/yyyy" format.
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Format a price in AOA (Kwanza)
 */
export function formatPrice(amount: number): string {
  return amount.toLocaleString("pt-AO", {
    style: "currency",
    currency: "AOA",
    minimumFractionDigits: 0,
  });
}

/**
 * Calculate estimated price based on city and nights.
 */
export function estimateStayPrice(city: string, nights: number): number {
  const cityRates: Record<string, number> = {
    Luanda: 97000,
    Benguela: 67000,
    Lubango: 54000,
    Huambo: 29000,
  };

  const rate = cityRates[city] ?? 10000;
  return nights * rate;
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}