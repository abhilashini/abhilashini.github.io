---
layout: default
---

<div class="centered-column">
  <!-- Intro Section -->
  <section class="section" id="intro">
    <h3 class="sub-heading">Hi there!</h3>
    <p>I'm Abhilashini. Over the past 11 years, my work has revolved around three core areas: designing for the web, automating manual processes, and exploring data analysis and machine learning. While these areas may seem distinct, they share a common thread: solving real-world problems through thoughtful design and engineering. </p>
    <a href="#">Connect on LinkedIn <i class="fas fa-external-link-alt"></i></a>
    <img src="/assets/images/SittingDoodle.svg" class="doodle doodle--right flip" alt="">
  </section>

  <hr class="section-divider">

<!-- Philosophy Section -->
<section class="section" id="philosophy">
  <h1 class="section-title section-title--left" data-section="philosophy">
    Making things simple
  </h1>
  <div class="content">
    {% include carousel.html items=site.data.philosophy %}
  </div>
</section>

  <hr class="section-divider">

<!-- Avoid Section -->
<section class="section" id="avoid">
  <h1 class="section-title section-title--right" data-section="avoid">
    404: Mistakes Not Found (Anymore) / "Breaking the Loop of Bad Habits" 
  </h1>
  <div class="content">
    {% include carousel.html items=site.data.avoid %}
  </div>
  <img src="/assets/doodle2.svg" class="doodle doodle--left flip" alt="">
</section>

<hr class="section-divider">

<section class="section" id="rightTest2">
  <h1 class="section-title section-title--right" data-section="philosophy">
    Turning Pages, Churning Ideas
  </h1>
  <div class="content">
    {% include carousel.html items=site.data.philosophy %}
  </div>
</section>

<hr class="section-divider">

<section class="section" id="leftTest2">
  <h1 class="section-title section-title--left" data-section="philosophy">
    AI & I: My Learning Loop
  </h1>
  <div class="content">
    {% include carousel.html items=site.data.philosophy %}
  </div>
</section>