---
layout: default
---

<!-- TL;DR Section -->
<details>
  <summary class="mono">tl;dr: I solve problems you don't notice until they're gone.</summary>
  <p><em>11 years of quiet fixes...</em></p>
</details>

---

### Principles, Not Tools
```html
{% raw %}<pre class="mono">
if (problem) {  
  // Solve for the edge cases first.  
  // Design for the 2nd user (the maintainer).  
  // Data is a liability if it doesn’t drive decisions.  
}
</pre>{% endraw %}
```
---

### Code as Poetry

{% raw %}
<pre class="mono">
def sanitize_input(text):
    <span class="comment"># Trust no one, not even yourself.</span>
    return html.escape(text, quote=True)
</pre>

<pre class="mono">
.grid {
  display: grid;
  <span class="comment">/* Sometimes 12 columns are 11 too many */</span>
}
</pre>
{% endraw %}

---

### Critiques, Not Brags

**Design Mistakes I Avoid**  

1. "60 FPS animations on static dashboards  
   → Motion ≠ value.  
2. User testing with perfect data  
   → Test with chaos.  

**Debugging Hall of Shame**
- "Assumed the compiler was wrong. (Spoiler: It wasn’t.) – 2016"  
- "Fought CSS !important for 3 days. Lost. – 2019"  

---

### Tools I Buried

<div class="timeline"> <span class="timeline-item">2013: jQuery</span> <span class="timeline-item">2015: Angular</span> <span class="timeline-item">2018: React</span> </div>

---

### Bookshelf of Influence

<div class="books"> 1. "Moby Dick" → Obsession with unseen systems. 2. "The Phoenix Project" → Why bottlenecks matter. 3. "The Art of War" → Debugging as strategy. </div>

