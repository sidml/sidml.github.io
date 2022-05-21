---
layout: archive
author_profile: true
permalink: /projects/
---

## [Projects](#projects)

- ### [Meta-Learning on Abstraction and Reasoning dataset](https://github.com/sidml/reptile-transformer)
Meta-learning is the process of learning how to learn. A meta-learning algorithm takes in a distribution of tasks, where each task is a learning problem, and it produces a quick learner — a learner that can generalize from a small number of examples. MAML is one of the famous meta-learning approaches out there. But it requires us to compute Hessians (which is hard). Another interesting approach is the Reptile Algorithm. It's mathematically similar to first order MAML and performs a very similar update. The performance of reptile is similar to MAML on the Omniglot and Mini-ImageNet benchmarks. So,i decided to stick with Reptile instead of MAML.
In this project, I applied meta-learning techniques to solve tasks from Abstraction and Reasoning dataset.

- ### [Centernet for object detection](https://github.com/sidml/Understanding-Centernet)
This repo contains a minimalist implementation of the paper Objects as Points by Zhou et al. I found the approach pretty interesting and novel. It doesn't use anchor boxes and requires minimal post-processing. The essential idea of the paper is to treat objects as points denoted by their centers rather than bounding boxes. This idea is elegant and makes intuitive sense. And most importantly, it performs pretty well.The authors were able to achieve high accuracies on multiple tasks namely Object Detection on MSCOCO, 3D detection on Kitti and pose estimation !

- ### [Car Classification](https://github.com/sidml/Stanford-Cars-Classification)
In this project I train a model that is able to classify cars. I use the Stanford Cars dataset for training the deep learning model. This is a hard problem because we have a large variety of cars (196) and many classes have very few example images.  The  dataset contains 16,185 images of 196 classes of cars. The data is split into 8,144 training images and 8,041 testing images.
You can find more details in my github repo.


- ### [KL DIvergence](https://github.com/sidml/understanding-kl-divergence)
KL Divergence is a measure of how one probability distribution (P ) is different from a second probability distribution (Q). If two distributions are identical, their KL div. should be 0. Hence, by minimizing KL div., we can find paramters of the second distribution (Q) that approximate P.
In this project i try to approximate the distribution P (sum of two gaussians) by minimizing its KL divergence with another gaussian distribution Q

***
