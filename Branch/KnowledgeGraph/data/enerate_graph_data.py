import json
import random

# 辅助函数，随机生成节点的标签
def get_random_label():
    labels = ['Gene', 'Protein', 'Metabolite']
    return random.choice(labels)

# 辅助函数，随机生成边的类型
def get_random_type():
    types = ['REGULATES', 'INTERACTS_WITH', 'INFLUENCES']
    return random.choice(types)

# 生成节点
num_nodes = 100
nodes = []
for i in range(num_nodes):
    nodes.append({
        "id": i,
        "name": f"Node{i}",
        "label": get_random_label()
    })

# 生成边
num_links = 300
links = []
for i in range(num_links):
    source = random.randint(0, num_nodes - 1)
    target = random.randint(0, num_nodes - 1)
    while source == target:
        target = random.randint(0, num_nodes - 1)
    links.append({
        "source": source,
        "target": target,
        "type": get_random_type()
    })

# 将节点和边的数据合并到 graphData 对象中
graph_data = {
    "nodes": nodes,
    "links": links
}

# 将 graphData 对象转换为 JSON 字符串并写入文件
with open(r'C:\Users\14849\Desktop\T2DMKG\data\graphData.100-300.json', 'w') as json_file:
    json.dump(graph_data, json_file, indent=2)

print("graphData.json 文件已成功生成")