# Comparing machines with different CPU speeds was hard

On 18.11.2026 Danyal reported struggling with Barlas 1.6: machines X (4 CPUs, 1 h each) and Y (16 CPUs, 2 h each), 5% non-parallelizable. The likely obstacle is that the two machines' speedups have different baselines, so the question needs t_par = T · ((1 − α) + α / N) per machine and a comparison of times.

**Evidence**: self-reported after lesson 0002. The worked solution was given in chat, and lesson 0003 opens with a variant (X: 2 CPUs at 1 h, Y: 8 CPUs at 3 h, α = 0.9).

**Implications**: check the lesson 0003 warm-up result before calling this learned. The ants-versus-elephants formula (slides 1-31, 1-32) is the same idea in ratio form and may need the same treatment.
