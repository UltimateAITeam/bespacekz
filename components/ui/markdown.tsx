import { FC, memo } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { cn } from "@/libs/utils";

const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className,
);

// rehypeRaw превращает HTML-теги из ответа модели в реальные узлы, а
// rehypeSanitize вырезает всё небезопасное — порядок плагинов важен.
const REHYPE_PLUGINS = [
  rehypeRaw,
  rehypeSanitize,
] satisfies Options["rehypePlugins"];
const REMARK_PLUGINS = [
  remarkGfm,
  remarkMath,
] satisfies Options["remarkPlugins"];

type AiMarkdownProps = {
  children: string;
  className?: string;
};

/**
 * Рендерит ответ ИИ: Markdown как разметку, а случайные HTML-теги — как
 * форматирование, а не как видимый текст.
 */
export const AiMarkdown: FC<AiMarkdownProps> = ({ children, className }) => (
  <MemoizedReactMarkdown
    className={cn(
      "prose prose-sm dark:prose-invert max-w-none break-words prose-p:leading-relaxed prose-pre:p-0",
      className,
    )}
    remarkPlugins={REMARK_PLUGINS}
    rehypePlugins={REHYPE_PLUGINS}
  >
    {children}
  </MemoizedReactMarkdown>
);
