---
title: "Are wider nets better given the same number of parameters?"
tags: [Deep Learning]
read_time: false
---

## Introduction
Prior work has demonstrated that increasing the parameter count while increasing the network width improves the performance. Since these studies did not control for increased parameter count, it was hard to establish the exact cause behind the improved performance. 
A recent paper [`Are wider nets better given the same number of parameters?`](https://arxiv.org/abs/2010.14495) tries to disentangle the effect of increasing parameter count and width.
The paper experimentally demonstrates that increasing the width leads to better performance. They use a Gaussian process (GP) analysis to motivate a theoretical connection between model performance and distance of sparse and infinite width GP kernels.
## Prior Works
The role of over-parameterization in improving network performance is well known. Prior works have investigated over-parameterization primarily in the context of inductive bias of the optimization algorithm, implicit regularization of gradient descent and ensembling. The common thread among the previous works was that **both** width and parameters were increased. This made it hard to isolate the exact cause behind improved performance.
## Strengths and limitations of the techniques in the paper
### Strengths:
The paper shows that increasing width and not the increased parameter count is responsible for most of the performance gain. This observation could be used to further enhance the network performance by increasing width and sparsity.
The theoretical study using Gaussian Processes provides an intuition regarding the improved performance when width is increased.
### Limitations:
The methods investigated in the paper in order to isolate the effect of higher widths,  particularly **non-linear bottlenecks and sparsity**, have the potential to introduce changes in network performance even when the number of parameters stays constant.\\
In the sparsity method, the number of weights being removed is proportional to the number of weights in that layer. The theoretical intuition behind this choice was not obvious to me. As noted in Appendix C and Appendix D, the choice of sparsity and distribution does have an impact on network performance. Their effect could have been more thoroughly investigated.\\
In the discussion about Bottleneck methods (section 2.2), inductive bias of the reparameterization method is mentioned. A more detailed discussion or reference to relevant work would have been very useful.

Most of the experiments were performed with Resnet 18 architecture. The paper could have applied the proposed methods on other architectures and verified that increased width improves the performance.

I found some of the experiment results to be unconvincing. In particular, I was confused by the following:
1. In Figure 3, we can observe that linear and non-linear bottlenecks are not able to beat the baseline model for most of the width factors. In contrast, the sparsity method performs better than the baseline for most of the widths.  
Considering the above, why do the authors attribute the performance gain to increased width instead of sparsity ?
2. In figure 7, we can observe that the explained improvement decreases as width increases. If width is causing the improvement in test accuracy, why do wider networks not have higher explained improvement ?
3. In Figure 8, we can observe that the dense variants have higher accuracy.
Why do the sparse variants with higher widths don't outperform the dense model as previously observed in Table 1 for Imagenet dataset ?








