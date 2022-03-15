import MarkdownIt from 'markdown-it';

export default new MarkdownIt({
    html: false,
    breaks: true,
    linkify: true
});