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

I'm a junior year undergraduate from TSAIL, with keen interest in Trustworthy ML and diffusion models. My aspiration is to elevate AI to the realm of science, moving beyond its current engineering-focused approach. My preferred research paradigm involves observing phenomena, proposing multiple explanations, constructing various theories, validating corollaries, and ultimately deriving solutions or methodologies. I'm eager to connect with anyone who shares this vision for AI or appreciates the same research approach.

Currently, most people formalize AI problems as a mapping from input to output, using neural networks to learn this mapping end-to-end through direct training, thereby achieving the desired functionality. Recent trends, like scaling up these learning paradigms in pursuit of AGI, have gained traction. However, I believe that the academic community should delve deeper into whether fundamental issues exist within this learning paradigm that cannot be resolved by merely scaling up—for example, adversarial examples still pose significant risks in large models, and it remains questionable whether these models learn probabilistic distributions or reasoning. On the other hand, we should also explore broader learning paradigms and design fundamentally different storage structures, optimization methods, and mapping techniques. This ensures that if the current learning paradigm proves unscalable, we will still have numerous alternatives to explore, preventing research in this field from reaching an impasse.

Based on the aspiration of "establishing a science for AI", all my research revolves around two main themes mentioned before: "exploring the fundamental issues of the current paradigm" and "creating fundamentally different learning paradigms."

# 📝 Papers in "Creating Fundamentally Different Learning Paradigms"

## Your Diffusion Model is Secretly a Certifiably Robust Classifier
**Huanran Chen**, Yinpeng Dong, Shitong Shao, Zhongkai Hao, Xiao Yang, Hang Su, Jun Zhu            
-  [[arxiv](https://arxiv.org/abs/2402.02316)]


## Robust Classification via a Single Diffusion Model
**Huanran Chen**, Yinpeng Dong, Zhengyi Wang, Xiao Yang, Chengqi Duan, Hang Su, Jun Zhu            
-  [[ICML2024](https://arxiv.org/abs/2305.15241)]


# 📝 Papers in "Optimization and Generalization"
(\*: Equal Contribution; ${}^\dagger$: Corresponding Author)




## How Robust is Google's Bard to Adversarial Image Attacks?
Yinpeng Dong, **Huanran Chen**, Jiawei Chen, Zhengwei Fang, Xiao Yang, Yichi Zhang, Yu Tian, Hang Su, Jun Zhu
-  [[NeurIPSW2023](https://arxiv.org/abs/2309.11751)]


## Rethinking Model Ensemble in Transfer-based Adversarial Attacks
**Huanran Chen**, Yichi Zhang, Yinpeng Dong, Jun Zhu               
- [[ICLR2024](https://arxiv.org/abs/2303.09105)]

## Teach What You Should Teach: A Data-based Distillation Method.
Shitong Shao, **Huanran Chen**, Zhen Huang, Lirui Gong, Shuai Wang, Xinxiao Wu      
- [[IJCAI2023](https://arxiv.org/abs/2212.05422)] (<font color="red">oral</font>)

## T-SEA: Transfer-based Self-Ensemble Attack on Object Detection
Hao Huang\*, Ziyan Chen\*, **Huanran Chen**\*, Yongtao Wang, Kevin Zhang           
- [[CVPR2023](https://openaccess.thecvf.com/content/CVPR2023/html/Huang_T-SEA_Transfer-Based_Self-Ensemble_Attack_on_Object_Detection_CVPR_2023_paper.html)]

## Bootstrap Generalization Ability from Loss Landscape Perspective
**Huanran Chen**, Shitong Shao, Ziyi Wang, Zirui Shang, Jin Chen, Xiaofeng Ji, Xinxiao Wu   
- [[ECCVW2022](https://arxiv.org/abs/2209.08473)]


## On the Duality Between Sharpness-Aware Minimization and Adversarial Training
Yihao Zhang, Hangzhou He, Jingyu Zhu, **Huanran Chen**, Yifei Wang, Zeming Wei         
-  [[ICML2024](https://arxiv.org/abs/2402.15152)]

## Enhancing Adversarial Attacks: The Similar Target Method
Shuo Zhang, Ziruo Wang, Zikai Zhou, **Huanran Chen${}^\dagger$**      
-  [[IJCNN2024](https://arxiv.org/abs/2308.10743)]




# 📖 Internships
- *2022.11 - present*, Research Intern at TSAIL, Tsinghua University.    Advised by Prof. Jun Zhu  
- *2022.06 - 2022.11*, Research Intern at VDIG, Wangxuan Institute, Peking University.     Advised by Prof. Yongtao Wang    
- *2022.02 - 2022.06*, Research Intern at MCISLAB, Beijing Institute of Technology.    Advised by Prof. Xinxiao Wu    



# 💻 Projects

## Adversarial Attacks package
- [[code](https://github.com/huanranchen/AdversarialAttacks)]

## Attacks on GPT-4 and Bard
- [[code](https://github.com/thu-ml/Attack-Bard)]

## Adversarial Attacks on Object Detection
- [[code](https://github.com/VDIGPKU/T-SEA)]

## Landscape Visualization
- [[code](https://github.com/huanranchen/Visualize-Loss-Landscape)]


# 💼 Academic Service
- Conference Reviewer in ICLR 2024, NeurIPS 2024, ECCV 2024
- Workshop Reviewer in NeurIPS2023-R0-FoMo, ICLR2024-BGPT, ICLR2024-SeT
- Conference Reviewer in ACMMM 2024, ICPR 2024, ICME 2024

# 🔥 Links
- Advisor: [[Yinpeng Dong](https://ml.cs.tsinghua.edu.cn/~yinpeng/)], [[Jun Zhu](https://ml.cs.tsinghua.edu.cn/~jun/index.shtml)]       
- Friends: [[Ziruo Wang](https://zerowang030221.github.io/)],  [[Zeming Wei](https://weizeming.github.io/)], [[Zhengyi Wang](https://thuwzy.github.io/)], [[Shitong Shao]()]




# 📧 Emails

I truly believe that great ideas and improvements come from open discussions and debates in academia. If you have any thoughts, disagreements with my work, or fresh ideas you'd like to share, I'd be really grateful to hear from you.

If you've got any questions about my research or if you've tried reaching out through GitHub issues and haven't heard back, please don't hesitate to drop me an email. I’m always here to chat or help out in any way I can.

My preferred email: huanran_chen@outlook.com

Please avoid sending emails to huanranchen@bit.edu.cn, as I won't be able to access this account much longer.
