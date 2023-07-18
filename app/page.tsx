import Link from "next/link";

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      <Link href="/docs">Docs</Link>
    </div>
  );
}
