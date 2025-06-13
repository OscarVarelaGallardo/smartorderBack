
const handleSlug = async (word: string, options?: { lower?: boolean; replacement?: string }) => {
    const slug = (await import('slug')).default;
    return slug(word, options)
}

export default handleSlug