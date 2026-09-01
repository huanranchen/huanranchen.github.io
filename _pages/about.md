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

# Huanran Chen

I'm a PhD student at TSAIL (Fall 2025), advised by Prof. [Jun Zhu](https://ml.cs.tsinghua.edu.cn/~jun/index.shtml), and closely collaborating with Prof. [Yinpeng Dong](https://ml.cs.tsinghua.edu.cn/~yinpeng/). I'm currently working in Prof. [Jingzhao Zhang](https://iiis.tsinghua.edu.cn/en/People/Faculty/ZhangJingzhao.htm)'s lab as a rotation student. I have a keen interest in the **physics of deep learning**. My **unattainable yet motivating** dream is to elevate AI to the realm of science, making every phenomenon explainable and predictable. I believe this requires both rigorous theoretical thinking and extensive empirical observation. My preferred research paradigm involves observing phenomena, proposing multiple explanations, constructing various theories from diverse aspects, validating corollaries, and ultimately deriving solutions or methodologies. I'm eager to connect with anyone who shares this vision for AI or appreciates the same research approach.

<div class="research-thesis" markdown="1">
**My current approach is intervention-first.** I look for predictions on which competing explanations disagree, then intervene on the optimizer, learning-rate schedule, model, or data. A successful prediction can become a method; a failed one reveals exactly where the theory needs to change.
</div>

> **Quick Facts:** 🧠 INTP 7w6 | 🥾 Founder of THU CollegeAI Hiker | 📜 Wei-Jin History Buff | 🍔 KFC/McDonald's Enthusiast

I do research largely for fun. Right now, I am especially interested in three questions:

- Which coarse variables and phase structure govern discrete optimization dynamics beyond gradient flow?
- How does optimization geometry couple to generalization?
- Which mechanisms survive controlled small-scale LLM pretraining experiments and support reliable interventions?

To me, the ultimate compliment is simply: “Your work is interesting.”


<span class='anchor' id='selected-work'></span>

## Selected Work

<p class="section-intro">A quick route through the papers that best represent my research. Longer explanations and the connections between them appear in <a href="#research-stories">Research Stories</a>.</p>

<div class="selected-work-grid">
  <article class="selected-work-item">
    <div class="selected-work-meta">PREPRINT · 2026</div>
    <h3>Nexus: Same Pretraining Loss, Better Downstream Generalization via Common Minima</h3>
    <p>The same pretraining loss can conceal different downstream behavior; Nexus explicitly optimizes for common minima across tasks.</p>
    <div class="selected-work-links"><a href="https://arxiv.org/abs/2604.09258">Paper</a><a href="https://github.com/huanranchen/NexusPretraining">Code</a><a href="https://www.bilibili.com/video/BV15c416WEMf/">Video</a></div>
  </article>
  <article class="selected-work-item">
    <div class="selected-work-meta">ICLR · 2026</div>
    <h3>Unveiling the Basin-Like Loss Landscape in Large Language Models</h3>
    <p>LLM loss landscapes form widening parameter-space basins that connect knowledge preservation, fine-tuning, and robustness.</p>
    <div class="selected-work-links"><a href="https://arxiv.org/abs/2505.17646">Paper</a><a href="https://zhuanlan.zhihu.com/p/1920616505151845374">Blog</a></div>
  </article>
  <article class="selected-work-item">
    <div class="selected-work-meta">ICLR · 2024</div>
    <h3>Rethinking Model Ensemble in Transfer-based Adversarial Attacks</h3>
    <p>Transferability depends on gradient closeness across models, revealing an optimization bias that matters even after training loss reaches zero.</p>
    <div class="selected-work-links"><a href="https://arxiv.org/abs/2303.09105">Paper</a><a href="https://zhuanlan.zhihu.com/p/680197033">Blog</a></div>
  </article>
  <article class="selected-work-item">
    <div class="selected-work-meta">ICML · 2024</div>
    <h3>Robust Classification via a Single Diffusion Model</h3>
    <p>A single generative diffusion model can act as a robust classifier without standard discriminative or adversarial training.</p>
    <div class="selected-work-links"><a href="https://arxiv.org/abs/2305.15241">Paper</a><a href="https://www.bilibili.com/video/BV1sk4y1S7pv/">Video</a></div>
  </article>
  <article class="selected-work-item">
    <div class="selected-work-meta">NEURIPS · 2024</div>
    <h3>Diffusion Models are Certifiably Robust Classifiers</h3>
    <p>We prove that diffusion models are certifiably unattackable within a guaranteed perturbation radius.</p>
    <div class="selected-work-links"><a href="https://arxiv.org/abs/2402.02316">Paper</a><a href="https://zhuanlan.zhihu.com/p/12592746504">Blog</a></div>
  </article>
  <article class="selected-work-item">
    <div class="selected-work-meta">SAFEGENAI @ NEURIPS · 2024</div>
    <h3>Towards the Worst-case Robustness of Large Language Models</h3>
    <p>Certified robustness under general discrete noise reduces to a knapsack problem, enabling tight guarantees for LLMs.</p>
    <div class="selected-work-links"><a href="https://arxiv.org/abs/2501.19040">Paper</a><a href="https://zhuanlan.zhihu.com/p/21266930786">Blog</a></div>
  </article>
</div>


<span class='anchor' id='publications'></span>
<span class='anchor' id='research-stories'></span>

## Research Stories

The sections below explain how the papers connect: what I observed, which mechanism I proposed, and what intervention or theorem tested it.

### Implicit Bias of Closeness

<details class="research-story" markdown="1">
<summary><strong>Read the full story: Closeness &amp; Optimization</strong></summary>

Generalization is my central problem in machine learning. In deep learning, I believe it is **deeply entangled with optimization**, rather than cleanly separable through the traditional bias-variance picture.

I have been greatly inspired by previous work on the relationship between sharpness and generalization. In recent years, I identified another implicit bias—which I term **closeness**—that strongly correlates with generalization across various settings.

<p align="center">
  <img src="/images/papers/nexus/geometry_closeness.png" width="80%" alt="Conceptual geometry of common minima and closeness across tasks" loading="lazy" decoding="async">
  <br>
</p>

The intuition for "closeness" struck me one day while visualizing the loss landscapes of multiple tasks. Take LLM pre-training, for example: the model optimizes an averaged loss across diverse data sources. However, I realized that achieving a low total training loss isn't the whole story. As illustrated in the figure above, two completely different types of minimizers can yield the **exact same training loss**. But a minimizer that lies geometrically **"close" to all individual task minima (the intersection)** inherently captures the **shared underlying structure**, leading to **significantly better downstream generalization** than a distant minimizer (the sum).

I further discovered that this geometric closeness is strictly upper-bounded by **gradient closeness**. Intuitively, if the gradients of each loss always share the same direction, their respective minimizers must be exactly the same. Moreover, gradient closeness serves as a powerful proxy for generalization, as demonstrated by the first-order approximation:

$$\underbrace{\mathcal{L}_{\mathcal{T}}(\boldsymbol{\theta}) - \mathcal{L}_{\mathcal{T}}(\boldsymbol{\theta}- \gamma \nabla \mathcal{L}_{\text{train}}(\boldsymbol{\theta})) }_{\text{decrease of downstream loss after one GD step on training set}} = \gamma \nabla \mathcal{L}_{\text{train}}(\boldsymbol{\theta})^\top \nabla \mathcal{L}_{\mathcal{T}}(\boldsymbol{\theta}) + O(\gamma^2).$$

Thus, when I mention "closeness", it encompasses both geometric and gradient closeness. To explicitly optimize this, I proposed **closeness-aware second-order optimizers** (such as **CWA** and its recent evolution, **Nexus**). 

<p align="center">
  <img src="/images/papers/nexus/nexus_algo.png" width="80%" alt="Overview of the Nexus optimization algorithm" loading="lazy" decoding="async">
  <br>
</p>

This optimization perspective produces consistent results across several settings:

**1. LLM Pre-training:** It achieves the **exact same pretraining loss curve** as the baseline, but delivers **significantly better downstream task generalization**.
#### Nexus: Same Pretraining Loss, Better Downstream Generalization via Common Minima
**Huanran Chen**, Huaqing Zhang, Xiao Li, Yinpeng Dong, Ke Shen, Jun Zhu
- [Paper](https://arxiv.org/abs/2604.09258) · [Video](https://www.bilibili.com/video/BV15c416WEMf/)

**2. Black-box Transfer Attacks:** It achieves much higher attack success rates than baselines. In this adversarial setting, models always trivially achieve **0 training loss**, meaning optimization speed is irrelevant—***generalization* is all that matters**.
#### Rethinking Model Ensemble in Transfer-based Adversarial Attacks
**Huanran Chen**, Yichi Zhang, Yinpeng Dong, Jun Zhu
- [ICLR 2024](https://arxiv.org/abs/2303.09105) · [Blog](https://zhuanlan.zhihu.com/p/680197033) · [Video](https://www.bilibili.com/video/BV13W421N7mi/)

**3. Breaking Production VLMs:** By maintaining closeness, the optimizer successfully bypassed the defenses of commercial black-box models like **Google Gemini, GPT-4V, and Bard** with a **>95% attack success rate**.
#### How Robust is Google's Bard to Adversarial Image Attacks?
Yinpeng Dong, **Huanran Chen**, Jiawei Chen, Zhengwei Fang, Xiao Yang, Yichi Zhang, Yu Tian, Hang Su, Jun Zhu
- [NeurIPS Workshop 2023](https://arxiv.org/abs/2309.11751) · [Blog](https://zhuanlan.zhihu.com/p/2991362466) · [Video](https://www.bilibili.com/video/BV13W421N7mi/)

</details>


### Basin-like Loss Landscapes in Deep Learning

<details class="research-story" markdown="1">
<summary><strong>Read the full story: LLM Basins &amp; Landscape Visualizations</strong></summary>

While plotting empirical loss landscapes of large language models, I observed that they often settle into broad, flat "basins" rather than isolated minima. This geometry connects to how models preserve knowledge and resist perturbations.

<p align="center">
  <img src="/images/papers/basin.webp" width="80%" alt="Loss landscape cross-sections illustrating an LLM basin" loading="lazy" decoding="async">
  <br>
</p>

#### Unveiling the Basin-Like Loss Landscape in Large Language Models
**Huanran Chen**, Zeming Wei, Yao Huang, Yichi Zhang, Yinpeng Dong, Jun Zhu.

- **The Basin Phenomenon:** We discovered that LLMs exhibit remarkable parameter-space robustness, forming stable "basins" across diverse benchmarks (e.g., Math, Coding, Safety) and models (Llama 2/3, Mistral, Vicuna). This basin phenomenon is non-trivial: it gradually emerges during the training process and consistently widens as model capacity scales up from 0.5B to 14B parameters. Interestingly, anywhere within this basin, the model generates diverse but consistently correct (or safe) responses.
- **Implications for Fine-Tuning & Attacks:** By visualizing the loss landscape along the Supervised Fine-Tuning (SFT) direction, we provide a clear geometric explanation for both catastrophic forgetting and fine-tuning attacks (e.g., performing normally on standard tasks but generating harmful content on malicious queries).
- **Theoretical Grounding via Randomized Smoothing:** We mathematically proved that average-case robustness to Gaussian noise inherently bounds the performance degradation caused by worst-case perturbations, including SFT. Furthermore, we elegantly extended this theoretical guarantee to *any* known noise distribution by reducing the certified bound calculation to a fractional or 0-1 knapsack problem.
- **Pre-training Regularization:** We demonstrated that incorporating Gaussian noise during the pre-training phase effectively transfers to enhanced robustness during downstream SFT, offering a principled way to widen these safe basins.

- [ICLR 2026](https://arxiv.org/abs/2505.17646) · [Blog](https://zhuanlan.zhihu.com/p/1920616505151845374)

<br>

My first research project sparked my interest in the geometry of neural networks and the connection between optimization and generalization.

#### Bootstrap Generalization Ability from Loss Landscape Perspective
**Huanran Chen**, Shitong Shao, Ziyi Wang, Zirui Shang, Jin Chen, Xiaofeng Ji, Xinxiao Wu  

- Proposed a novel backbone, scheduler, and training paradigm specifically designed to encourage the flatness of local optima during optimization.
- Provided a unified explanation for various empirical tricks and regularizations strictly through the lens of loss landscapes.
- **Practical Recommendation:** Demonstrated that our ALRS method provides a fundamental boost to standard SGD, offering a highly recommended plug-and-play solution if you are heavily relying on vanilla SGD.

- [ECCV Workshop 2022](https://arxiv.org/abs/2209.08473) · [Blog](https://www.zhihu.com/question/638766873/answer/3358801861) · [Video](https://www.bilibili.com/video/BV13W421N7mi/)

</details>


### Diffusion Models and Robustness Certification

<details class="research-story" markdown="1">
<summary><strong>Read the full story: Generative Models &amp; Certifiable Robustness</strong></summary>

This line of work began during my undergraduate years. While studying diffusion models, I was struck by a fascinating counter-intuition: a purely generative model, trained solely to denoise, inherently contains all the conditional distribution information needed to perform discriminative tasks—without a single step of standard discriminative training.

#### Robust Classification via a Single Diffusion Model
**Huanran Chen**, Yinpeng Dong, Zhengyi Wang, Jun Zhu  

- **Paradigm Shift:** Proposed directly utilizing a single diffusion generative model as a robust discriminative classifier, completely bypassing adversarial training.
- **Empirical Validation:** Demonstrated the inherent robustness of the diffusion classifier against both out-of-distribution (O.O.D.) data and adversarial examples.
- **Theoretical Tools:** Derived the optimal solution for diffusion models, providing a rigorous mathematical tool for analyzing their behavior.
- **Efficient Inference:** Proposed Likelihood Maximization as an efficient approximate marginal inference method.

- [ICML 2024](https://arxiv.org/abs/2305.15241) · [Blog](https://zhuanlan.zhihu.com/p/675067562) · [Video](https://www.bilibili.com/video/BV1sk4y1S7pv/)

<br>

The empirical robustness result motivated a stricter question: can we obtain a useful certified guarantee? The key was to bypass otherwise intractable components of the diffusion classifier.

#### Diffusion Models are Certifiably Robust Classifiers
**Huanran Chen**, Yinpeng Dong, Shitong Shao, Zhongkai Hao, Xiao Yang, Hang Su, Jun Zhu  

- Derived two Evidence Lower Bounds (ELBOs) for log-likelihood on noisy data to construct new noised diffusion classifiers (enabling point-wise Lipschitz bounds).
- Obtained the analytical form of the gradient for diffusion classifiers, elegantly bypassing the intractable UNet Jacobian.
- Established three Lipschitzness and robustness lower bounds, providing rigorous point-wise certification.
- Achieved state-of-the-art certified robustness (e.g., 70.7% for an $\ell_2$ radius of 0.5), closing the gap to merely 20% from the empirical upper bound.

- [NeurIPS 2024](https://arxiv.org/abs/2402.02316) · [Blog 1](https://zhuanlan.zhihu.com/p/12592746504) · [Blog 2](https://zhuanlan.zhihu.com/p/690230490) · [Video](https://www.bilibili.com/video/BV1WhV2zRE2m/)

<br>

Later, I realized this theoretical framework wasn't limited to continuous image spaces or Gaussian noise. We could generalize the robustness guarantee to **any discrete noise distribution** in Large Language Models by reducing the randomized smoothing process to a classical knapsack problem.

#### Towards the Worst-case Robustness of Large Language Models
**Huanran Chen**, Zeming Wei, Yinpeng Dong, Hang Su, Jun Zhu.

- **Rigorous White-Box Evaluation:** Conducted white-box evaluations that strictly align tokens during optimization and inference. Existing LLM defenses, including adversarial training (AT), drop to 0% robustness under this evaluation.
- **The Knapsack Reduction:** To provide a lower bound on worst-case robustness, I focused on randomized smoothing. I reduced the calculation of certified robustness under *any* smoothing distribution to a fractal or 0-1 knapsack problem, providing a universal solver.
- **Kernel Superiority:** Theoretically proved that the uniform kernel (analogous to diffusion) strictly dominates the absorbing kernel (masked generation) in terms of robustness at the same accuracy level. Proved it is the best data-independent kernel without knowing data priors.
- **Mapping the Ceiling:** Derived a Bayesian error upper bound for the uniform kernel, mapping the theoretical ceiling of robust guarantees.
- **Symmetric Lemma:** Introduced a symmetric lemma to analyze the trading graph, enabling elegant proofs for properties like the relationship between certified robustness and vocabulary size.
- **Results:** Achieved a certified radius of 2.00 in $\ell_2$ (against a Bayesian upper bound of 2.10) and 6.57 in the suffix setting (where empirical research typically focuses on a suffix length of 20).

- [SafeGenAI @ NeurIPS 2024](https://arxiv.org/abs/2501.19040) · [Blog](https://zhuanlan.zhihu.com/p/21266930786) · [Video](https://www.bilibili.com/video/BV1WhV2zRE2m/)

</details>



<span class='anchor' id='experience'></span>

## Academic Experience

- *2025–present*, PhD student at Tsinghua SAIL, advised by Prof. Jun Zhu
- *2025–present*, Top Seed Intern at ByteDance


<span class='anchor' id='projects'></span>

## Projects

I care about modular, readable, plug-and-play research code. My libraries include implementations of diffusion models such as EDM, DDIM, SDE, and DDPM; adversarial attacks such as SSA, CWA, and VMI; and defenses including adversarial training and DiffPure.

- [Awesome Physics of AI paper list](https://huanranchen.github.io/awesome-physics-of-ai/)
- [Nexus pretraining package](https://github.com/huanranchen/NexusPretraining)
- [Adversarial Attacks package](https://github.com/huanranchen/AdversarialAttacks)
- [Attacks on GPT-4 and Bard](https://github.com/thu-ml/Attack-Bard)
- [Adversarial Attacks on Object Detection](https://github.com/VDIGPKU/T-SEA)
- [Landscape Visualization](https://github.com/huanranchen/Visualize-Loss-Landscape)
- [LLM Landscape](https://github.com/huanranchen/LLMLandscape)


<span class='anchor' id='academic-service'></span>

## Academic Service

- Co-organizer: [FAI Seminar](https://www.fai-seminar.ac.cn/)
- Co-organizer: [X-AGI](https://www.x-agi.cc/)
- Journal Reviewer: T-PAMI, TMLR
- Conference Reviewer: ICML/ICLR/NeurIPS, AISTATS, CVPR/ECCV/ICCV


## People

People whose work has shaped mine:

- Advisors and collaborators: [Jun Zhu](https://ml.cs.tsinghua.edu.cn/~jun/index.shtml), [Yinpeng Dong](https://ml.cs.tsinghua.edu.cn/~yinpeng/), [Jingzhao Zhang](https://iiis.tsinghua.edu.cn/en/People/Faculty/ZhangJingzhao.htm), [Hang Su](https://www.suhangss.me/)
- Role models: [Kaiyue Wen](https://whenwen.github.io/), [Jingfeng Wu](https://uuujf.github.io/)

I have learned a great deal from the questions they choose, the mechanisms they uncover, and the clarity of their work.


<span class='anchor' id='personality'></span>
<span class='anchor' id='beyond-research'></span>

## Beyond Research

I'm an INTP 7w6, broadly curious about the world, the universe, and especially the science behind neural networks.

My second major interest is hiking. Physical landscapes often give me useful metaphors for optimizer trajectories and loss landscapes, but I mainly value the freedom of the outdoors and the people I meet there. I founded the THU CollegeAI Hiker community, where we organize weekly trips. If you'd like to join a hike or talk, feel free to add my WeChat: `ScientificML`.

When I'm not doing research or hiking, I read history—especially periods of rapid transformation such as the 魏晋南北朝, 五胡十六国, and 五代十国. My historical idol is 宇文泰; I admire his rationality, resilience, and strategic judgment under uncertainty.

In my daily life, I am not a materially driven person; different levels of material comfort feel largely the same to me. A simple lifestyle brings me the most peace and leaves more mental bandwidth for the things I truly care about. As proof, my favorite food is simply McDonald’s/KFC! That said, I am always open-minded and more than happy to experience new things and share new adventures with friends.


<span class='anchor' id='contact'></span>

## Contact

Good ideas improve through open discussion and disagreement. I’m especially happy to discuss mechanisms, surprising phenomena, and experiments that distinguish between competing explanations.

If you have questions about my research or a related idea, please email me:

- Preferred: [huanran.chen@outlook.com](mailto:huanran.chen@outlook.com)
- Academic: [chenhr25@mails.tsinghua.edu.cn](mailto:chenhr25@mails.tsinghua.edu.cn)
