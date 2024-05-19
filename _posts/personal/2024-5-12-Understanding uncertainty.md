---
title: "Betting amidst uncertainty"
tags: [Economics]
read_time: false
hidden: false
use_math: false
---

Life is uncertain, unpredictable and rife with randomness. Sometimes our well intentioned and best thought out decisions can go badly wrong. This fact isn't as clear when we are younger, probably because we haven't seen things fall apart. As we grow older and more experienced, the pollyanish young man is replaced with a bitter and extremely cautious old man, afraid to take any risks. There's a middle path between extreme caution and irrational exuberance. This path, guided by logic, allows one to cautiously take risks. 

The benefits of logical risk taking are not immediately obvious. It seems to be an abstract puzzle that
maybe of interests only to mathematicians. I came across a beautiful betting game by [Victor Haghani](https://en.wikipedia.org/wiki/Victor_Haghani) et al. (formerly associated with LTCM)
that shows the practical utility of reason over intuition.

The objective of the game is to maximize the amount available to the user. The user is initially allocated $25. He has to predict Head/Tails and he can bet **any** amount he likes. If the guess is correct, he wins the allocated amount whereas if he is wrong, he loses the bet amount. The user can bet as many times as he likes. The only constraint is the time [5 minutes]. The interesting part about the game is that the coin is **biased**. The probability of heads is 0.6 whereas the probability of tails is 0.4. The biased nature of the coin is actually a blessing in disguise [more on this later].
The original implementation of the game is available [here](https://elmwealth.com/coin-flip/). I found the implementation to be a bit slow and less customizable. So, I reproduced the game for my personal experimentation. 

{% include game.html %}