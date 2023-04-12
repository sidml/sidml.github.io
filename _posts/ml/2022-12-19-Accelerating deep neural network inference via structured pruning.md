---
title: "Accelerating deep neural network inference via structured pruning"
tags: [LTH, Deep Learning]
read_time: false
---

It has been nearly 5 years since lottery ticket hypothesis (LTH) was proposed. Countless theoretical papers have been written on it.
Even after achieving sparsity as high as 95% without a significant drop in performance, the application of LTH in industry remains relatively limited. 
One of the main factors that has perhaps restricted its widespread adoption is the limited benefits in runtime speedup.
It seems counter-intuitive that a network with sparsity levels of 95% leads to little speedup on most GPU devices. However, it is unfortunately true. I think the reason is mostly related to the nature of sparsity obtained using currently popular pruning methods.

Pruning methods can be broadly classified into two types: 1. Unstructured pruning methods 2. Structured pruning methods.
As the name indicates, there is no "structure" or pattern in sub-networks obtained using unstructured pruning methods while
structured pruning methods have some sort of systematic pattern i.e. the sparsity is not arbitrary. This might seem like minor
difference but it actually has a serious impact on the achievable acceleration during inference. It is possible to achieve 50~80 % speedup using structured pruning methods on commonly available GPU devices **without** loss in accuracy. 
Considering the practical usefulness of structured pruning, it is unfortunate that more research work hasn't been directed towards it.

Why unstructured pruning doesn't lead to huge speedup ?
As mentioned earlier, the sparse sub-network found using unstructured pruning has 
irregular sparse patterns. This leads to poor data locality and low parallelism. GPUs are optimized for 
dense matrix operations and are unable to take advantage of this sparsity. Specific hardware accelerators maybe able
to take advantage, however such accelerators are less often used than GPUs.

One might wonder if structured pruning is so amazing from a practical standpoint why hasn't more effort gone into developing it ?
The answer is that it's much more difficult to obtain structured sparsity than unstructured sparsity. Till recently, no method was able to achieve structural sparsity without big decline in performance. A recent paper by Chen et al. tackles the problem. They provide a systematic way to find structure patterns. 
I enjoyed reading this paper because it showed for the first time that structurally sparse winning tickets exist at high sparsity for many datasets and neural network architectures. The proposed algorithms are fairly general and can be easily applied in different settings. Their demonstrated runtime savings are on GPU devices and not geared towards any specific hardware accelerator. Consequently their results can have wide scale applications. I will briefly sketch out the proposed algorithms from the paper which enabled this breakthrough.

As pointed out earlier, unstructured pruning is already able to achieve high sparsity. So to make life easier, we can start from 
a unstructured network. We now need some way to make sure that the sparsity is structured. The first method proposed in the paper is an algorithm called refilling. This algorithm creates channel-wise sparsity.
The idea is actually pretty simple. We select important channels from *unstructured subnetwork* using L1 norm criteria and update the mask (i.e. make the pruned elements trainable again). Parameters in the remaining not-important channels will be removed.
The other method that the authors propose is called "regrouping". This method addresses the limitations of refill method.
The refill method can't prune a kernel, it is focussed on reducing the number of channels. Regrouping method can find blocks with diverse shapes that are smaller in size than the original block. This algorithm relies on previous work by Rumi et al. to systematically convert the sparse masks into dense blocks. paper provides a nice visualization of the regrouping algorithm. I would highly recommend checking it out.

Although the paper is great, I observed a few limitations. 
- The proposed IMP-Refill and IMP-Refill+ algorithms are unable to find structural winning tickets on ImageNet. This suggests that these algorithms may have limited benefits for other large scale datasets. 
- The reported results are for NVIDIA RTX 2080 TI with batch size 64. The speedup with different GPU and different batch sizes should have been compared.
- Layer-wise speedups are only reported for VGG architecture (Figure 7 and Figure A10). Results with different architectures should have been reported to establish the trend. 

I was puzzled by some of the results.
- In the ablation study (section 5), it is reported that different sources of unstructured masks result in different model performance for Regroup algorithm. For instance, IMP and OMP provide better initial unstructured masks. 
Is there a similar study available for refill and refill+ ? Do we expect the results from the regrouping algorithm ablation study to be applicable for refill and refill+ ?

- Why does IMP-Refill+ consistently not outperform IMP-Refill in many cases like Resnet-50 on imagenet (figure 3) and Wide-ResNet-32-2 on cifar-10 and cifar-100 (figure 4). 
If the picking rule (channel weight's l1 norm) is good, then why doesn't it consistently outperform IMP-Refill ?

- How should the hyperparameters in IMP-Regroup (like t_1, t_2, b_1 and b_2) be selected ? (Algorithm 3 in the paper). Is the algorithm sensitive to the specific choice of the hyperparameters ?

I hope more research is targeted towards finding structured pruning methods. It would be interesting if future works explore what happens when a soft version that partly reduces the effect of aggressive pruning (like used in refilling+) was tried. 
In the currently proposed Regrouping algorithm, after finding the desired dense blocks using the regrouping algorithm, the other parameters are discarded.  

References:\
<sup><sub> Frankle, J., & Carbin, M. (2018). The lottery ticket hypothesis: Finding sparse, trainable neural networks. arXiv preprint arXiv:1803.03635.</sub></sup> <br>
<sup><sub> Chen, T., Chen, X., Ma, X., Wang, Y., & Wang, Z. (2022, June). Coarsening the granularity: Towards structurally sparse lottery tickets. In International Conference on Machine Learning (pp. 3025-3039). PMLR.</sub></sup> <br>
<sup><sub> Rumi, M. A., Ma, X., Wang, Y., & Jiang, P. (2020, September). Accelerating sparse cnn inference on gpus with performance-aware weight pruning. In Proceedings of the ACM International Conference on Parallel Architectures and Compilation Techniques (pp. 267-278).</sub></sup> <br>


