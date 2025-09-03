# Markdown Torture Test 😈

## 1. Text Formatting

- _Italic_
- **Bold**
- ~~Strikethrough~~
- `Inline code`

> Blockquote example with **bold** and _italic_ inside.

---

## 2. Lists

### Unordered

- Item A
  - Nested A.1
  - Nested A.2
- Item B

### Ordered

1. Step 1
2. Step 2
   1. Sub-step 2.1
   2. Sub-step 2.2
3. Step 3

---

## 3. Code Blocks

```js
function hello(name) {
  console.log(`Hello, ${name}!`);
}
hello('Markdown');
```

```python
def factorial(n):
    return 1 if n <= 1 else n * factorial(n-1)
```

---

## 4. Tables

| Feature       | Supported? | Notes                        |
| ------------- | ---------- | ---------------------------- |
| **Bold text** | ✅ Yes     | Works inside tables          |
| _Italic text_ | ✅ Yes     | Markdown in tables supported |
| Inline `code` | ✅ Yes     | Useful for configs           |
| Images        | ⚠️ Partial | Depends on renderer          |

## 5. Images

Inline:  
![Sample Image](https://picsum.photos/300/150 'Random Image')

With HTML (style control):  
<img src="https://picsum.photos/200/100" style="border-radius:8px; margin:10px 0;" />

---

## 6. Links

- [GitHub](https://github.com)
- [OpenAI](https://openai.com)

---

## 7. Math 🎓

Inline math: $E = mc^2$

Escaped inline math (AI-style export): **\$ \alpha + \beta = \gamma \$**

Block math:

$$
\int_{0}^{\infty} e^{-x^2} \, dx = \frac{\sqrt{\pi}}{2}
$$

Matrix example:

$$
A = \begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6
\end{bmatrix}
$$

Optimization problem:

$$
\min_{X} \| X \|_* \quad \text{s.t. } X_{ij} = R_{ij}, \, (i,j) \in \Omega
$$

---

## 8. Mixed Content

> **Task**: Implement $\phi(x)$ and test inside Markdown

### Mermaid — Flowchart

```mermaid
flowchart TD
  A[Start] --> B{Is it working?}
  B -- Yes --> C[Ship it 🚀]
  B -- No --> D[Check console]
  D --> E{Error?}
  E -- Yes --> F[Fix bug]
  E -- No --> G[Add logs]
  F --> B
  G --> B
```

### Mermaid — Sequence Diagram

```mermaid
sequenceDiagram
  participant U as User
  participant W as Web App
  participant S as Server
  U->>W: Click "Save"
  W->>S: POST /save
  S-->>W: 200 OK (JSON)
  W-->>U: Show toast "Saved!"
```

### Mermaid — State Diagram

```mermaid
stateDiagram-v2
  [*] --> Idle
  Idle --> Loading : fetch()
  Loading --> Error : fail
  Loading --> Ready : success
  Error --> Idle : retry
  Ready --> [*]
```

### Mermaid — Class Diagram

```mermaid
classDiagram
  class User {
    +id: string
    +name: string
    +login()
  }
  class Session {
    +token: string
    +expiresAt: Date
  }
  User "1" --> "0..*" Session : has
```

### Mermaid — ER Diagram

```mermaid
erDiagram
  USER ||--o{ ORDER : places
  ORDER ||--|{ ORDER_ITEM : contains
  PRODUCT ||--o{ ORDER_ITEM : referenced
  USER {
    string id PK
    string email
  }
  PRODUCT {
    string id PK
    string name
    number price
  }
```

### Mermaid — Gantt

```mermaid
gantt
  title Sprint Plan
  dateFormat  YYYY-MM-DD
  section Core
  Spec          :done,    des1, 2025-09-01, 2025-09-03
  Build         :active,  des2, 2025-09-04, 3d
  Test          :         des3, after des2, 2d
```

### Mermaid — Pie

```mermaid
pie title "Orders"
  "Shirts" : 40
  "Shoes" : 35
  "Hats" : 25
```

---

## Graphviz / DOT

### DOT — Directed graph with clusters

```dot
digraph G {
  rankdir=LR;
  node [shape=rectangle, style=rounded];

  subgraph cluster_api {
    label="API";
    color="#999999";
    A1 [label="Gateway"];
    A2 [label="Auth"];
  }

  subgraph cluster_svc {
    label="Services";
    color="#999999";
    S1 [label="Users"];
    S2 [label="Orders"];
    S3 [label="Inventory"];
  }

  A1 -> A2;
  A1 -> S1;
  A1 -> S2;
  A1 -> S3;
  S2 -> S3 [label="reserve()"];
}
```

### DOT — Undirected graph

```dot
graph Net {
  layout=neato;
  node [shape=circle];
  A -- B -- C -- D -- A;
  A -- C;
  B -- D;
}

```

### DOT — Records / Struct-like nodes

```dot
digraph Records {
  node [shape=record, fontname="Courier"];
  Obj1 [label="{ <f0> head | <f1> body | <f2> tail }"];
  Obj2 [label="{ <g0> left | <g1> right }"];
  Obj1:f1 -> Obj2:g0;
}
```

### DOT — Edge styles & attributes

```dot
digraph Styles {
  rankdir=TB;
  node [shape=ellipse];

  A -> B [label="success", color="green", penwidth=2];
  A -> C [label="fail", color="red", style="dashed"];
  B -> D [label="next", arrowhead="vee"];
  C -> D [label="retry", arrowhead="dot"];
}
```
