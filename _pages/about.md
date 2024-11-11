---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

I'm an incoming PhD student from TSAIL, advised by Prof. [[Jun Zhu](https://ml.cs.tsinghua.edu.cn/~jun/index.shtml)], with keen interest in Trustworthy ML and diffusion models. My aspiration is to elevate AI to the realm of science, moving beyond its current engineering-focused approach. My preferred research paradigm involves observing phenomena, proposing multiple explanations, constructing various theories, validating corollaries, and ultimately deriving solutions or methodologies. I'm eager to connect with anyone who shares this vision for AI or appreciates the same research approach.

Currently, most people formalize AI problems as a mapping from input to output, using neural networks to learn this mapping end-to-end through direct training, thereby achieving the desired functionality. Recent trends, like scaling up these learning paradigms in pursuit of AGI, have gained traction. However, I believe that the academic community should delve deeper into whether fundamental issues exist within this learning paradigm that cannot be resolved by merely scaling up—for example, adversarial examples still pose significant risks in large models, and it remains questionable whether these models learn probabilistic distributions or reasoning. On the other hand, we should also explore broader learning paradigms and design fundamentally different storage structures, optimization methods, and mapping techniques. This ensures that if the current learning paradigm proves unscalable, we will still have numerous alternatives to explore, preventing research in this field from reaching an impasse.

Based on the aspiration of "establishing a science for AI", all my research revolves around two main themes mentioned before: "exploring the fundamental issues of the current paradigm" and "creating fundamentally different learning paradigms."

# 📝 Papers in "Creating Fundamentally Different Learning Paradigms"


## Robust Classification via a Single Diffusion Model
**Huanran Chen**, Yinpeng Dong, Zhengyi Wang, Xiao Yang, Chengqi Duan, Hang Su, Jun Zhu    
- Proposing diffusion classifier, directly use diffusion models as classifiers without discriminative training.
- Demonstrating the robustness of diffusion classifier on O.O.D. data and adversarial examples.
- Deriving the optimal solution of diffusion models, a theoretical tools for analyzing diffusion models.
- Proposing an efficient approximate marginal inference, Likelihood Maximization.
-  [[ICML2024](https://arxiv.org/abs/2305.15241)]


## Diffusion Models are Certifiably Robust Classifiers
**Huanran Chen**, Yinpeng Dong, Shitong Shao, Zhongkai Hao, Xiao Yang, Hang Su, Jun Zhu       
- Deriving two evidence lower bounds (ELBOs) for log likelihood on noisy data.
- Constructing two new diffusion classfiers base on these ELBOs.
- Deriving the analytical form for the gradient of diffusion classifiers (without UNet Jacobian).
- Deriving three Lipschitzness and robustness lower bound for these diffusion classifiers.
- Achieving state-of-the-art certified robustness (highest provable lower bound).
-  [[NeurIPS2024](https://arxiv.org/abs/2402.02316)]


## Membership Inference on Text-to-Image Diffusion Models via Conditional Likelihood Discrepancy
Shengfang Zhai, **Huanran Chen**, Yinpeng Dong, Jiajun Li, Qingni Shen, Yansong Gao, Hang Su, Yang Liu
- Proving that diffusion models overfit more to joint distribution p(x, y) than marginal distribution p(x).
-  [[NeurIPS2024](https://arxiv.org/abs/2405.14800)]



# 📝 Papers in "Optimization and Generalization"
(\*: Equal Contribution; ${}^\dagger$: Corresponding Author)


## Rethinking Model Ensemble in Transfer-based Adversarial Attacks
**Huanran Chen**, Yichi Zhang, Yinpeng Dong, Jun Zhu               
- Identifying two second order information, flatness and closeness of local optima, strongly correlate with generalization error.
- Providing generalization bound for closeness.
- Proposing CWA optimizer for optimizing the closeness.
- [[ICLR2024](https://arxiv.org/abs/2303.09105)]

## Bootstrap Generalization Ability from Loss Landscape Perspective
**Huanran Chen**, Shitong Shao, Ziyi Wang, Zirui Shang, Jin Chen, Xiaofeng Ji, Xinxiao Wu   
- Proposing new backbone, scheduler, training paradigm to encourage flatness of local optima.
- Explaining previous tricks and regularization from landscape perspective.
- ALRS is extremely helpful when using SGD. Strongly recommend ALRS if you are going to use SGD.
- [[ECCVW2022](https://arxiv.org/abs/2209.08473)]

## How Robust is Google's Bard to Adversarial Image Attacks?
Yinpeng Dong, **Huanran Chen**, Jiawei Chen, Zhengwei Fang, Xiao Yang, Yichi Zhang, Yu Tian, Hang Su, Jun Zhu
- Direct application of CWA optimizer on Large Vision Language Models.
- Successfully breaks VLMs like GPT-4, Claude, Gemini with more than 50%+ attack success rate.
- [[NeurIPSW2023](https://arxiv.org/abs/2309.11751)]

## T-SEA: Transfer-based Self-Ensemble Attack on Object Detection
Hao Huang\*, Ziyan Chen\*, **Huanran Chen**\*, Yongtao Wang, Kevin Zhang    
- Direct application of my previous two theoretical work on adversarial attacks towards object detectors.
- A convenient framework for generating adversarial patches.
- [[CVPR2023](https://openaccess.thecvf.com/content/CVPR2023/html/Huang_T-SEA_Transfer-Based_Self-Ensemble_Attack_on_Object_Detection_CVPR_2023_paper.html)]


## On the Duality Between Sharpness-Aware Minimization and Adversarial Training
Yihao Zhang, Hangzhou He, Jingyu Zhu, **Huanran Chen**, Yifei Wang, Zeming Wei         
- Providing theoretical connections between Sharpness-Aware Minimization and Adversarial Training.
-  [[ICML2024](https://arxiv.org/abs/2402.15152)]




# 📖 Internships
- *2022.11 - present*, Research Intern at TSAIL, Tsinghua University.    Advised by Prof. Jun Zhu  
- *2022.06 - 2022.11*, Research Intern at VDIG, Wangxuan Institute, Peking University.     Advised by Prof. Yongtao Wang    
- *2022.02 - 2022.06*, Research Intern at MCISLAB, Beijing Institute of Technology.    Advised by Prof. Xinxiao Wu    



# 💻 Projects
I place a high emphasis on code quality. I ensure that my project code is modular, plug-and-play, and must be clear and understandable. This makes it convenient for users to directly import or copy parts of the code.       
I have reproduced over ten types of diffusion models such as EDM, DDIM, SDE, and DDPM, as well as over ten adversarial attacks like SSA, CWA, and VMI, and more than ten defense methods including AT and DiffPure. I hope my library can help others quickly familiarize themselves with these algorithms and facilitate their research.

- [[Adversarial Attacks package](https://github.com/huanranchen/AdversarialAttacks)]
- [[Attacks on GPT-4 and Bard](https://github.com/thu-ml/Attack-Bard)]
- [[Adversarial Attacks on Object Detection](https://github.com/VDIGPKU/T-SEA)]
- [[Landscape Visualization](https://github.com/huanranchen/Visualize-Loss-Landscape)]


# 💼 Academic Service
P.S. Just some volunteering to show that I am happy to contribute to society (QwQ).                
Proof of my participation in these volunteer services can be verified on the respective conference websites.

- Journal Reviewer: T-PAMI, TMLR, Frontier of CS
- Conference Reviewer: ICLR 2024/2025, NeurIPS 2024, AISTATS 2025, CVPR/ECCV 2024, ACMMM/ICPR/ICME 2024
- Workshop Reviewer: NeurIPS2023-R0-FoMo, ICLR2024-BGPT, ICLR2024-SeT


Update:                                 
I will absolutely never serve as a reviewer for NeurIPS/ACMMM/AAAI/IJCAI. These conferences have provided me with a very poor review experience, assigning more than 5 or 6 low-quality papers that lack rigor and scientific spirit, wasting a significant amount of my time.



# 🔥 Links

Links to my friends. I welcome connections with anyone who shares the same vision or hobbies as I do.

- Advisor: [[Yinpeng Dong](https://ml.cs.tsinghua.edu.cn/~yinpeng/)],  [[Hang Su](https://www.suhangss.me/)], [[Jun Zhu](https://ml.cs.tsinghua.edu.cn/~jun/index.shtml)]       
- Friends: [[Ziruo Wang](https://zerowang030221.github.io/)],  [[Zeming Wei](https://weizeming.github.io/)], [[Zhengyi Wang](https://thuwzy.github.io/)], [[Shitong Shao]()]




# 📧 Emails

I truly believe that great ideas and improvements come from open discussions and debates in academia. If you have any thoughts, disagreements with my work, or fresh ideas you'd like to share, I'd be really grateful to hear from you.

If you've got any questions about my research or if you've tried reaching out through GitHub issues and haven't heard back, please don't hesitate to drop me an email. I’m always here to chat or help out in any way I can.

**If you are inclined to discuss publication or citation numbers, rely on numerical indicators to quantify individuals, or compare me to others, please refrain from contacting me. I am only interested in discussing intriguing problems and insights, not metrics.**

My preferred email: huanran.chen@outlook.com; huanran_chen@outlook.com; huanran.chen@realai.ai;

Please avoid sending emails to huanranchen@bit.edu.cn, as I won't be able to access this account much longer.


