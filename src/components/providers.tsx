"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { ThemeProvider } from "next-themes";
import type { Dictionary } from "@/i18n/dictionary";
import { dirMap, type Locale } from "@/i18n/config";

export function applyDocumentLocale(locale: Locale) {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = dirMap[locale];
}

export type CartLine = {
  id: string;
  slug: string;
  name: { en: string; fa: string };
  price: number;
  qty: number;
  art: { type: string; from: string; to: string };
  href: string;
};

type I18nValue = {
  locale: Locale;
  dir: "rtl" | "ltr";
  dict: Dictionary;
};

const I18nContext = createContext<I18nValue | null>(null);

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function I18nProvider({
  locale,
  dict,
  children,
}: I18nValue & { children: ReactNode }) {
  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const value = useMemo(
    () => ({ locale, dir: dirMap[locale], dict }),
    [locale, dict],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

const CART_KEY = "alphatel-cart";

type CartStoreState = {
  lines: CartLine[];
  isOpen: boolean;
  lastAdded: string | null;
};

let cartState: CartStoreState = {
  lines: [],
  isOpen: false,
  lastAdded: null,
};
let cartInitialized = false;
const cartListeners = new Set<() => void>();

function hydrateCart() {
  if (cartInitialized || typeof window === "undefined") return;
  cartInitialized = true;
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CartLine[];
      if (Array.isArray(parsed)) cartState = { ...cartState, lines: parsed };
    }
  } catch {
    /* ignore */
  }
}

function persistCart() {
  if (!cartInitialized) return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartState.lines));
  } catch {
    /* ignore */
  }
}

function updateCart(updater: (state: CartStoreState) => CartStoreState) {
  hydrateCart();
  cartState = updater(cartState);
  persistCart();
  cartListeners.forEach((listener) => listener());
}

function subscribeCart(listener: () => void) {
  hydrateCart();
  cartListeners.add(listener);
  return () => {
    cartListeners.delete(listener);
  };
}

function getCartSnapshot(): CartStoreState {
  hydrateCart();
  return cartState;
}

function getCartServerSnapshot(): CartStoreState {
  return cartState;
}

type CartValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  lastAdded: string | null;
};

const CartContext = createContext<CartValue | null>(null);

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

function CartProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getCartServerSnapshot,
  );

  const add = useCallback((line: Omit<CartLine, "qty">, qty = 1) => {
    updateCart((prev) => {
      const existing = prev.lines.find((l) => l.id === line.id);
      const lines = existing
        ? prev.lines.map((l) =>
            l.id === line.id ? { ...l, qty: Math.min(l.qty + qty, 99) } : l,
          )
        : [...prev.lines, { ...line, qty }];
      return { ...prev, lines, isOpen: true, lastAdded: line.id };
    });
    window.setTimeout(() => {
      updateCart((prev) =>
        prev.lastAdded === line.id ? { ...prev, lastAdded: null } : prev,
      );
    }, 2000);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    updateCart((prev) => ({
      ...prev,
      lines:
        qty <= 0
          ? prev.lines.filter((l) => l.id !== id)
          : prev.lines.map((l) => (l.id === id ? { ...l, qty } : l)),
    }));
  }, []);

  const remove = useCallback((id: string) => {
    updateCart((prev) => ({
      ...prev,
      lines: prev.lines.filter((l) => l.id !== id),
    }));
  }, []);

  const clear = useCallback(() => {
    updateCart((prev) => ({ ...prev, lines: [] }));
  }, []);

  const setOpen = useCallback((open: boolean) => {
    updateCart((prev) => ({ ...prev, isOpen: open }));
  }, []);

  const value = useMemo<CartValue>(
    () => ({
      lines: state.lines,
      count: state.lines.reduce((sum, l) => sum + l.qty, 0),
      subtotal: state.lines.reduce((sum, l) => sum + l.price * l.qty, 0),
      add,
      setQty,
      remove,
      clear,
      isOpen: state.isOpen,
      setOpen,
      lastAdded: state.lastAdded,
    }),
    [state, add, setQty, remove, clear, setOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

type ToastItem = { id: number; message: string };
type ToastValue = {
  toasts: ToastItem[];
  push: (message: string) => void;
};

const ToastContext = createContext<ToastValue | null>(null);

export function useToast(): ToastValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, push }}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 left-1/2 z-[100] flex w-[min(92vw,24rem)] -translate-x-1/2 flex-col gap-2"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-fade-up pointer-events-auto rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-fg shadow-lg"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function AppProviders({
  children,
  i18n,
}: {
  children: ReactNode;
  i18n: I18nValue;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <I18nProvider {...i18n}>
        <CartProvider>
          <ToastProvider>{children}</ToastProvider>
        </CartProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
