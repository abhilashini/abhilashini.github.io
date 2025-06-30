---
layout: default
---

<div class="centered-column">
  <!-- Intro Section -->
  <section class="section" id="intro">
    <p>Hi there! <strong>I'm Abhilashini</strong>. I like the juxtaposition of structured mess. It lets me handle and experience variety in various forms. Of the things that shape my thoughts, the central ones are centered around deep thinking, practicality, good food, and food for thought. Since my introduction to communicating with machines in the late 90s, it has remained integral to both my work and curiosities.</p>
    <p>This space brings together a <a href="#">snapshot of my current focus</a> and what I'm building toward. Having engineered over 80 diverse products at work, I've come to prioritize <a href="#">simplifying complexity in shared systems</a> — the bedrock of lasting, user-centric solutions. My dev journey has also taken me from building natural language systems to leveraging Generative AI in everyday tools and <a href="#">inspecting how we engage with it</a>. I do a fair bit of reading and <a href="#">curate the sparks that stayed</a> with me.</p>
    <p>My ideas take form in products on <a href="#" target="_blank">Github</a> and insights at <a href="#" target="_blank">Ctrl+Think</a>. Travel logs are at <a href="#" target="_blank">Vihaara</a>. More of my work background is on  <a href="#" target="_blank">LinkedIn</a>. Some highlights are shared below.</p>
    <div>
    <img src="https://s2.svgbox.net/illlustrations.svg?ic=programing&color=000000" width="120" height="120">
    <p>Play and Progress: A simple interface to save notes on a topic and later learn from mini games. Currently a work in progress, it is an exploration of interactive learning.</p>
    <img src="https://s2.svgbox.net/illlustrations.svg?ic=dotted-notebook&color=000000" width="90" height="90">
    <p>
    <ul>
      <li><a href="#" target="_blank">Learning Kotlin</a></li>
      <li><a href="#" target="_blank">(Re)Introducing asymptotic analysis</a></li>
    </ul>
    </p>
    </div>
  </section>

  <div class="section-divider"></div>

<h2>Simplifying the complex</h2>
<p>In solving problems, plans often deviate as complexity creeps in, assumptions falter, and past lessons fall short. These manifest multi-fold while building enterprise-wide distributed systems. I expand upon a a few concepts which are good to be equipped with while adapting to new constraints and aid continuous learning.</p>
<section class="section" id="shared-systems">
  <div class="content">
    <img src="/assets/images/foundational_principles.png" height="250" alt-text="A pencil sketch of an apple: one with basic strokes, next to a fully colored version. This abstractly represents foundational principles.">
    {% assign foundational_principles_items = site.data.philosophy | where: "section", "Foundational Principles" %}
    <p>{% include carousel.html items=foundational_principles_items %}</p>
    <img src="/assets/images/strategic_design.png" height="250" alt-text="A four-quadrant color pencil sketch shows scattered tangram shapes, then a house, a tree, and a boat, all made from tangrams. This abstractly represents strategic design.">
    {% assign strategic_design_items = site.data.philosophy | where: "section", "Strategic Design" %}
    <p>{% include carousel.html items=strategic_design_items %}</p>
    <img src="/assets/images/maintainable_systems.png" height="350" alt-text="A colored pencil sketch of contrast between messy desk and neatly organised desk. This abstractly represents maintainable systems.">
    {% assign maintainable_systems_items = site.data.philosophy | where: "section", "Maintainable Systems" %}
    <p>{% include carousel.html items=maintainable_systems_items %}</p>
  </div>
</section>

  <div class="section-divider"></div>

<h2>AI & I: My Learning Loop</h2>
<p>Engaging on both sides of a coin offers unique perspectives. My own journey, from the wonky days of extracting features like bag-of-words and n-grams using Stanford CoreNLP, to now prompting an AI agent for specific image generation, reveals an astonishing pace of change in AI. As rapid as the boom in generative AI capabilities has been, fine-tuning remains the current focus. Below are my observations on where we currently stand in this effort.</p>
<section class="section" id="ai">
  <div class="content">
    {% include ai.html items=site.data.ai %}
  </div>
  <img src="/assets/images/LayingDoodle.svg" class="doodle doodle--center" alt="">
</section>

<div class="section-divider"></div>

<h2>Pages of Influence</h2>
<p>These are my takeaways from the books that left a mark.</p>
<section class="section" id="books">
  <div class="content">
    {% include books.html items=site.data.books %}
  </div>
  <img src="/assets/images/ReadingDoodle.svg" class="doodle doodle--left" alt="">
</section>
