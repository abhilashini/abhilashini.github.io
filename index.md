---
layout: default
---

<!-- Introductory Section -->
<section class="max-w-3xl mx-auto px-4 py-8 space-y-6" id="intro">
  <p class="text-md leading-relaxed text-gray-800">
    Hi there! <strong class="font-semibold text-gray-900">I'm Abhilashini</strong>. I like the juxtaposition of structured mess. It lets me handle and experience variety in various forms. Of the things that shape my thoughts, the central ones are centered around deep thinking, practicality, good food, and food for thought. My dialogue with machines began in the late 90s and has remained integral to both my work and curiosities.
  </p>
  <p class="text-md leading-relaxed text-gray-800">
    This space brings together a
    <a href="#focus" class="section-toggle-link" data-color="0"><mark class="highlight relative pulse-once">snapshot of my current focus</mark></a>
    and what I'm building toward. Across 80+ projects and initiatives, I've come to prioritize
    <a href="#shared-systems" class="section-toggle-link" data-color="1"><mark class="highlight">simplifying complexity in shared systems</mark></a>
    — the bedrock of lasting, user-centric solutions. My dev journey also involves
    <a href="#ai" class="section-toggle-link" data-color="2"><mark class="highlight">leveraging AI in everyday tools</mark></a>.
    I read a fair bit and
    <a href="#books" class="section-toggle-link" data-color="3"><mark class="highlight">curate the sparks that stayed</mark></a>
    with me.
  </p>
</section>

<!-- Divider -->
<div class="flex justify-center my-2">
  <div class="w-24 h-px bg-gray-300"></div>
</div>

<!-- Section: Focus -->
<section class="max-w-3xl mx-auto px-4 py-8 space-y-6 section-block" data-section="focus">
  <p>My ideas take form in products on <a href="#" target="_blank" class="text-blue-600 hover:text-blue-800 underline underline-offset-4">Github</a> and insights at <a href="#" target="_blank" class="text-blue-600 hover:text-blue-800 underline underline-offset-4">Ctrl+Think</a>. Travel logs are at <a href="#" target="_blank" class="text-blue-600 hover:text-blue-800 underline underline-offset-4">Vihaara</a>. More of my work background is on  <a href="#" target="_blank" class="text-blue-600 hover:text-blue-800 underline underline-offset-4">LinkedIn</a>. Some highlights are shared below.</p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
    <div class="space-y-4">
      <img src="https://s2.svgbox.net/illlustrations.svg?ic=programing&color=000000" width="120" height="120">
      <p>Play and Progress: A simple interface to save notes on a topic and later learn from mini games. Currently a work in progress, it is an exploration of interactive learning.</p>
    </div>
    <div class="space-y-4">
      <img src="https://s2.svgbox.net/illlustrations.svg?ic=dotted-notebook&color=000000" width="90" height="90">
      <ul class="list-disc pl-5 space-y-2 marker:text-blue-600">
        <li><a href="#" target="_blank" class="text-blue-600 hover:text-blue-800 hover:underline">Learning Kotlin</a></li>
        <li><a href="#" target="_blank" class="text-blue-600 hover:text-blue-800 hover:underline">(Re)Introducing asymptotic analysis</a></li>
      </ul>
    </div>
  </div>
</section>

<!-- Section: Shared Systems -->
<section class="max-w-3xl mx-auto px-4 py-10 section-block hidden" data-section="shared-systems">
  <div class="flex justify-center">
    <h2 class="text-2xl md:text-2xl font-medium text-gray-900 text-center mb-4 section-heading" data-color="1">Simplifying the complex</h2>
  </div>
  <p class="text-gray-700 max-w-2xl mx-auto text-center mb-12">
    In solving problems, plans often deviate as complexity creeps in, assumptions falter, and past lessons fall short. These manifest multi-fold while building enterprise-wide distributed systems. I expand upon a few concepts which are good to be equipped with while adapting to new constraints and aid continuous learning.
  </p>

  <!-- Carousel Rows -->
  <div class="flex flex-col md:flex-row md:items-start gap-8 mb-12">
    <div class="w-full md:flex-1 md:max-w-prose">
      {% assign foundational_principles_items = site.data.philosophy | where: "section", "Foundational Principles" %}
      {% include carousel.html items=foundational_principles_items sectionColor="#BF1F3C" %}
    </div>
  </div>

  <div class="flex flex-col md:flex-row md:items-start gap-8 mb-12">
    <div class="w-full md:flex-1 md:max-w-prose order-2 md:order-1">
      {% assign strategic_design_items = site.data.philosophy | where: "section", "Strategic Design" %}
      {% include carousel.html items=strategic_design_items sectionColor="#136EBE" %}
    </div>
  </div>

  <div class="flex flex-col md:flex-row md:items-start gap-8">
    <div class="w-full md:flex-1 md:max-w-prose">
      {% assign maintainable_systems_items = site.data.philosophy | where: "section", "Maintainable Systems" %}
      {% include carousel.html items=maintainable_systems_items sectionColor="#5A7C39" %}
    </div>
  </div>
</section>

<!-- Section: AI -->
<section class="section section-block hidden" data-section="ai">
  <div class="max-w-5xl mx-auto px-4 relative min-h-[300px] mb-16">
    <div class="absolute top-0 left-5 w-2/5 max-w-[350px] z-0">
      <img src="/assets/images/ai_and_i.png" class="w-full translate-y-[30%]" alt="Brain and circuit connections sketch.">
    </div>

    <div class="relative z-10 h-full flex flex-col items-center">
      <h2 class="text-2xl md:text-2xl font-medium text-gray-900 text-center mt-12 mb-4 section-heading" data-color="2">
        AI & I: My Learning Loop
      </h2>
      <div class="max-w-2xl mx-auto px-4 text-center">
        <p class="text-gray-700 mb-8">
          Engaging on both sides of a coin offers unique perspectives. My own journey, from the wonky days of extracting features like bag-of-words and n-grams using Stanford CoreNLP, to now prompting an AI agent for specific image generation, reveals an astonishing pace of change in AI. As rapid as the boom in generative AI capabilities has been, fine-tuning remains the current focus. Below are my observations on where we currently stand in this effort.
        </p>
      </div>
    </div>
  </div>
  <div class="content">
    {% include ai.html items=site.data.ai %}
  </div>
</section>

<!-- Section: Books -->
<section class="max-w-5xl mx-auto px-4 py-10 section-block hidden" data-section="books">
  <div class="flex justify-center">
    <h2 class="text-2xl md:text-2xl font-medium text-gray-900 text-center mb-4 section-heading" data-color="3">Pages of Influence</h2>
  </div>
  <p class="text-gray-700 max-w-2xl mx-auto text-center mb-12">These are my takeaways from the books that left a mark.</p>
  {% include books.html items=site.data.books %}
</section>
