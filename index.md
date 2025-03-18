---
layout: default
---

<section tabindex="-1">
  <details>
    <summary class="mono">tl;dr: I solve problems you don't notice...</summary>
    <p><em>11 years of quiet fixes...</em></p>
  </details>
</section>

<section tabindex="-1">
  <h3>Principles, Not Tools</h3>
  {% raw %}<pre class="mono">
if (problem) {  
  // Solve for the edge cases first.  
  // Design for the 2nd user (the maintainer).  
  // Data is a liability if it doesn’t drive decisions.  
}</pre>{% endraw %}
</section>

<section tabindex="-1">
  <h3>Code as Poetry</h3>
  {% raw %}
  <pre class="mono">
def sanitize_input(text):
    <span class="comment"># Trust no one, not even yourself.</span>
    return html.escape(text, quote=True)</pre>
  <pre class="mono">
.grid {
  display: grid;
  <span class="comment">/* Sometimes 12 columns are 11 too many */</span>
}</pre>
  {% endraw %}
</section>

<section tabindex="-1">
  <h3>Critiques, Not Brags</h3>
  <div class="critiques">
    <h4>Design Mistakes I Avoid</h4>
    <pre>
1. "60 FPS animations on static dashboards  
   → Motion ≠ value.  
2. User testing with perfect data  
   → Test with chaos.</pre>
    <h4>Debugging Hall of Shame</h4>
    <pre>
- "Assumed the compiler was wrong. (Spoiler: It wasn’t.) – 2016"  
- "Fought CSS !important for 3 days. Lost. – 2019"</pre>
  </div>
</section>

<section tabindex="-1">
  <h3>Tools I Buried</h3>
  <div class="timeline">
    <span class="timeline-item">2013: jQuery</span>
    <span class="timeline-item">2015: Angular</span>
    <span class="timeline-item">2018: React</span>
  </div>
</section>

<section tabindex="-1">
  <h3>Bookshelf of Influence</h3>
  <div class="books">
    <p>1. "Moby Dick" → Obsession with unseen systems.</p>
    <p>2. "The Phoenix Project" → Why bottlenecks matter.</p>
    <p>3. "The Art of War" → Debugging as strategy.</p>
  </div>
</section>