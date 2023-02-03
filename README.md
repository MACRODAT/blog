# AUTO-COMPILING MARKDOWN BLOG

What about crafting your entire blog in Markdown, which would then be compiled as the server renders into regular HTML ? And what about using the power of SSR to statically cache se HTML pages *the first time* they are rendered so they won't have to be rendered again *unless* there is a change in your Blog ?

## The idea

- Using GraphCMS to store the data of your blog : The content, the images, the comments, the search data...
- Fetching said data to be rendered in real time to HTML
- Caching rendered data for later use.
