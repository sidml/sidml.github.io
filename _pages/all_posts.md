---
layout: archive
title: "All Blog Posts"
author_profile: true
permalink: /all_posts/
# header:
#     image: "/assets/images/fort point.png"
---

{% for post in site.posts %}
  <article>
    <h2>
      <a href="{{ post.url }}">
        {{ post.title }}
      </a>
    </h2>
    <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_long_string }}</time>
  </article>
{% endfor %}