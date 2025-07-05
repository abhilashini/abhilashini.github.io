---
layout: default
---

  <section class="max-w-5xl mx-auto px-2 py-4 md:py-8 space-y-6" id="intro">
    <p class="text-md leading-relaxed text-gray-800 mb-6">Hi there! <strong class="font-semibold text-gray-900">I'm Abhilashini</strong>. I like the juxtaposition of structured mess. It lets me handle and experience variety in various forms. Of the things that shape my thoughts, the central ones are centered around deep thinking, practicality, good food, and food for thought. Since my introduction to communicating with machines in the late 90s, it has remained integral to both my work and curiosities.</p>
    <p class="text-md leading-relaxed text-gray-800">This space brings together a <a href="#" class="text-blue-600 hover:text-blue-800 underline underline-offset-4">snapshot of my current focus</a> and what I'm building toward. Having engineered over 80 diverse products at work, I've come to prioritize <a href="#" class="text-blue-600 hover:text-blue-800 underline underline-offset-4">simplifying complexity in shared systems</a> — the bedrock of lasting, user-centric solutions. My dev journey also involves <a href="#" class="text-blue-600 hover:text-blue-800 underline underline-offset-4">leveraging AI in everyday tools</a>. I do a fair bit of reading and <a href="#" class="text-blue-600 hover:text-blue-800 underline underline-offset-4">curate the sparks that stayed</a> with me.</p>
  </section>

  <div class="flex justify-center">
    <div class="w-32 h-px bg-gray-300 my-8"></div>
  </div>

<section class="max-w-2xl mx-auto px-2 py-4 md:py-8 space-y-6" id="about">
  <p>My ideas take form in products on <a href="#" target="_blank" class="text-blue-600 hover:text-blue-800 underline underline-offset-4">Github</a> and insights at <a href="#" target="_blank" class="text-blue-600 hover:text-blue-800 underline underline-offset-4">Ctrl+Think</a>. Travel logs are at <a href="#" target="_blank" class="text-blue-600 hover:text-blue-800 underline underline-offset-4">Vihaara</a>. More of my work background is on  <a href="#" target="_blank" class="text-blue-600 hover:text-blue-800 underline underline-offset-4">LinkedIn</a>. Some highlights are shared below.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-4">
        <img src="https://s2.svgbox.net/illlustrations.svg?ic=programing&color=000000" width="120" height="120">
        <p>Play and Progress: A simple interface to save notes on a topic and later learn from mini games. Currently a work in progress, it is an exploration of interactive learning.</p>
      </div>
      <div class="space-y-4">
        <img src="https://s2.svgbox.net/illlustrations.svg?ic=dotted-notebook&color=000000" width="90" height="90">
        <p>
        <ul class="list-outside list-disc space-y-2 pl-5 marker:text-blue-600">
          <li><a href="#" target="_blank" class="text-blue-600 hover:text-blue-800 hover:underline">Learning Kotlin</a></li>
          <li><a href="#" target="_blank" class="text-blue-600 hover:text-blue-800 hover:underline">(Re)Introducing asymptotic analysis</a></li>
        </ul>
        </p>
      </div>
    </div>
</section>

<h2 class="text-2xl md:text-3xl font-bold text-gray-900 text-center mt-12 mb-6">Simplifying the complex</h2>
<p class="text-gray-700 max-w-2xl mx-auto text-center px-4 mb-8">In solving problems, plans often deviate as complexity creeps in, assumptions falter, and past lessons fall short. These manifest multi-fold while building enterprise-wide distributed systems. I expand upon a a few concepts which are good to be equipped with while adapting to new constraints and aid continuous learning.</p>
<section class="section" id="shared-systems" class="max-w-7xl mx-auto px-4 space-y-16">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div class="order-1">
      <img src="/assets/images/foundational_principles.png" 
           class="w-full max-h-[350px] object-contain" 
           alt="A pencil sketch of an apple: one with basic strokes, next to a fully colored version. This abstractly represents foundational principles.">
    </div>
    <div class="order-2">
      {% assign foundational_principles_items = site.data.philosophy | where: "section", "Foundational Principles" %}
      {% include carousel.html items=foundational_principles_items %}
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div class="order-2 md:order-1">
      {% assign strategic_design_items = site.data.philosophy | where: "section", "Strategic Design" %}
      {% include carousel.html items=strategic_design_items %}
    </div>
    <div class="order-1 md:order-2">
      <img src="/assets/images/strategic_design.png" 
           class="w-full max-h-[350px] object-contain" 
           alt="A color pencil sketch shows scattered tangram shapes, then a house, a tree, and a boat, all made from tangrams. This abstractly represents strategic design.">
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div class="order-1">
      <img src="/assets/images/maintainable_systems.png" 
           class="w-full max-h-[350px] object-contain" 
           alt="A colored pencil sketch of contrast between messy desk and neatly organised desk. This abstractly represents maintainable systems.">
    </div>
    <div class="order-2">
      {% assign maintainable_systems_items = site.data.philosophy | where: "section", "Maintainable Systems" %}
      {% include carousel.html items=maintainable_systems_items %}
    </div>
  </div>
</section>

<div class="max-w-5xl mx-auto px-4 relative min-h-[300px] mb-16">
  <!-- Image anchored to bottom-left -->
  <div class="absolute top-0 left-5 w-2/5 max-w-[350px] z-0">
    <img src="/assets/images/ai_and_i.png" 
         class="w-full translate-y-[30%]" 
         alt="An image showing brain and circuit board and connections between them with signals getting exchanged. Representative of human and artificial intelligence interaction.">
  </div>

  <!-- Centered Text Content -->
  <div class="relative z-10 h-full flex flex-col items-center">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-900 text-center mt-12 mb-6">
      AI & I: My Learning Loop
    </h2>
    <div class="max-w-2xl mx-auto px-4 text-center">
      <p class="text-gray-700 mb-8">
        Engaging on both sides of a coin offers unique perspectives. My own journey, from the wonky days of extracting features like bag-of-words and n-grams using Stanford CoreNLP, to now prompting an AI agent for specific image generation, reveals an astonishing pace of change in AI. As rapid as the boom in generative AI capabilities has been, fine-tuning remains the current focus. Below are my observations on where we currently stand in this effort.
      </p>
    </div>
  </div>
</div>

<section class="section" id="ai">
  <div class="content">
    {% include ai.html items=site.data.ai %}
  </div>
</section>

<section id="books" class="max-w-5xl mx-auto px-4 py-12">
  <h2 class="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">Pages of Influence</h2>
  <p class="text-gray-700 max-w-2xl mx-auto text-center mb-12">These are my takeaways from the books that left a mark.</p>
  {% include books.html items=site.data.books %}
</section>
