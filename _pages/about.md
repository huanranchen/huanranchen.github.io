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


I'm an incoming PhD student from TSAIL (Fall 2025), advised by Prof. [[Jun Zhu](https://ml.cs.tsinghua.edu.cn/~jun/index.shtml)], with a keen interest in the physics of machine learning. My **unattainable yet motivating** dream is to elevate AI to the realm of science, making every phenomenon explainable and predictable. I believe this requires both theoretical thinking and extensive empirical observation on every phenomenon that neural networks can explain. My preferred research paradigm involves observing phenomena, proposing multiple explanations, constructing various theories, validating corollaries, and ultimately deriving solutions or methodologies. I'm eager to connect with anyone who shares this vision for AI or appreciates the same research approach.

I'm an extremely interest-driven person. I do research only for fun.




# 📝 Papers in "Robustness"

I care about robustness mainly because it provides a window into the inner mechanisms of neural networks. The existence of adversarial examples and the lack of benign overfitting in adversarial training have been longstanding topics that attract generation after generation of researchers.

Another reason is that most problems in robustness are what I classify as "white-box" problems, where we can use mathematical tools to accurately (without randomness) describe and solve them.

Among them, the certified bounds, which are data-dependent and model-dependent, mathematically prove the lower bound of robustness, and are gradually approaching the upper limit of empirical robustness.

On LLMs, I do this work:

## Towards the Worst-case Robustness of Large Language Models.
**Huanran Chen**, Zeming Wei, Yinpeng Dong
- White-box evaluations provide an empirical upper bound for worst-case robustness. Trivially (yes, this is trivial but require a large amount of time to do it), I present an optimizer that strictly evaluates models in the white-box setting by carefully and strictly aligning the tokens during optimization and inference.
- Demonstrates that existing large language model (LLM) defenses, including adversarial training (AT), achieve 0% robustness against white-box evaluations.
- To provide a lower bound on worst-case robustness, I focus on randomized smoothing, which smoothes a function with any pre-defined distribution.
- Reduces certified robustness with any smoothing distribution to a fractal knapsack problem or 0-1 knapsack problem, providing a general solver.
- Prove that the uniform kernel (diffusion model) is always better than the absorbing kernel (masked generation) in terms of robustness (when having the same accuracy).
- Prove that the uniform kernel is the best data-independent kernel, without knowing the data priors.
- Derive a Bayesian error upper bound for the uniform kernel, offering insights into the upper limit of the theoretical guarantee of robustness.
- Present a symmetric lemma, prove the symmetry of the trading graph, and use this lemma to easily analyze the properties of certified robustness (e.g., proving the relationship between certified robustness and vocabulary size).
- Achieved a certified radius of 2.00 in l2 (Bayesian upper bound of 2.10) and 6.57 in the suffix setting (where empirically researchers focus on suffix length 20).
- [[NeurIPS2024 SafeGenAI](https://arxiv.org/abs/2402.02316)]



When I was an undergraduate student, I also used diffusion models to provide certified guarantees in the vision domain (since diffusion models have many desirable properties).

## Robust Classification via a Single Diffusion Model
**Huanran Chen**, Yinpeng Dong, Zhengyi Wang, Jun Zhu  
- Proposing a diffusion classifier, directly using diffusion models as classifiers without discriminative training.
- Demonstrating the robustness of the diffusion classifier on out-of-distribution (O.O.D.) data and adversarial examples.
- Deriving the optimal solution for diffusion models, a theoretical tool for analyzing diffusion models.
- Proposing an efficient approximate marginal inference method, Likelihood Maximization.
- Achieving good empirical robustness without adversarial training.
- [[ICML2024](https://arxiv.org/abs/2305.15241)]

I did a theoretical work to provide a theoretical guarantee for this empirical work.

## Diffusion Models are Certifiably Robust Classifiers
**Huanran Chen**, Yinpeng Dong, Shitong Shao, Zhongkai Hao, Xiao Yang, Hang Su, Jun Zhu  
- Deriving two evidence lower bounds (ELBOs) for log likelihood on noisy data.
- Constructing two new noised diffusion classifiers based on these ELBOs (which enable us to have point-wise Lipschitz bounds).
- Deriving the analytical form of the gradient for diffusion classifiers (without the UNet Jacobian).
- Deriving three Lipschitzness and robustness lower bounds for these diffusion classifiers.
- Achieving state-of-the-art certified robustness, e.g., 70.7% certified robustness for l2 norm of 0.5, with only a 20% difference from the empirical upper bound.
- [[NeurIPS2024](https://arxiv.org/abs/2402.02316)]






# 📝 Papers in "Optimization and Generalization"

Generalization is the fundamental problem in machine learning, to which I would like to devote my whole life. In deep learning, I believe generalization is entangled with optimization, and cannot be separated from it as in the previous bias-variance tradeoff.

I have been greatly inspired by previous work on the relationship between sharpness and generalization. I focus on another second-order property: the closeness of local optima to each other.

## Closeness of the Local Optima: A Second Order Property Related to Generalization.
**Huanran Chen**, Yichi Zhang, Yinpeng Dong, Jun Zhu  
- Identifying two second-order properties, flatness and the closeness of local optima, which are strongly correlated with generalization error.
- Providing a generalization bound for closeness.
- Proposing the CWA optimizer for optimizing the closeness.
- [[ICLR2024](https://arxiv.org/abs/2303.09105)]

This CWA optimizer may lead to a fundamental and significant improvement when the solution of SGD lacks closeness.

## How Robust is Google's Bard to Adversarial Image Attacks?
Yinpeng Dong, **Huanran Chen**, Jiawei Chen, Zhengwei Fang, Xiao Yang, Yichi Zhang, Yu Tian, Hang Su, Jun Zhu  
- Direct application of the CWA optimizer on Large Vision Language Models.
- Successfully breaks VLMs like GPT-4 with more than 95% attack success rate.
- This demonstrates that when the solution of SGD lacks closeness, using a closeness optimizer can result in a fundamental improvement.
- [[NeurIPSW2023](https://arxiv.org/abs/2309.11751)]




Below is my first research project. It is simple, but it greatly cultivated my interest and encouraged me to devote my whole life to such an interesting problem.

## Bootstrap Generalization Ability from Loss Landscape Perspective
**Huanran Chen**, Shitong Shao, Ziyi Wang, Zirui Shang, Jin Chen, Xiaofeng Ji, Xinxiao Wu  
- Proposing a new backbone, scheduler, and training paradigm to encourage the flatness of local optima.
- Explaining previous tricks and regularization from the landscape perspective.
- ALRS is extremely helpful when using SGD, and I strongly recommend it if you are going to use SGD.
- [[ECCVW2022](https://arxiv.org/abs/2209.08473)]




# 📖 Internships
- *2025 - present*, PhD student at TSAIL, Tsinghua University.    Advised by Prof. Jun Zhu   
- *2021 - 2025*, Undergraduate at BIT.



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
- Conference Reviewer: ICML/ICLR/NeurIPS, AISTATS, CVPR/ECCV/ICCV, ACMMM/ICPR/ICME
- Workshop Reviewer: NeurIPS2023-R0-FoMo, ICLR2024-BGPT, ICLR2024-SeT



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

