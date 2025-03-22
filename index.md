---
layout: default
---

<div class="centered-column">
  <!-- Intro Section -->
  <section class="section" id="intro">
    <h3 class="sub-heading">Designer, Developer, Thinker</h3>
    <p>11 years of solving problems...</p>
    <a href="#">Connect on LinkedIn <i class="fas fa-external-link-alt"></i></a>
    <img src="/assets/images/SittingDoodle.svg" class="doodle doodle--right flip" alt="">
  </section>

  <hr class="section-divider">

<!-- Philosophy Section -->
<section class="section" id="philosophy">
  <h1 class="section-title section-title--left" data-section="philosophy">
    My Philosophy
  </h1>
  <div class="content">
    {% include carousel.html items=site.data.philosophy %}
  </div>
</section>

  <hr class="section-divider">

<!-- Avoid Section -->
<section class="section" id="avoid">
  <h1 class="section-title section-title--right" data-section="avoid">
    Things I Avoid
  </h1>
  <div class="content">
    {% include carousel.html items=site.data.avoid %}
  </div>
  <img src="/assets/doodle2.svg" class="doodle doodle--left flip" alt="">
</section>

<hr class="section-divider">

<!-- Left Doodle Test Section -->
<section class="section" id="leftTest">
  <p>This is a test section with some random notes. Can have some <strong>focused highlights</strong> supplementing info in rest of the page to make it <em>stand apart</em></p>
  <img src="/assets/images/MeditatingDoodle.svg" class="doodle doodle--left" alt="">
</section>

<hr class="section-divider">

<section class="section" id="rightTest2">
  <h1 class="section-title section-title--right" data-section="philosophy">
    Right aligned section title
  </h1>
  <div class="content">
    {% include carousel.html items=site.data.philosophy %}
  </div>
</section>

<hr class="section-divider">

<section class="section" id="leftTest2">
  <h1 class="section-title section-title--left" data-section="philosophy">
    Left aligned title
  </h1>
  <div class="content">
    {% include carousel.html items=site.data.philosophy %}
  </div>
</section>