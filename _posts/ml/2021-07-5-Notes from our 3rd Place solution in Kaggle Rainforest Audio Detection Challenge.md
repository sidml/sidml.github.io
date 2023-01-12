Recently I participated in Kaggle's [Rainforest Connection Species Audio Detection challenge](https://www.kaggle.com/competitions/rfcx-species-audio-detection/) with my friend [Ee Kin](https://www.linkedin.com/in/chineekin/). In this post I share the psuedo labels generation procedure, performance of different model architectures and loss functions in more detail. Ee Kin's had also posted on [Kaggle Forum](https://www.kaggle.com/competitions/rfcx-species-audio-detection/discussion/220522). I have created a [notebook](https://www.kaggle.com/code/meaninglesslives/rfcx-minimal/notebook) that reproduces the essential components of our winning entry.

## Overview
Our final solution was a mean of eight stratified 5-fold models trained on True positive labels of all recording ids in train_tp.csv and recording ids in train_fp.csv with heavy augmentations. Additionally, some models were trained on pseudo labels from a 3 model ensembled model predictions on test set and a [hand-labeled external dataset](https://www.kaggle.com/dicksonchin93/eleutherodactylus-frogs) by Ee Kin. We also post-processed the blended results by thresholding species 3. Each model took around 24 hours to train on 5 stratified folds. Ee Kin’s solution was based on Catalyst library using Pytorch and my solution was based on pytorch lightning library. 
## Features Selection & Augmentations
We generated mel-spectrograms of 5 second audio clips with a 32kHz sampling rate, a hop size of 716, a window size of 1366, and 224 or 128 Number of Mels. The spectrogram image dimensions were (num_mel_bins, 750).
- Audio based augmentations

    We used the following audio based augmentations pink noise, bandpass noise, white noise,reverberation,time stretch,VolumeControl and time Shift with duration < 1s.
- Image based augmentations

    We found RandomBrightness, Cutout and CoarseDropout to be useful.

## Training Method
Using train_tp.csv to create stratified folds had the potential to leak some training data into our validation data so we treated the problem as a multilabel target and used iterative-stratification to stratify the data into 5 partitions using unique recording ids and its multilabel targets. 
We experimented with different audio duration during the competition, but in the end we observed that 5 second duration for training and prediction resulted in best LWLWRAP score on both public lb and local validation.
The 5-second audio was randomly sampled during training and in prediction time a 5-second sliding window was used with overlap and the max of predictions was used. We found that the way in which 5-second audio is randomly sampled during training was an important augmentation method. 

## Loss
There is imbalance in the distribution of bird species, for ex: species 3 occurs very frequently. During training we found that initially model learns to classify species 3 and as the training proceeds it starts "forgetting". The confidence for species 3 goes on decreasing which negatively impacts the LWLWRAP score. So, we needed to make sure that other species are learnt without forgetting species 3. We found that recall rate for species 3 can be improved by setting pos_weight in BCELoss. You may find this paper interesting if you are more curious: https://arxiv.org/pdf/1612.00796.pdf (especially section 2.1)

## Miscellaneous
- Post processing the species 3 labels to be 1 with a 0.95 threshold and it boosted the score slightly.
- Validation scheme should be similar to test scheme. For ex: If you feed 5s chunks during test and then take max, the same thing should be done during validation also.
- Click Noise Augmentation to be very useful (https://librosa.org/doc/0.8.0/generated/librosa.clicks.html)
- Using pretrained weights (imagenet/cornell) can help to converge much faster.
- Model Averaging seems to always lead to better generalization.
- 5s crops seems to perform slightly better than 10s crops.

References
- Specmix https://github.com/ebouteillon/freesound-audio-tagging-2019#SpecMix-1
- Mixup https://arxiv.org/abs/1710.09412
- FMix https://github.com/ecs-vlc/FMix
- https://github.com/rwightman/pytorch-image-models for models