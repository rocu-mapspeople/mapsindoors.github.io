---
layout: default
title: Authors
permalink: /blog/authors/
---

<ul>
  {% for author in site.authors %}
    <li>
      <h2><a href="{{ site.url }}/blog/authors/{{ author.short_name }}/">{{ author.name }}</a></h2>
      <h3>{{ author.position }}</h3>
      <p>{{ author.content | markdownify }}</p>
    </li>
  {% endfor %}
</ul>
