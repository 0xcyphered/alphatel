import Link from "next/link";
import { getDictionary } from "@/i18n/dictionary";

export default function NotFound() {
  const dict = getDictionary();
  return (
    <div className="container-page flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-7xl font-extrabold text-brand-soft">404</p>
      <h1 className="text-2xl font-bold">{dict.notFound.title}</h1>
      <p className="max-w-md text-muted">{dict.notFound.text}</p>
      <Link href="/" className="btn btn-primary">
        {dict.notFound.home}
      </Link>
    </div>
  );
}
