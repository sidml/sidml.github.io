---
layout: archive
title: "My Github Repos"
author_profile: true
permalink: /my_repos/
# header:
#     image: "/assets/images/fort point.png"
---

<!-- {% for post in site.posts %}
  <article>
    <h2>
      <a href="{{ post.url }}">
        {{ post.title }}
      </a>
    </h2>
    <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_long_string }}</time>
    <p>{{ post.content | strip_html | truncatewords: 50 }}</p>
  </article>
{% endfor %} -->


<h2 {% if site.style == 'dark' %}class="text-white"{% endif %}>My Projects</h2>
<p class="f4 mb-4 {% if site.style == 'dark' %}text-white{% else %}text-gray{% endif %}">GitHub repositories that I've built.</p>
<div class="d-sm-flex flex-wrap gutter-condensed mb-4">
  {% for repository in site.github.public_repositories limit: 9 %}
    <div class="col-sm-6 col-md-12 col-lg-6 col-xl-4 mb-3">
      {% include repo-card.html %}
    </div>
  {% endfor %}
</div>