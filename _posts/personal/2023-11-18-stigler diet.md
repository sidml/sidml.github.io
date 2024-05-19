---
title: "Detachment and Stigler diet"
use_math: true
tags: [diet]
read_time: false
---
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>


It is fairly uncontroversial to say that attachment to worldly things is a source of sorrow in our lives. The recognition of this fact doesn't get us any closer to the actual avoidance of sorrow. Worldly things are tempting. Thanks to rapid proliferation of AI driven recommendation systems, worldly things have become even harder to resist. The constant bombardment of convincing advertisements in news media in our daily lives breeds within us a notion that we are constantly missing easily accessible pleasures. 

Among these seemingly innocent pleasures, advertisements of processed food products promising nirvana seem to occupy centre stage.
A drawback of these advertisements is that they have misled people to believe that food should be a source of pleasure.
Food is first and foremost a necessity. Without nutrition, a human body cannot work or focus. Therefore, selecting food that prioritizes
short term pleasure may not lead to healthy outcomes in the long run. 

Another dimension to consider while selecting food is the cost of food. High per-capita income in the western world allows one to take
a cavalier attitude towards food. This is not true in many parts of the world where three meals a day is a luxury. As per
[data from world health organization](https://www.who.int/news/item/06-07-2022-un-report--global-hunger-numbers-rose-to-as-many-as-828-million-in-2021), in 2021, 828 million people were affected by hunger and 45 million children were malnourished. Considering the benefits of good nutrition and the cost of food, one may want to find the most efficient way to fulfill daily dietary needs at the cheapest cost. The savings could conceivably be donated to a hunger fund that's trying to eliminate malnourishment. 

For the past two years, I have been trying to develop a detachment from food. It is easy to delude oneself into thinking that one has developed detachment while unconsciously faking it. To eliminate such a possibility,
I have tried to eat bland food almost every day. During this time, I haven't felt any cravings for processed food, alcohol or meat. So, I think that I may have developed a <a href="#section-title">detachment</a> from food to some extent. 
<!-- The transient pleasures of fat, sugars, salt and alcohol cannot sway me. -->

My current bland diet is based on rough mental heuristics that try to optimize the cost of food and nutrition. The fact that it's not based on any objective evidence has been bothering me. While looking for an objective solution. I came across the work of American economist and noble laureate, [George Stigler](https://en.wikipedia.org/wiki/George_Stigler) who posed the following question in 1943

<blockquote>
For a moderately active man weighing 154 pounds, how much of each of 77 foods should be eaten on a daily basis so that the man’s intake of nine nutrients will be at least equal to the recommended dietary allowances, with the cost of the diet being minimal?
</blockquote>

Stigler was able to find an approximate solution for the above problem. A few years later, [George Dantzig](https://en.wikipedia.org/wiki/George_Dantzig) found the optimal solution using Simplex Algorithm. As per Dantzig's calculation, one could obtain all dietary nutrients at an annual cost of $39.69. The US bureau of labor statistics provides a [nice tool](https://data.bls.gov/cgi-bin/cpicalc.pl?cost1=39.69&year1=194301&year2=202310) to calculate the equivalent dollars after considering inflation. Adjusted for inflation, \\$39.69 in 1943 is equivalent to \\$722.57 in October 2023.

I was curious to find out what an optimal diet in 2023 in Germany would look like. So I built a dataset [*not yet finished*] of some common food products and their nutrition information. Currently, the dataset has details of only 51 items. I have used this [paper](https://www.researchgate.net/publication/299676825_Nutritional_Value_of_Vegetables)
as a reference for nutrition information of vegetables. EU regulations don't require product manufacturers to mention them. So, I couldn't find details about Vitamin, Calcium and other minor nutrients on most of the product labels. The prices in the dataset are a bit on the higher side because I have relied on online sources. It is possible to cheaper alternatives at the local supermarket. Ideally, I would have liked to spend a day recording the nutrient labels and prices from my local supermarket. [Considering my lack of social skills and awkwardness, it's extremely unlikely that I would have been able to convince the store staff.]

The dataset is located [here](https://docs.google.com/spreadsheets/d/1xUptnXwkS5fUioOz0YTzHApADOWPRyzF6LtmnLgt7ag/edit?usp=sharing). It can be viewed edited by anyone. So, please feel free to add more products. If more products are added, I will run the algorithm again and update the optimal diet. [Thanks to food inflation in EU](https://www.ecb.europa.eu/stats/macroeconomic_and_sectoral/hicp/html/index.en.html), any optimal diet that I find is unlikely to remain optimal for a long time. The code is available [here](https://gist.github.com/sidml/df26157ad40accb60588573a0cb36406) for reference. I have used [Google OR tools](https://developers.google.com/optimization/) for the optimization. The OR tool documentation also has a [nice tutorial](https://developers.google.com/optimization/lp/stigler_diet) about the original 1943 Stigler diet which maybe interesting to read.

The optimization problem that we are trying to solve can be mathematically thought in the following way. Let $f^{i}\_{n}$ denote the nutrient $n$ content in food product $f^{i}$. In the current dataset, we have 51 food products, so $0\leq i \leq 50$. Since we don't have data for vitamins and calcium content for most food products, let us only optimize for the major nutrients like protein, carbohydrate etc. For the results below, I have considered 8 nutrients i.e. $0\leq n \leq 7$.
Let $p^{i}$ be the price of $i$ th food product and $w^{i}$ is the weight of the food product that we are consuming. Our intention is to find $w^{i}$ such that the total cost is minimized and the nutrient requirements are satisfied. The total cost will be the sum of the total amount spent on each product. So, our objective is to minimize the following quantity
$ \sum_{i=0}^{50} p^{i}w^{i}$
subject to the constraint
$f^{i}\_{n} w_{i} \geq N^{i}, \forall i \in \\{0,1.. 50\\}$. $N^{i}$ denotes the daily requirement for nutrient $i$. For example, a person requires approximately 70g of protein daily. The nutrient requirement varies based
on age, gender and level of physical activity. Different sources have different recommendations for the daily requirement. So, I have used roughly the average requirement for a moderately active adult male. Solving the optimization problem using [OR tools]((https://developers.google.com/optimization/)), leads to the following optimal diet in Germany in October 2023.

```
Number of variables = 51
Number of constraints = 8

Annual Foods:
Yum Yum Instantnudeln Ente 60 g, 10er Pack : €180.69169432608697
Clarkys Mandeln ganz 200 g, 10er Pack : €529.8622191193718
Riesa Schlemmerliebling Makkaroni-Chips 500 g, 18er Pack : €428.5903617729918
Dilek Rote Linsen 500 g, 7er Pack : €125.16946105954835
Bio Speisemöhren 1kg (Dänemark): €74.26593630260022
Paprika rot 500g (Deutschland): €145.46550464104473
Duo Schoko Creme, Nussetti - Netto: €831.5601040884904

Optimal annual price: €2315.6053

Nutrients per day:
Calories (cal): 3000.00 (min 3000)
Protein (g): 70.00 (min 70)
Vitamin A (IU): 3000.00 (min 3000)
Vitamin C (mg): 90.00 (min 90)
Fat (g): 172.87 (min 78)
Carbohydrate (g): 275.00 (min 275)
Fibre (g): 28.00 (min 28)
Salt (g): 2.30 (min 2.3)
```

Noodles have been a favorite meal of students and bachelors. It's nice to see that they are part of an "optimal" diet obtain using objective metrics. Makkaroni-Chips, Rote Linsen, Speisemöhren [carrots], Paprika can be put in a boiling pot of water and cooked for a few minutes. I have tasted it and it's definitely edible. Almonds [Clarkys Mandeln ganz] and Chocolate cream [Schoko Creme] can be probably eaten as a snack and dessert respectively. In my opinion this diet is much more palatable than the original stigler diet. The original 1943 diet required one to consume 129kg of Dried Navy Beans and 170kg Wheat Flour annually.

The annual cost of this diet comes out to be €2315 which implies a daily cost of €6.34.I think the cost would have been at-least 20% lower if I was able to use prices from nearby super-market instead of online prices. Finally, a reminder that a diet that fulfills just these nutrients **CANNOT** be considered a balanced diet. **Please don't follow this diet.** The optimization isn't complete because I haven't included the daily requirements for other vital nutrients like B1, B2, Calcium because their values are missing for most products.

### <a id="section-title">†</a>
<small>
I have long been confused about what detachment means. It is possible to suppress desires through sheer will-power. However, such detachment cannot be sustained for a long time. Detachment can be easier to develop when one acknowledges their desires and understands how those desires lead to sorrow. Being detached doesn't mean the inability to appreciate the sweetness of fruits or the flavor of chocolates. A detached person can see beyond these tastes and think about the causal chain that have led to these flavors. When one understands the larger social, economic
and political contexts, one understands the fickleness of flavors and frees themselves from their alluring grips. A detachment attained through wisdom can be a source of pleasure while a detachment through sheer will power can be a constant source of frustration. It's too early to say if my detachment from food is a result of wisdom or will-power.
</small>