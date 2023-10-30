---
title: "Estimating intrinsic values"
tags: [Economics]
read_time: false
hidden: false
---
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

[Adani's recent fiasco](https://news.yahoo.com/adani-group-scandal-explained-104910894.html), the failure of Silicon Valley Bank and the general instability of financial markets in the past year made me wonder, 
why is the stock market so volatile ? If the stock prices were efficiently priced (see [EMH hypothesis](https://en.wikipedia.org/wiki/Efficient-market_hypothesis)), how can a company lose more that 50% of its valuation in a few days ?\\
Determining the intrinsic valuation of a company is a complicated but interesting rabbit hole with different schools of thought. There are fundamental investors who buy companies based on their assessment of company's management, revenue growth and future performance. In contrast, there are investors who buy solely based on quantitative metrics, example [Factor Investing](https://en.wikipedia.org/wiki/Factor_investing).

Among the multiple valuation methods, I found two ways particularly interesting. The first method is using multiples of valuation ratios. In this method, the investor first selects a valuation ratio and then scales it using some multiple. *Price/Earning* (popularly known as PE ratio) is probably the most widely used valuation ratio.  In recent years, valuation ratios like *enterprise value/EBITDA* and *price/Operating Cash Flow* have also become popular. However, in academic literature, *price/book* ratio is still used to classify companies into the *value* category. 

I like to imagine PE ratio as the number of years that investors think, the current earning can be sustained. At the time of writing, NVIDIA is trading at $390 for each share and PE (TTM) is 207. If someone buys NVIDIA at this price, they either expect the current earning to sustain for 207 years or they expect a radical growth in the earnings outlook in the coming years. If an investor believes that AI, powered using NVIDIA GPUs, is going to transform the world in coming years, then the current PE multiple may make sense to them.

The volatility of financial markets makes sense if investors solely rely on multiple based method to make their buying decisions. If NVIDIA's earning in the next quarter drops by 50%, then the share price needs to drop by 50% to retain the *Price/Earning* multiple of 207. A fanatic investor who believes in an AI future would of-course continue to hold the stock even after 50% drawdown in the stock price. However, speculative investors who do not share such confidence, may succumb to behavioral biases (*[recency bias](https://en.wikipedia.org/wiki/Recency_bias)*) and choose to sell the stock. Such panic selling may lead to irrational prices in the short-term.

Another interesting method to estimate the value of a stock is the **Discounted Cash Flow (DCF)** method. The [Wikipedia article](https://en.wikipedia.org/wiki/Discounted_cash_flow) gives a nice overview of the technique. I wish they taught DCF in schools and universities. The mathematics required for understanding it is trivial. DCF is definitely useful for making better financial decisions. I understood it in the following way.

Let us say that someone promises me to pay $100 now or $103 in 2025. Which choice should I pick ? Since I don't need $100 currently, I may choose to delay it. But that would be a mistake. Let us say that the rate of inflation is 5% in 2023 and 4% in 2024. Due to inflation, the value of $100 in 2023 is **NOT** the same as the value of $100 in 2025. In fact, $109.2 in 2025
$$($100*(1+0.05)*(1+0.04) = $109.2)$$ will be equivalent to $100 of 2023. If I accept $103 in 2025, I would have made a loss of $6.2!

Estimating values using DCF is simple and elegant. The current price of any object can be estimated based on the future cash flows that are going to be produced and the [*discount* rate](https://en.wikipedia.org/wiki/Discounted_cash_flow#Discount_rate). In [Capital Asset Pricing Model](https://en.wikipedia.org/wiki/Capital_asset_pricing_model), the *discount rate* is estimated as *(risk-free rate) + β × (expected market return – risk-free rate)*. The finance jargons (like beta, risk-free rate) are simple but time-consuming to understand. I personally like to imagine the *discount rate* as the the riskiness of the asset compared to a long-term government bond. 

In India, the interest rate of a long-term government bond is roughly around [7.2%](http://www.worldgovernmentbonds.com/country/india/). If someone uses 15% for discounting the future cash flow of a company, then he feels that the company is much more riskier than an Indian govt. bond. (The relationship between discount rate and intrinsic value is non-linear. This can easily be verified from the plot below.)

I was curious to check the practical usefulness of estimated values using DCF technique. So I decided to implement & apply this technique myself. I applied this technique on [Adani ports](https://www.adaniports.com/). For DCF calculation, five main inputs are needed, namely, `Cash flow, Discount rate, Cash Holdings, Long term Debt and Growth rate`.
One can use [publicly available historical cash flow values](https://trendlyne.com/fundamentals/cash-flow/27/ADANIPORTS/adani-ports-special-economic-zone-ltd/) to get a rough estimate of future cash flow. The long term debt is also freely available online. There are many methods for estimating the growth rate. One method that I find sensible is to take the mean of [*Return on Invested Capital*](https://corporatefinanceinstitute.com/resources/accounting/return-on-invested-capital/) for the past three years. Estimating the growth rate of companies is a multi-billion dollar industry (funnily analyst estimates are [usually incorrect](https://www.evidenceinvestor.com/how-good-are-analysts-at-forecasting-earnings-growth/) ). The discount rate can be estimated based on *CAPM* model or one can simply use the current Indian govt. bond interest rate as discount rate. (Intimate connections between the current govt. and Adani may justify such a lenient discount rate.). 

I obtained an estimated stock price of Rs. 317.6. At the time of writing, the share was trading at Rs. 744. You can change the `growth rate` value in the calculator below and see its impact on the estimated stock price. The current stock price of Rs. 744 implies that stock holders expect the company growth to be more than 15% for the next 10 years! 
(In the above calculation, I treated Operating Cash Flow as Free cash flow i.e. assuming zero [CapEx](https://www.investopedia.com/terms/c/capitalexpenditure.asp), since in my experience estimating future free cash-flow is very difficult and Operating Cash Flow is sufficient for a quick analysis.)

```
Mean of last 3 year cash flow (3012.1 + 3041.8 + 3169.9)/3 = 3074.6
Cash Plus Cash Equivalents Annual Cr = 6,211.5
Long Term Debt Annual Cr = 40,511.3
Growth Rate = 10%
Discount Rate (in %) = 7.2
Number of shares = 211.2
(All the data are from 2022 financial statements)
```
{% include dcf.html %}

Note:
- The choice of currency doesn't matter as long as they are internally consistent. For instance: if Cash Flow is in dollars and debt is in rupees then it's a problem. 
- Price estimates of negative cash flow or debt ridden companies will not make sense. Negative cash flow companies are in their growth phase and are expected to make profit later on. Once they are stable, an estimate of expected cash flow can be used.
- The measurement units for each input must be the same. For example, if Cash Flow is in Billions, then Debt should also be in Billions. If debt is in millions or thousands, it will lead to incorrect estimate.
- The discount rate must always be greater than the interest of long term government bond. This makes sense because when we invest in a asset (like stock shares), we are implicitly assuming the risk associated with the underlying economy. For instance, when someone invests in an Indian company, they implicitly assume that the Indian state would continue to exist. The discount rate of advanced economies [like Germany are lower](http://www.worldgovernmentbonds.com/country/germany/) because chances of extreme political instability, bankruptcy and dictatorship are lower.

The DCF model is very versatile and can be easily adapted to estimate value of other assets. For instance, if one can estimate what is the expected yearly rent from a property, then one could apply the DCF model to estimate the property price. Since real estate is
fairly stable asset (unless it's situated in an area susceptible to natural/man-made calamities), one can once again use long term government bond as the discount rate. The cash flow is the yearly rent that one expects from the property. Cash and long term debt can be treated as 0 (unless one has buried sacks of cash in their backyard).

I applied the DCF model to estimate the value of my parents house and got reasonable values. However, the actual market prices of real estate in my parent's locality are at-least 25% more than the DCF estimate. History shall judge whether it's irrational exuberance (like the [recent Chinese real-estate bubble](https://en.wikipedia.org/wiki/2020%E2%80%932022_Chinese_property_sector_crisis)) or an optimism grounded in logic.

