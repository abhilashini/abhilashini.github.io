---
layout: default
---

<section class="section" id="intro">
  <div class="container">
    <h1 class="section-title section-title--left active" data-section="intro">
      Designer, Developer, Thinker
    </h1>
    
    <p>11 years of solving problems...</p>
    <a href="#">Connect on LinkedIn <i class="fas fa-external-link-alt"></i></a>
    
    <img src="/assets/images/SittingDoodle.svg" class="doodle doodle--right" alt="">
  </div>
</section>

<hr class="section-divider">

<section class="section" id="philosophy">
  <h2 class="section-title section-title--left" data-section="philosophy">
    My Philosophy
  </h2>
  
  <div class="container">
    {% include carousel.html items=site.data.philosophy %}
  </div>
</section>

<hr class="section-divider">

<section class="section" id="avoid">
  <img src="/assets/doodle2.svg" class="doodle doodle--right" alt="">
  <h2 class="section-title section-title--right" data-section="avoid">
    Things I Avoid
  </h2>
  
  <div class="container">
    {% include carousel.html items=site.data.avoid %}
  </div>
</section>