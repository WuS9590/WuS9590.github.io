import json
import random
from faker import Faker  # 用于生成模拟但合理的属性（需先安装：pip install faker）

# 初始化伪数据生成器
fake = Faker()

# --------------------------
# 1. 生成节点（共1000个）
# --------------------------
nodes = []

# 1.1 蛋白质节点（250个）
protein_functions = [
    "肿瘤抑制因子，调控细胞周期",
    "受体酪氨酸激酶，激活下游信号",
    "GTP酶，参与RAS通路",
    "转录因子，调控基因表达",
    "激酶，催化蛋白质磷酸化",
    "磷酸酶，参与信号去磷酸化",
    "细胞凋亡调控蛋白",
    "DNA修复相关蛋白"
]
protein_locations = ["细胞核", "细胞膜", "细胞质", "线粒体", "内质网"]

for i in range(1, 15):
    node = {
        "id": f"P{i:03d}",  # 格式：P001-P250
        "name": f"Protein_{i}",
        "label": "Protein",
        "properties": {
            "function": random.choice(protein_functions),
            "location": random.choice(protein_locations),
            "molecular_weight": f"{random.randint(15, 200)} kDa",  # 分子量15-200kDa
            "expression_tissue": fake.word(ext_word_list=["肺", "肝", "乳腺", "脑", "血液", "肠道"])
        }
    }
    nodes.append(node)

# 1.2 基因节点（250个，与蛋白质对应）
chromosomes = [f"{i}{arm}" for i in range(1, 23) for arm in ["p", "q"]] + ["Xp", "Xq", "Yp", "Yq"]
gene_diseases = ["肺癌", "肝癌", "乳腺癌", "结直肠癌", "白血病", "无明确关联"]

for i in range(1, 15):
    node = {
        "id": f"G{i:03d}",  # 格式：G001-G250
        "name": f"Gene_{i}",
        "label": "Gene",
        "properties": {
            "chromosome": random.choice(chromosomes),
            "exon_count": random.randint(1, 20),  # 外显子数量1-20
            "expression_pattern": random.choice(["组成型", "组织特异性", "应激诱导", "发育阶段特异性"]),
            "associated_disease": random.choice(gene_diseases)
        }
    }
    nodes.append(node)

# 1.3 甲基化位点节点（250个）
methyl_regions = ["启动子", "基因体", "增强子", "3'UTR", "5'UTR"]
methyl_platforms = ["Illumina 450K", "Illumina EPIC", "WGBS", "RRBS"]

for i in range(1, 15):
    node = {
        "id": f"M{i:03d}",  # 格式：M001-M250
        "name": f"cg{random.randint(10000000, 99999999)}",  # 模拟真实探针ID（cg开头）
        "label": "Methylation",
        "properties": {
            "chromosome": random.choice(chromosomes),
            "genomic_region": random.choice(methyl_regions),
            "methylation_effect": random.choice(["高甲基化抑制基因表达", "低甲基化激活基因表达", "与表达无显著关联"]),
            "detection_platform": random.choice(methyl_platforms)
        }
    }
    nodes.append(node)

# 1.4 代谢物节点（250个）
metabolites = [
    "Glucose", "ATP", "Lactate", "Pyruvate", "Glutamate", "GABA", "Cholesterol",
    "Triglyceride", "Alanine", "Aspartate", "Serine", "Glycine"
]
metabolite_pathways = ["糖酵解", "三羧酸循环", "氧化磷酸化", "氨基酸代谢", "脂质代谢", "核苷酸代谢"]

for i in range(1, 15):
    node = {
        "id": f"C{i:03d}",  # 格式：C001-C250
        "name": random.choice(metabolites) if i % 5 != 0 else f"Metabolite_{i}",  # 部分用真实名称
        "label": "Metabolite",
        "properties": {
            "hmdb_id": f"HMDB{random.randint(10000, 99999)}",  # 模拟HMDB数据库ID
            "formula": fake.word(ext_word_list=["C6H12O6", "C3H6O3", "C10H16N5O13P3", "C4H9NO2", "C27H46O"]),
            "pathway": random.choice(metabolite_pathways),
            "cellular_role": random.choice(["能量载体", "信号分子", "结构成分", "代谢中间产物"])
        }
    }
    nodes.append(node)

# --------------------------
# 2. 生成边（共3500条）
# --------------------------
links = []

# 2.1 基因-蛋白质（编码关系，1000条）
# 规则：大部分基因编码1个蛋白，部分基因编码2-3个（覆盖1000条）
encode_count = 0
for gene_id in [f"G{i:03d}" for i in range(1, 15)]:
    # 每个基因至少编码1个蛋白，随机增加额外编码关系
    proteins = [f"P{i:03d}" for i in range(1, 15)]
    target_proteins = random.sample(proteins, k=random.randint(1, 4))  # 1-4个蛋白
    for protein_id in target_proteins:
        link = {
            "source": gene_id,
            "target": protein_id,
            "type": "encodes",
            "properties": {
                "confidence": round(random.uniform(0.9, 1.0), 2),
                "evidence": "NCBI Gene/Ensembl",
                "transcript_id": f"NM_{random.randint(100000, 999999)}.{random.randint(1, 10)}"
            }
        }
        links.append(link)
        encode_count += 1
        if encode_count >= 100:
            break
    if encode_count >= 100:
        break

# 2.2 甲基化-基因（调控关系，1000条）
# 规则：甲基化位点调控随机基因（优先同染色体）
methyl_genes = [f"G{i:03d}" for i in range(1, 15)]
for methyl_id in [f"M{i:03d}" for i in range(1, 15)]:
    # 每个甲基化位点调控3-4个基因（覆盖1000条）
    targets = random.sample(methyl_genes, k=random.randint(3, 4))
    for gene_id in targets:
        edge_type = random.choice(["downregulates", "upregulates"])
        correlation_coefficient = round(random.uniform(-0.8, -0.3) if "down" in edge_type else random.uniform(0.3, 0.8), 2)
        link = {
            "source": methyl_id,
            "target": gene_id,
            "type": edge_type,
            "properties": {
                "confidence": round(random.uniform(0.7, 0.95), 2),
                "evidence": random.choice(["甲基化芯片", "WGBS", "RRBS", "发表文献"]),
                "correlation_coefficient": correlation_coefficient
            }
        }
        links.append(link)
    if len(links) >= 200:  # 1000（编码）+1000（调控）
        break

# 2.3 蛋白质-蛋白质（相互作用，1000条）
# 规则：随机蛋白对，模拟结合/激活/磷酸化等关系
proteins = [f"P{i:03d}" for i in range(1, 15)]
interaction_types = ["binds_to", "activates", "inhibits", "phosphorylates", "ubiquitinates"]
while len(links) < 300:  # 前2000+1000=3000
    p1, p2 = random.sample(proteins, k=2)
    link = {
        "source": p1,
        "target": p2,
        "type": random.choice(interaction_types),
        "properties": {
            "confidence": round(random.uniform(0.75, 0.95), 2),
            "evidence": random.choice(["Co-IP", "质谱", "STRING数据库", "酵母双杂交"]),
            "interaction_type": random.choice(["物理相互作用", "功能调控", "翻译后修饰"])
        }
    }
    links.append(link)

# 2.4 蛋白质-代谢物（催化/转运，500条）
# 规则：蛋白质与代谢物关联（酶催化、转运等）
metabolites = [f"C{i:03d}" for i in range(1, 15)]
metab_types = ["catalyzes", "transports", "produces", "consumes", "binds"]
while len(links) < 350:  # 3000+500=3500
    p = random.choice(proteins)
    m = random.choice(metabolites)
    link = {
        "source": p,
        "target": m,
        "type": random.choice(metab_types),
        "properties": {
            "confidence": round(random.uniform(0.8, 0.98), 2),
            "evidence": random.choice(["KEGG通路", "酶数据库", "代谢组学实验"]),
            "reaction": fake.sentence(nb_words=5).replace(".", "")  # 模拟反应描述
        }
    }
    links.append(link)

# --------------------------
# 3. 保存为JSON文件
# --------------------------
graph_data = {
    "nodes": nodes,
    "links": links
}

with open("biomedical_knowledge_graph.json", "w", encoding="utf-8") as f:
    json.dump(graph_data, f, ensure_ascii=False, indent=2)

print(f"生成完成！节点数：{len(nodes)}，边数：{len(links)}，文件已保存为 biomedical_knowledge_graph.json")