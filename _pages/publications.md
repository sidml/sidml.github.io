---
layout: archive
author_profile: true
permalink: /publications/
---

## [Publications](#publications)
- ### Panoptic Segmentation for Automotive Radar PointCloud [[Link](https://ieeexplore.ieee.org/document/9764218)]
This paper presents an efficient approach to point cloud panoptic segmentation for automotive radar. Unlike most existing point cloud panoptic segmentation works, this method directly predicts both instance ID and semantic class without such intermediate step as clustering and is end-to-end differentiable. This is achieved by a novel instance labeling scheme in the training stage that facilitates the direct prediction of instance ID in the inference stage. More importantly, this new approach has low computation load and can achieve high frame rate in implementation, which is crucial for real time applications in automotive radar. Based on experimental evaluation with existing lidar point cloud data and our own radar point cloud data, we demonstrate that the proposed panoptic segmentation method can achieve good performance at a frame rate of higher than 150 FPS.

- ### Deep GoogLeNet Features for Visual Object Tracking [[Link](https://ieeexplore.ieee.org/abstract/document/8721317)]
Convolutional Neural Network (CNN) has recently become very popular in visual object tracking due to their strong feature representation capabilities. This paper presents an investigation of the impact of deep convolutional layer features in an object tracking framework. In this study, we demonstrate for the first time, the viability of features extracted from deep layers of GoogLeNet CNN architecture for the purpose of object tracking. We integrated GoogLeNet features in a discriminative correlation filter based tracking framework. Our experimental results show that the GoogLeNet features provides significant computational advantages over the conventionally used VGGNet features, without much compromise on the tracking performance. Further, Principal Component Analysis (PCA) was employed to reduce the dimensionality of the extracted features. This greatly reduces the computational cost and thus improve the speed of the tracking process. Extensive evaluation have been performed on three benchmark datasets: OTB, ALOV300++ and VOT2016 datasets and its performances are measured in terms of metrics like F-score, One Pass Evaluation, robustness and accuracy.

- ### Rotation Adaptive Visual Object Tracking with Motion Consistency [[Link](https://arxiv.org/abs/1709.06057)]
Visual Object tracking research has undergone significant improvement in the past few years. The emergence of tracking by detection approach in tracking paradigm has been quite successful in many ways. Recently, deep convolutional neural networks have been extensively used in most successful trackers. Yet, the standard approach has been based on correlation or feature selection with minimal consideration given to motion consistency. Thus, there is still a need to capture various physical constraints through motion consistency which will improve accuracy, robustness and more importantly rotation adaptiveness. Therefore, one of the major aspects of this paper is to investigate the outcome of rotation adaptiveness in visual object tracking. Among other key contributions, the paper also includes various consistencies that turn out to be extremely effective in numerous challenging sequences than the current state-of-the-art.

- ### STAP in Automotive MIMO Radar with Transmitter Scheduling [[Link](https://ieeexplore.ieee.org/document/9266601)]
Automotive radars often employ multiple-input multiple-output (MIMO) array to attain high angular resolution with few antenna elements. The diversity gain is generally achieved by time-division multiplexing (TDM) during the transmission of frequency-modulated continuous-wave (FMCW) signals. However, TDM mode leads to longer pulse repetition intervals and, therefore, inherently and severely limits the maximum unambiguous Doppler velocity that a radar is able to detect. In this paper, we address the Doppler ambiguity problem in TDM MIMO automotive radars through a space-time adaptive processing (STAP) approach. A direct application of STAP may lead to a high antenna sidelobe level that hampers the detection performance. We mitigate this through optimal transmitter scheduling. We formulate the problem as combinatorial optimization and solve it via reinforcement learning. Numerical and experimental results demonstrate the efficacy of our method when compared with conventional techniques.

***

## [Bachelor Thesis](#btech)
_This thesis was a part of my Bachelor's program in the Dept. of Avionics at the Indian Institute of Space Science & Technology Thiruvananthapuram, India, supervised by Professor [Deepak Mishra](https://www.iist.ac.in/node/848). Defended in **May 2017**._

My goal was to demonstrate the viability of features extracted from deep layers of GoogLeNet CNN architecture for the purpose of object tracking.. Towards this end, I integrated features extracted from GoogleNet in a discriminative correlation filter based tracking framework. 
Key Highlights:
1.  GoogLeNet features provides significant computational advantages over the conventionally used VGGNet features, without much compromise on the tracking performance.
2.  Principal Component Analysis (PCA) was employed to reduce the dimensionality of the extracted features. This greatly reduces the computational cost and thus improve the speed of the tracking process.
3. Extensive evaluation were performed on three benchmark datasets: OTB, ALOV300++ and VOT2016 datasets and its performances are measured in terms of metrics like F-score, One Pass Evaluation, robustness and accuracy.

[[Thesis PDF](https://drive.google.com/file/d/1pkoDCz5TCizen79yNJZXtP1xxRtFfwTv/view?usp=sharing), [Defense Slides](https://docs.google.com/presentation/d/1Rne0Pj28__HyKmdye8dQ9iMd9JQcBctV/edit?usp=sharing&ouid=102267158225060172499&rtpof=true&sd=true)], [Survey of prior methods](https://docs.google.com/presentation/d/1CrjicZDUMwgn4BYDI0hmjbSptabpwmSj/edit?usp=sharing&ouid=102267158225060172499&rtpof=true&sd=true)

***