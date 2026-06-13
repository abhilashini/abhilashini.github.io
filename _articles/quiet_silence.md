---
layout: article-layout
title: "On the shape of silence"
toc: true
tags: [essays, design]
---

This paragraph opens without a drop cap — dark, crisp, and perfectly integrated. The abstract above is now in bold serif, tying directly to your home page’s typographic voice.

Body text remains Inter. Headings are Fraunces. The reading rhythm is clear, the TOC sticky on the left (hidden on mobile), and every element speaks the same quiet language.

> “The details are not the details. They make the design.”
> <br>— Charles Eames

> Every element on this page is optional. When a piece of content appears, it inherits the same quiet language.

## 1. The measure of text

Inline code `like this` uses a highly restrained charcoal wash. [Editorial restraint](#) is underlined in purple.

![Calm mountain landscape](https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop&auto=format)
*Caption with a short rule above, warm charcoal.*
{: .img-figure }

<div class="image-grid" markdown="1">

![Mountains](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format)
*First of a pair*
{: .img-figure }

![Lake](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&auto=format)
*Second image, auto‑gridded*
{: .img-figure }

</div>

## The anatomy of lists

Here is how a standard unordered list flows within the system. Note how the bullets are slightly muted to keep the visual focus on the words.

* **First principle:** Remove all unnecessary decoration.
* **Second principle:** Ensure the container adapts to the content, not the other way around.
* **Third principle:** Treat white space as a structural element, equal in importance to ink.

## 2. When code enters

Code blocks keep the sharp white background and Prism’s own token colours — no over‑engineering. Notice how the horizontal scroll is contained entirely within the structural border on mobile.

```python
def moving_average(values, window):
    """Return a simple moving average of given window size."""
    if window < 1:
        raise ValueError("Window must be at least 1")
    result = []
    for i in range(len(values) - window + 1):
        avg = sum(values[i:i+window]) / window
        result.append(avg)
    return result

# Example usage
prices = [22, 24, 19, 18, 21, 25, 27]
print(moving_average(prices, 3))
```

Inline `like this` keeps the muted grey background, completely neutral.

## 3. Diagrams and formulas

```mermaid
graph TD
  A[Start] --> B{Is it quiet?}
  B -->|Yes| C[Keep writing]
  B -->|No| D[Remove decoration]
  D --> B
```
*No box, no border.*
{: .diagram-caption }

Another diagram:

<div class="mermaid-bleed" markdown="1">
```mermaid
graph LR
A[User Input] --> B(AI Agent);
B -->|Probabilistic Decision| C{System Logic};
C -->|Deterministic Rule| D[Database];
D -->|Feedback Loop| A;
```
</div>
*A wide LR graph breathing comfortably.*
{: .diagram-caption }

Math inline $\int_a^b f(x)\,dx$ and displayed:

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

## A broader mosaic

Here is how a mixed-orientation gallery behaves when the system auto-aligns the elements.

<div class="image-gallery" markdown="1">

![Minimalist architecture](https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1200&h=600&fit=crop&auto=format)
{: .span-2 }

![Room corner](https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=800&fit=crop&auto=format)

![Abstract shapes](https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop&auto=format)

![Building facade](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop&auto=format)
{: .span-2 }

</div>

## 4. Footnotes and ending

Footnotes are classical superscript links[^1] that point to a clean list at the end.[^2]

---

If an article has no TOC, remove the `has-toc` class and the `<aside>` — the layout falls back to a single column.

[^1]: A footnote with a back‑link
[^2]: Another note, equally clean.