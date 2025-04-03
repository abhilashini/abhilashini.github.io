---
layout: default
---

<div class="centered-column">
  <!-- Intro Section -->
  <section class="section" id="intro">
    <h3 class="sub-heading">Hi there!</h3>
    <br/>
    <p>I'm Abhilashini. Over the past 11 years, my work has revolved around three core areas: building for the web, automating manual processes, data analysis and visualisation. While these areas seem distinct, they share a common thread: <br/> solving real-world problems through thoughtful design and engineering.</p>
    <br/>
    <p>In solving problems, plans often deviate as complexity creeps in, assumptions falter, and past lessons fall short. Here, I share reflections on simplifying the complex, adapting to new constraints, and the continuous learning that shapes my perspective.</p>
    <br/>
    <a href="https://www.linkedin.com/in/abhilashini">Find me on LinkedIn <i class="fas fa-external-link-alt"></i></a>
    <br/>
    <img src="/assets/images/SittingDoodle.svg" class="doodle doodle--right flip" alt="">
  </section>

  <hr class="section-divider">

<!-- Philosophy Section -->
<section class="section" id="philosophy">
  <h1 class="section-title section-title--left" data-section="philosophy">
    Make things simple
  </h1>
  <div class="content">
    {% include carousel.html items=site.data.philosophy %}
  </div>
</section>

  <hr class="section-divider">

<!-- Avoid Section -->
<section class="section" id="avoid">
  <h1 class="section-title section-title--left" data-section="avoid">
    Breakdown complex things 
  </h1>
  <div class="content">
    {% include carousel.html items=site.data.avoid %}
  </div>
  <img src="/assets/doodle2.svg" class="doodle doodle--left flip" alt="">
</section>

<hr class="section-divider">

<section class="section" id="books">
  <h1 class="section-title section-title--left" data-section="books">
    Pages of influence
  </h1>
  <div class="content">
    {% include books.html items=site.data.books %}
  </div>
</section>

<hr class="section-divider">

<section class="section" id="ai">
  <h1 class="section-title section-title--left" data-section="ai">
    AI & I: My Learning Loop
  </h1>
  <div class="content">
    {% include ai.html items=site.data.ai %}
  </div>
</section>