# SoundByte - Learn, Train, Deploy: An Academic-friendly DL Toolkit for Accelerated Learning and Prototyping

<div align="center">

[![Python](https://img.shields.io/badge/Python-3.12%2B-blue?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0%2B-orange?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org)
[![License](https://img.shields.io/badge/License-GNU-green?style=for-the-badge)](LICENSE)

[🚀 Quick Start](#-quick-start) • [📖 Documentation](https://cyborgman-g.github.io/tonfa.github.io/) • [🎯 Examples](https://cyborgman-g.github.io/tonfa.github.io/)

</div>

---

## ✨ Key Features

<div align="center">

| 🧩 **Modular Design** | 📝 **Minimal Code** | ⚙️ **JSON Configuration** | 📊 **Lightweight Dashboard** | 🔧 **Easy Integration** |
|:---------------------:|:-------------------:|:-------------------------:|:----------------------------:|:----------------------:|
| Plug-and-play components for maximum flexibility | Run complex experiments with just a few lines of code | Control everything through intuitive JSON configs | Track experiments with built-in visualization | Seamlessly integrate custom models |

</div>

## 🚀 Quick Start

### Installation

```bash
# Install from PyPI (recommended)
pip install soundbyte

# Install from source
git clone https://github.com/cyborgman-g/tonfa.github.io.git
cd soundbyte
pip install -e .
```

### Example Configuration JSON File

```json
{
  "experiment_name": "soundbyte test",
  "dataset":{
    "name/codefile": "custom_codefiles/dataset.py",
    "class_name": "TrainingDataset",
    "validation": false,
    "parameters":{
      "class_folder": "Datasets/DATASET_VOXCELEB/2",
      "duration": 4
      }
    },

  "architecture":{
    "name/codefile": "custom_codefiles/rawnet3.py",
    "class_name": "RawNet3",
    "parameters":{
      "model_scale": 8,
      "context": true,
      "summed": true,
      "encoder_type": "ECA",
      "nOut": 256,
      "out_bn": false,
      "sinc_stride": 10,
      "log_sinc": true,
      "norm_sinc": "mean",
      "grad_mult":1
      }
    },

  "loss_function":{
    "name/codefile": "custom_codefiles/loss_functin.py",
    "class_name": "AdMSoftmaxLoss",
    "train": true,
    "parameters":{
      "embedding_dim":256,
      "no_classes": 5994,
      "scale": 30.0,
      "margin": 0.4
      }
    },

  "optimizer":{
    "name/codefile": "AdamW",
    "class_name": "",
    "parameters":{}
    },

  "scheduler":{
    "name/codefile": "",
    "class_name": "",
    "parameters":{}
    },

  "train_minibatch_logic": {
    "name/codefile": "supervised_classification_train"
  },
  "valid_minibatch_logic": {
    "name/codefile": "supervised_classification_eval"
  },

  "training":{
    "epochs": 120,
    "batchsize": 48,
    "num_workers": 2,
    "metric": "accuracy",
    "mgpu": true,
    "gpu": 1,
    "num_gpus": 3,
    "log_minibatchstats_after": 10
    }
}
```
1. **Organize Source Files**
  - Place all relevant source files into a directory named `custom_codefiles` (change accordingly).  
  - Ensure that the configuration file (e.g., `configuration.json`) references the correct paths to the contents of this folder.

2. **Execute Classification Script**
   Run the following command in the terminal to start the supervised classification process:
   ```bash
   soundbyte_supervised_classification --json_config ./configuration.json
   ```
---

## 🎯 Native PyTorch's Support & Custom Module Support

We support these elements by default.

### Datasets
```json
{
  'torchvision': [
      'CIFAR10', 'CIFAR100', 'CLEVRClassification', 'CREStereo', 'Caltech101', 'Caltech256', 'CarlaStereo',
      'CelebA', 'Cityscapes', 'CocoCaptions', 'CocoDetection', 'Country211', 'DTD', 'EMNIST',
      'ETH3DStereo', 'EuroSAT', 'FER2013', 'FGVCAircraft', 'FakeData', 'FallingThingsStereo', 'FashionMNIST',
      'Flickr30k', 'Flickr8k', 'Flowers102', 'FlyingChairs', 'FlyingThings3D', 'Food101', 'GTSRB',
      'HD1K', 'HMDB51', 'INaturalist', 'ImageNet', 'Imagenette', 'InStereo2k', 'KMNIST',
      'Kinetics', 'Kitti', 'Kitti2012Stereo', 'Kitti2015Stereo', 'KittiFlow', 'LFWPairs', 'LFWPeople',
      'LSUN', 'LSUNClass', 'MNIST', 'Middlebury2014Stereo', 'MovingMNIST', 'Omniglot', 'OxfordIIITPet',
      'PCAM', 'PhotoTour', 'Places365', 'QMNIST', 'RenderedSST2', 'SBDataset', 'SBU',
      'SEMEION', 'STL10', 'SUN397', 'SVHN', 'SceneFlowStereo', 'Sintel', 'SintelStereo',
      'StanfordCars', 'UCF101', 'USPS', 'VOCDetection', 'VOCSegmentation', 'WIDERFace'
      ],
    
    'torchaudio': [
      'CMUARCTIC', 'CMUDict', 'COMMONVOICE', 'DR_VCTK', 'FluentSpeechCommands', 'GTZAN', 'IEMOCAP',
      'LIBRISPEECH', 'LIBRITTS', 'LJSPEECH', 'LibriLightLimited', 'LibriMix', 'LibriSpeechBiasing', 'MUSDB_HQ',
      'QUESST14', 'SPEECHCOMMANDS', 'Snips', 'TEDLIUM', 'VCTK_092', 'VoxCeleb1Identification', 'VoxCeleb1Verification', 
      'YESNO'
      ]
  }
```
Example dataset element of config.json for SPEECHCOMMAND Dataset
```json
"dataset":{
    "name/codefile": "SPEECHCOMMAND",
    "class_name": "",
    "validation": false,
    "parameters":{
      "root": "./data",
      "download": true,
      "split": "train",
      }
    },
```

### Models
```json
{
  'torchvision': [
    'alexnet', 'convnext_base', 'convnext_large', 'convnext_small', 'convnext_tiny', 'deeplabv3_mobilenet_v3_large', 'deeplabv3_resnet101',
    'deeplabv3_resnet50', 'densenet121', 'densenet161', 'densenet169', 'densenet201', 'efficientnet_b0', 'efficientnet_b1',
    'efficientnet_b2', 'efficientnet_b3', 'efficientnet_b4', 'efficientnet_b5', 'efficientnet_b6', 'efficientnet_b7', 'efficientnet_v2_l',
    'efficientnet_v2_m', 'efficientnet_v2_s', 'fasterrcnn_mobilenet_v3_large_320_fpn', 'fasterrcnn_mobilenet_v3_large_fpn', 'fasterrcnn_resnet50_fpn', 'fasterrcnn_resnet50_fpn_v2', 'fcn_resnet101', 
    'fcn_resnet50', 'fcos_resnet50_fpn', 'googlenet', 'inception_v3', 'keypointrcnn_resnet50_fpn', 'lraspp_mobilenet_v3_large', 'maskrcnn_resnet50_fpn', 
    'maskrcnn_resnet50_fpn_v2', 'maxvit_t', 'mc3_18', 'mnasnet0_5', 'mnasnet0_75', 'mnasnet1_0', 'mnasnet1_3', 
    'mobilenet_v2', 'mobilenet_v3_large', 'mobilenet_v3_small', 'mvit_v1_b', 'mvit_v2_s', 'quantized_googlenet', 'quantized_inception_v3', 
    'quantized_mobilenet_v2', 'quantized_mobilenet_v3_large', 'quantized_resnet18', 'quantized_resnet50', 'quantized_resnext101_32x8d', 'quantized_resnext101_64x4d', 'quantized_shufflenet_v2_x0_5',
    'quantized_shufflenet_v2_x1_0', 'quantized_shufflenet_v2_x1_5', 'quantized_shufflenet_v2_x2_0', 'r2plus1d_18', 'r3d_18', 'raft_large', 'raft_small', 
    'regnet_x_16gf', 'regnet_x_1_6gf', 'regnet_x_32gf', 'regnet_x_3_2gf', 'regnet_x_400mf', 'regnet_x_800mf', 'regnet_x_8gf',
    'regnet_y_128gf', 'regnet_y_16gf', 'regnet_y_1_6gf', 'regnet_y_32gf', 'regnet_y_3_2gf', 'regnet_y_400mf', 'regnet_y_800mf', 
    'regnet_y_8gf', 'resnet101', 'resnet152', 'resnet18', 'resnet34', 'resnet50', 'resnext101_32x8d', 
    'resnext101_64x4d', 'resnext50_32x4d', 'retinanet_resnet50_fpn', 'retinanet_resnet50_fpn_v2', 's3d', 'shufflenet_v2_x0_5', 'shufflenet_v2_x1_0', 
    'shufflenet_v2_x1_5', 'shufflenet_v2_x2_0', 'squeezenet1_0', 'squeezenet1_1', 'ssd300_vgg16', 'ssdlite320_mobilenet_v3_large', 'swin3d_b', 
    'swin3d_s', 'swin3d_t', 'swin_b', 'swin_s', 'swin_t', 'swin_v2_b', 'swin_v2_s', 
    'swin_v2_t', 'vgg11', 'vgg11_bn', 'vgg13', 'vgg13_bn', 'vgg16', 'vgg16_bn', 
    'vgg19', 'vgg19_bn', 'vit_b_16', 'vit_b_32', 'vit_h_14', 'vit_l_16', 'vit_l_32', 
    'wide_resnet101_2', 'wide_resnet50_2'
    ],
    
  'torchaudio_models': [
    'Conformer', 'ConvTasNet', 'DeepSpeech', 'Emformer', 'HDemucs', 'HuBERTPretrainModel', 'RNNT',
    'RNNTBeamSearch', 'SquimObjective', 'SquimSubjective', 'Tacotron2', 'Wav2Letter', 'Wav2Vec2Model', 'WaveRNN'
    ],
  
  'torchaudio_pipelines': [
    'CONVTASNET_BASE_LIBRI2MIX', 'HDEMUCS_HIGH_MUSDB', 'HDEMUCS_HIGH_MUSDB_PLUS', 'HUBERT_ASR_LARGE', 'HUBERT_ASR_XLARGE', 'HUBERT_BASE', 'HUBERT_LARGE', 
    'HUBERT_XLARGE', 'MMS_FA', 'SQUIM_OBJECTIVE', 'SQUIM_SUBJECTIVE', 'VOXPOPULI_ASR_BASE_10K_DE', 'VOXPOPULI_ASR_BASE_10K_EN', 'VOXPOPULI_ASR_BASE_10K_ES', 
    'VOXPOPULI_ASR_BASE_10K_FR', 'VOXPOPULI_ASR_BASE_10K_IT', 'WAV2VEC2_ASR_BASE_100H', 'WAV2VEC2_ASR_BASE_10M', 'WAV2VEC2_ASR_BASE_960H', 'WAV2VEC2_ASR_LARGE_100H', 'WAV2VEC2_ASR_LARGE_10M', 
    'WAV2VEC2_ASR_LARGE_960H', 'WAV2VEC2_ASR_LARGE_LV60K_100H', 'WAV2VEC2_ASR_LARGE_LV60K_10M', 'WAV2VEC2_ASR_LARGE_LV60K_960H', 'WAV2VEC2_BASE', 'WAV2VEC2_LARGE', 'WAV2VEC2_LARGE_LV60K', 
    'WAV2VEC2_XLSR53', 'WAV2VEC2_XLSR_1B', 'WAV2VEC2_XLSR_2B', 'WAV2VEC2_XLSR_300M', 'WAVLM_BASE', 'WAVLM_BASE_PLUS', 'WAVLM_LARGE'
    ]
  }
```
Example architecture element of config.json for WAV2VEC2_BASE
```json
"architecture":{
  "name/codefile": "WAV2VEC2_BASE",
  "class_name": "",
  "parameters":{
    "pretrained": true,
    }
  },
```
In "parameters" element you can add model specific parameters.


### Loss-Functions
```json
{
  'regression': [
    'GaussianNLLLoss', 'HuberLoss', 'L1Loss', 'MSELoss', 'PoissonNLLLoss', 'SmoothL1Loss'
    ],
  'classification': [
    'BCELoss', 'BCEWithLogitsLoss', 'CrossEntropyLoss', 'MultiLabelMarginLoss', 'MultiLabelSoftMarginLoss', 'MultiMarginLoss', 'NLLLoss',
    'SoftMarginLoss'
    ],
  'ranking': [
    'CosineEmbeddingLoss', 'HingeEmbeddingLoss', 'MarginRankingLoss', 'TripletMarginLoss', 'TripletMarginWithDistanceLoss'
    ], 
  'other': [
    'AdaptiveLogSoftmaxWithLoss', 'CTCLoss', 'KLDivLoss', 'NLLLoss2d'
    ]
}
```
Example loss-function element of config.json for CrossEntropyLoss
```json
"loss_function":{
    "name/codefile": "CrossEntropyLoss",
    "class_name": "",
    "train": false,
    "parameters":{}
    },
```
In "parameters" element you can add loss-function specific parameters.


### Optimizers & Schedulers
```json
{
  "optimizers": [
    'ASGD', 'Adadelta', 'Adafactor', 'Adagrad', 'Adam', 'AdamW', 'Adamax', 
    'LBFGS', 'NAdam', 'Optimizer', 'RAdam', 'RMSprop', 'Rprop', 'SGD', 
    'SparseAdam'
    ],
  "schedulers": [
    'ChainedScheduler', 'ConstantLR', 'CosineAnnealingLR', 'CosineAnnealingWarmRestarts', 'CyclicLR', 'ExponentialLR', 'LRScheduler', 'LambdaLR', 'LinearLR', 'MultiStepLR', 'MultiplicativeLR', 'OneCycleLR', 'Optimizer', 'PolynomialLR', 
    'ReduceLROnPlateau', 'SequentialLR', 'StepLR', '_LRScheduler'
    ]
  }
```
Example loss-function element of config.json for CrossEntropyLoss
```json
"optimizer":{
  "name/codefile": "AdamW",
  "class_name": "",
  "parameters":{}
  },

"scheduler":{
  "name/codefile": "",
  "class_name": "",
  "parameters":{}
  },
```
In "parameters" element you can add optimizer/scheduler specific parameters. If name not provided for ["scheduler"]["name/codefile"] toolkit will load ReduceLROnPlateau by default with default parameters.

<style>
@keyframes vividGlow {
  0% {
    box-shadow: 0 0 10px rgba(139, 195, 74, 0.6);
  }
  50% {
    box-shadow: 0 0 20px rgba(139, 195, 74, 0.95);
  }
  100% {
    box-shadow: 0 0 10px rgba(139, 195, 74, 0.6);
  }
}
.vivid-glow {
  animation: vividGlow 1.5s ease-in-out infinite;
  transition: all 0.3s ease-in-out;
}
</style>

<blockquote class="vivid-glow" style="border-left: 4px solid #8BC34A; padding: 0.75em 1em; background: #fcfcfc;">
  <p style="margin: 0; font-size: 1.05em;">
    💡 <strong style="color:#558B2F;">Toolkit Expansion Underway</strong><br>
    <span style="color:#6D4C41;">We’re adding support for new</span>  
    <span style="color:#4FC3F7;"><strong>architectures</strong></span>,  
    <span style="color:#BA68C8;"><strong>datasets</strong></span>,  
    <span style="color:#FFB74D;"><strong>loss functions</strong></span>,  
    <span style="color:#FF7043;"><strong>optimizers</strong></span>, and  
    <span style="color:#4DB6AC;"><strong>schedulers</strong></span> —  
    <em style="color:#3E2723;">beyond standard PyTorch</em> to enhance research flexibility.
  </p>
</blockquote>

---


## Supported Tasks:
### Supervised Classification
```bash
soundbyte_supervised_classification --json_config /path-to-config.json
```
By running the above command with your desired configuration file, you can train any model on any dataset using custom loss functions, optimizers, and schedulers—all within the scope of supervised classification.

<style>
@keyframes softPulse {
  0% {
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.4);
  }
  50% {
    box-shadow: 0 0 16px rgba(76, 175, 80, 0.85);
  }
  100% {
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.4);
  }
}
.soft-pulse {
  animation: softPulse 3s ease-in-out infinite;
  transition: all 0.3s ease-in-out;
}
</style>

<blockquote class="soft-pulse" style="border-left: 4px solid #4CAF50; padding: 0.5em 1em; background: #f9f9f9;">
  <p style="margin: 0; font-size: 1.05em;">
    💡 <strong style="color:#2E7D32;">Toolkit Expansion Underway</strong><br>
    <span style="color:#555;">
      We're in progress of implementing a growing set of 
      <strong style="color:#4FC3F7;">plug-and-play tasks</strong> out of the box.  
      For custom tasks, you can seamlessly extend functionality by defining your own 
      <strong style="color:#BA68C8;">minibatch_logic</strong> directly in the JSON configuration.
    </span>  
  </p>
</blockquote>

---

## 📊 Dashboard

<div align="center">

*Real-time experiment tracking with built-in lightweight dashboard*

| Metrics Visualization | Model Comparison | Resource Monitoring |
|:---------------------:|:----------------:|:------------------:|
| 📈 Loss curves, accuracy plots | 🔄 Side-by-side experiment comparison | 💻 GPU/CPU utilization graphs |
| 📊 Custom metric tracking | 📋 Hyperparameter analysis | 💾 Memory usage monitoring |

</div>

---


## 📜 License

This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html). You are free to use, modify, and distribute this software under the terms of the GPL.

---

## 📞 Support & Community
For all support, questions, bug reports, or contribution-related queries, please contact us at:
📬 **[cyborgman-g](mailto:vishal.9871537482@gmail.com)**

</div>

---

<div align="center">

**⭐ Star us on GitHub — it motivates us a lot!**
[⬆ Back to Top](#-soundbyte)

</div>