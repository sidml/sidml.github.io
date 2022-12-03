---
title: "Can neural networks perceive time?"
tags: [Consciousness, Personal]
read_time: false
---

The recent debate about neural networks being conscious made me curious about different attributes of consciousness and to what extent neural networks exhibit them. 

I came across this interesting paper [Roseboom et al.](https://www.nature.com/articles/s41467-018-08194-7) which seems to claim that activity in visual classification networks (like AlexNet) can be used as a proxy for subjective time ! 

The machine learning relevant section from the paper is the following:
> At each time-step, a video frame was fed into the input layer of the network and the subsequent higher layers were activated. For each frame, we extracted the activations of all neurons from layers conv2, pool5, fc7 and the output probabilities. For each layer, we calculated the Euclidean distance between successive states.  If the activations were similar, the Euclidean distance would be low, while the distance between neural activations corresponding to frames that include different objects would be high. Each network layer had an initial threshold value for the distance in neural space. This threshold decayed with some stochasticity over time. When the measured Euclidean distance in a layer exceeded the threshold, the counter in that layer’s accumulator was incremented by one and the threshold for that layer was reset to its maximum value. 

I highly recommend reading the paper for more details.

I am personally skeptical about the paper's claim for the following reasons:
- Authors claim that the CNN classification network is functionally similar to human visual processing.

    The authors use AlexNet pretrained on ImageNet. [Alexnet top 5 error is 15.3 %.](https://en.wikipedia.org/wiki/AlexNet) whereas human top-5 classification error  is [5.1 %](https://arxiv.org/abs/1409.0575).  Alexnet's accuracy is far lower than human performance. Due to this performance difference, I don't think that it is appropriate to claim that "human visual processing and AlexNet are functionally similar". 

- Euclidean distance in high dimensional spaces mayn't be appropriate

    The paper uses Euclidean distance between network activations to successive inputs for a given network layer and applies the dynamic threshold in the change detection stage. When this distance exceeds the threshold level, a unit of subjective time is supposed to have elapsed.
    The neural network activations are in a high dimensional space and it is known that euclidean distance is usually NOT a good metric in high-dimensions. [See here](https://stats.stackexchange.com/a/99191).

- Their threshold calculation (equation 1 of the paper) seems to incorporate temporal priors (pacemaker criticism) . The choice of adding stochastic Gaussian noise also seemed arbitrary to me.

    The authors address the pacemaker criticism i.e. regular updates taking the role of a clock in the supplementary discussion.
    In Supplementary Fig. 2 it is shown that random frame order leads to wrong estimates. When the input rate was kept at 30 Hz, but with a random presentation order of frames, thereby disrupting the flow of content in the video, the time estimate was very different.
    The authors don't comment upon the choice of T_min & T_max used in these experiments. Was it the same as the original experiment ? If so, did they try tuning the threshold values, tau and alpha when random frames were shown to the network ?
    Such tuning is not mentioned nor implied. I wonder if the results would have been different if they tuned these parameters like they did for the 30Hz rate case.

I personally don't believe that current neural networks perceive time. This paper is slightly old hence doesn't consider transformer based models. I wonder if the authors would have made similar claims for transformer based models which don't share visual inductive priors.

Supplementary [link](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-018-08194-7/MediaObjects/41467_2018_8194_MOESM1_ESM.pdf).