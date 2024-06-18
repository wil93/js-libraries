import { useMemo } from "react";

import clsx from "clsx";
import { getHighlighter } from "shiki";

// @ts-ignore
import style from "./code.module.css";
import { CodeProps } from "./index";
import srs from "./srs";

const highlighter = await getHighlighter({
  themes: ["github-light", "github-dark"],
  langs: [srs],
});

export default function CodeHighlight({ code, lang, inline, className }: CodeProps) {
  const loadedLangs = highlighter.getLoadedLanguages();
  if (lang !== "srs" && lang !== "text" && !loadedLangs.includes(lang)) {
    throw highlighter.loadLanguage(lang);
  }

  const html = useMemo(() => {
    return highlighter.codeToHtml(code, {
      lang,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      structure: inline ? "inline" : "classic",
      transformers: [
        {
          pre(node) {
            this.addClassToHast(node, style.pre);
          },
        },
      ],
    });
  }, [code, lang, inline]);

  return inline ? (
    <span className="not-prose">
      <code dangerouslySetInnerHTML={{ __html: html }} className={clsx("shiki", className)} />
    </span>
  ) : (
    <div dangerouslySetInnerHTML={{ __html: html }} className={clsx("not-prose", className)} />
  );
}
