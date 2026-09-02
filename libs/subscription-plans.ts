export type SubscriptionPlanId = "base" | "standard" | "premium";

export interface SubscriptionPlan {
  id: SubscriptionPlanId;
  name: string;
  /** Monthly price in KZT. */
  amount: number;
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionPlanId, SubscriptionPlan> = {
  base: { id: "base", name: "Базовый", amount: 7000 },
  standard: { id: "standard", name: "Стандарт", amount: 18000 },
  premium: { id: "premium", name: "Премиум", amount: 25000 },
};

export function isSubscriptionPlanId(
  value: string | null | undefined,
): value is SubscriptionPlanId {
  return value != null && value in SUBSCRIPTION_PLANS;
}

/** Formats a KZT amount as "7 000" using a non-breaking thousands separator. */
export function formatKzt(amount: number): string {
  return amount.toLocaleString("ru-RU");
}
