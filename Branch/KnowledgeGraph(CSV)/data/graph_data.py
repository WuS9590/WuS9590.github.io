import csv
import random

# 节点池
nodes = [
    "Gene_EGFR", "Gene_ALK", "Gene_BRAF", "Gene_KRAS", "Gene_P53",
    "Protein_EGFR", "Protein_ALK", "Protein_BRAF", "Protein_KRAS", "Protein_P53",
    "Disease_LungCancer", "Disease_ColorectalCancer", "Disease_Melanoma",
    "Drug_Osimertinib", "Drug_Crizotinib", "Drug_Vemurafenib"
]

# 关系类型
relations = [
    "encodes", "mutates_in", "targets", "interacts_with", "regulates", "treats"
]

# 证据来源
evidences = [
    "NCBI Gene", "STRING Database", "Clinical Trial", "Published Paper", "KEGG Pathway"
]

# 关系到颜色的映射（新增）
relation_color_map = {
    "encodes": "#FF5733",  # 橙色
    "mutates_in": "#33FF57",  # 绿色
    "targets": "#5733FF",  # 蓝色
    "interacts_with": "#FF33E7",  # 紫色
    "regulates": "#33E7FF",  # 青色
    "treats": "#E7FF33"  # 黄色
}


def generate_graph_csv(file_path, row_count=50):
    with open(file_path, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        # 表头增加color列（新增）
        writer.writerow(["nodes_a", "nodes_b", "relation", "evidence", "color"])

        for _ in range(row_count):
            node_a = random.choice(nodes)
            node_b = random.choice(nodes)
            while node_a == node_b:
                node_b = random.choice(nodes)

            relation = random.choice(relations)
            evidence = random.choice(evidences)

            # 根据关系类型分配颜色（新增）
            color = relation_color_map.get(relation, "#999999")  # 默认灰色

            writer.writerow([node_a, node_b, relation, evidence, color])


if __name__ == "__main__":
    generate_graph_csv("graph_data.csv", row_count=50)
    print("CSV数据生成完成！文件：graph_data.csv")