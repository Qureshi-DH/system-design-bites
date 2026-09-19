# Contributing

Thanks for helping. The whole point of this repo is that every page is short, plain, and correct. These rules keep it that way.

## The page format

Every concept page has the same shape:

````markdown
# Concept Name

> One or two sentences. If someone reads only this line, they get the idea.

## How it works

The mechanism, the main variants, the tradeoff, and the classic mistake.

## Example

One real looking system with real numbers.

## Picture it

```mermaid
flowchart LR
    U["User"] --> LB["Load balancer"]
```

One or two sentences on what to look at in the diagram.

## Related

[Another Concept](another-concept.md) · [One More](../other-section/one-more.md)
````

## How to write

- Write like you are explaining it to a smart friend. Short sentences, plain words.
- Explain every term the first time you use it, in the same sentence.
- Use real numbers. "200 ms" beats "fast".
- Always include the classic mistake. That is usually the part people remember.
- No dashes as punctuation and no hyphenated words in the text. Use a period or a comma.
- Keep "How it works" under about 300 words and the example under about 190.

## Diagrams

- Use mermaid, so GitHub draws it for you.
- Quote every label: `DB[("Postgres")]`, `LB["Load balancer"]`.
- No custom colors. The diagram has to look right in light and dark mode.
- Show the idea inside a system: clients, services, caches, queues, databases.

## Animations

Every page opens with a small looping animation from `assets/animations/`. They are plain SVG files animated with SMIL, so GitHub plays them right on the page with no scripts.

- One idea per animation, on a loop of 6 to 10 seconds that resets cleanly.
- Same dark card, same layout, and colors that always mean the same thing: cyan for requests and data, green for success, red for failure, yellow for the focus of the page, orange for warnings.
- Short labels, text no smaller than 11 px, and a one line caption at the bottom.
- No scripts, no external fonts or images.

## Fixing something

Small fixes are welcome as they are. For a new concept, open an issue first so we can agree on where it fits.
