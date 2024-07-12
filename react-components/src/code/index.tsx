import { Suspense, lazy } from "react";

import type { BundledLanguage } from "shiki";

// @ts-ignore
import style from "./code.module.css";

const CodeHighlight = lazy(() => import("./highlight"));

export type CodeProps = {
  code: string;
  lang: BundledLanguage | "srs" | "text";
  inline?: boolean;
  className?: string;
};

export function Code({ lang, ...props }: CodeProps) {
  return (
    <Suspense fallback={<PlainCode {...props} />}>
      <CodeHighlight lang={lang} {...props} />
    </Suspense>
  );
}

function PlainCode({ code, inline, className }: Omit<CodeProps, "lang">) {
  if (inline) return <code className={className}>{code}</code>;

  return (
    <div className={className}>
      <pre className={style.pre}>
        <code>
          {code.split("\n").map((line, i) => (
            <span key={i} className="line">
              <span>{line}</span>
              <br />
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
