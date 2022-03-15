export default function slugify(string = '') {
    return string.toLowerCase().trim().replace(/[^\w\s$*_+~.()!\-:@]+/g, '').replace(/[\s]+/g, '-');
}