---
layout: page
title: Testing Concepts
permalink: /blog/categories/qa/
---


{% for post in site.categories.qa %}

<article class="post-preview">
  <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
    <h2 class="post-title">{{ post.title }}</h2>
  </a>
  <p class="post-meta">Posted by
    {% if post.author %}
    {{ post.author }}
    {% else %}
    {{ site.author }}
    {% endif %}
    on {{ post.date | date: '%B %d, %Y' }} &middot; {% include read_time.html content=post.content %}
  </p>
</article>

<hr>

{% endfor %}
