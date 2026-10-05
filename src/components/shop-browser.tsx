"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import {
  products,
  brandLabels,
  categoryLabels,
  type Brand,
  type Product,
  type ProductCategory,
} from "@/lib/data/products";
import { useI18n } from "@/components/providers";
import { ProductCard } from "@/components/product-card";
import { EmptyState, LocaleLink } from "@/components/ui";
import { cn } from "@/lib/utils";

type SortKey = "newest" | "priceAsc" | "priceDesc" | "rating";

export function ShopBrowser({
  initialQuery,
  initialBrand,
  initialCategory,
}: {
  initialQuery?: string;
  initialBrand?: string;
  initialCategory?: string;
}) {
  const { locale, dict } = useI18n();
  const [brands, setBrands] = useState<Brand[]>(
    initialBrand && initialBrand in brandLabels ? [initialBrand as Brand] : [],
  );
  const [categories, setCategories] = useState<ProductCategory[]>(
    initialCategory && initialCategory in categoryLabels
      ? [initialCategory as ProductCategory]
      : [],
  );
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("newest");
  const [q, setQ] = useState(initialQuery ?? "");
  const [mobileFilters, setMobileFilters] = useState(false);

  const toggle = <T,>(list: T[], value: T, set: (v: T[]) => void) => {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const clearAll = () => {
    setBrands([]);
    setCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
    setQ("");
    setSort("newest");
  };

  const filtered = useMemo(() => {
    let list = [...products];
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (p) =>
          p.name.en.toLowerCase().includes(query) ||
          p.name.fa.includes(query) ||
          p.tagline.en.toLowerCase().includes(query) ||
          p.tagline.fa.includes(query) ||
          brandLabels[p.brand].en.toLowerCase().includes(query) ||
          brandLabels[p.brand].fa.includes(query),
      );
    }
    if (brands.length) list = list.filter((p) => brands.includes(p.brand));
    if (categories.length) list = list.filter((p) => categories.includes(p.category));
    if (minPrice) list = list.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) list = list.filter((p) => p.price <= Number(maxPrice));
    if (inStockOnly) list = list.filter((p) => p.inStock);

    switch (sort) {
      case "priceAsc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.releasedAt.localeCompare(a.releasedAt));
    }
    return list;
  }, [q, brands, categories, minPrice, maxPrice, inStockOnly, sort]);

  const activeCount =
    brands.length +
    categories.length +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const filtersPanel = (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-bold" htmlFor="shop-q">
          {dict.common.search}
        </label>
        <input
          id="shop-q"
          className="input text-sm"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={dict.common.searchPlaceholder}
        />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-bold">
          {dict.shop.filters.brand}
        </legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(brandLabels) as Brand[]).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => toggle(brands, b, setBrands)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                brands.includes(b)
                  ? "border-brand bg-brand-soft text-brand"
                  : "border-border text-muted hover:border-brand",
              )}
            >
              {brandLabels[b][locale]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-bold">
          {dict.shop.filters.category}
        </legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(categoryLabels) as ProductCategory[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => toggle(categories, c, setCategories)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                categories.includes(c)
                  ? "border-brand bg-brand-soft text-brand"
                  : "border-border text-muted hover:border-brand",
              )}
            >
              {categoryLabels[c][locale]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-bold">
          {dict.shop.filters.price}
        </legend>
        <div className="flex items-center gap-2">
          <input
            className="input text-sm"
            inputMode="numeric"
            placeholder={dict.shop.filters.priceMin}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value.replace(/\D/g, ""))}
            aria-label={dict.shop.filters.priceMin}
          />
          <span className="text-muted">–</span>
          <input
            className="input text-sm"
            inputMode="numeric"
            placeholder={dict.shop.filters.priceMax}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, ""))}
            aria-label={dict.shop.filters.priceMax}
          />
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          className="size-4 accent-[var(--brand)]"
        />
        {dict.shop.filters.inStockOnly}
      </label>

      <button type="button" className="btn btn-secondary btn-sm w-full" onClick={clearAll}>
        {dict.common.clearAll}
      </button>
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
      <aside className="hidden lg:block">
        <div className="card sticky top-28 p-5">{filtersPanel}</div>
      </aside>

      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {dict.common.results.replace("{count}", String(filtered.length))}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn btn-secondary btn-sm lg:hidden"
              onClick={() => setMobileFilters(true)}
            >
              <SlidersHorizontal className="size-4" />
              {dict.common.filters}
              {activeCount ? ` (${activeCount})` : ""}
            </button>
            <select
              className="input w-auto py-1.5 text-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label={dict.shop.filters.sort}
            >
              <option value="newest">{dict.shop.filters.sortNewest}</option>
              <option value="priceAsc">{dict.shop.filters.sortPriceAsc}</option>
              <option value="priceDesc">{dict.shop.filters.sortPriceDesc}</option>
              <option value="rating">{dict.shop.filters.sortRating}</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title={dict.common.noResults}
            action={
              <button type="button" className="btn btn-primary btn-sm" onClick={clearAll}>
                {dict.common.clearAll}
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {mobileFilters ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFilters(false)}
            aria-label={dict.common.close}
          />
          <div className="absolute inset-y-0 start-0 w-[min(90vw,20rem)] overflow-y-auto border-e border-border bg-surface p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold">{dict.common.filters}</h2>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setMobileFilters(false)}
                aria-label={dict.common.close}
              >
                <X className="size-5" />
              </button>
            </div>
            {filtersPanel}
            <button
              type="button"
              className="btn btn-primary mt-4 w-full"
              onClick={() => setMobileFilters(false)}
            >
              {dict.common.apply}
            </button>
          </div>
        </div>
      ) : null}

      <span className="sr-only">
        <LocaleLink href="/shop">{dict.nav.shop}</LocaleLink>
      </span>
    </div>
  );
}
