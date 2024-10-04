import marked from "marked";
import sanitize from "sanitize-html";
import turndown from "turndown";
// const sanitizeHtmlLibrary = require("sanitize-html");

function sanitizeMarkdownContent(markdownContent: string): string {
  const turndownService = new turndown();

  // 1. Convert markdown to html
  const convertedHtml = marked.parse(markdownContent) as string;

  // 2. Sanitize html
  const sanitizedHtml = sanitize(convertedHtml, {
    allowedTags: sanitize.defaults.allowedTags.concat(["img"]),
  });

  // 3. Convert the sanitized html back to markdown
  const sanitizedMarkdown = turndownService.turndown(sanitizedHtml);

  return sanitizedMarkdown;
}

export default sanitizeMarkdownContent;
