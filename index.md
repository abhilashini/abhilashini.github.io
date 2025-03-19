---
layout: default
---

<div class="centered-column">
  <!-- Intro Section -->
  <section class="section" id="intro">
    <h2 class="sub-heading">Designer, Developer, Thinker</h2>
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
</div>