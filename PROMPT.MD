## PROMPT Ultilizado:

```
Gemini, acesse o artigo do link ([Artigo Alura](https://www.alura.com.br/artigos/escrever-bom-readme?srsltid=AfmBOop0-cX_sU9cOf4DhyFv-x2L098ujiDgMo5N3pyyDvHuqn0f89UH)), baseado nas informações e métricas do artigo e atuando como um Desenvolvedor Fullstack Sênior, crie um README.md profissional para o projeto."
```
---

## Tipo de Prompt:

### O prompt se baseou em três técnicas para a gerações de prompts de IA:
1.  **Zero-Shot Prompting**
        É a técnica principal, pois o modelo recebe apenas a descrição da tarefa sem nenhum exemplo de como o resultado final deveria ser. O prompt não fornece um exemplo de um README pronto para ser seguido.

2.  **Directional Stimulus (Estímulo Direcional)**
        A técnica é utilizada para guiar a resposta do modelo através de comandos e estímulos diretos. Isso é visível em partes como:
        
        * `"atuando como um Desenvolvedor Fullstack Sênior"`: Define um papel específico para a IA, o que é um exemplo de estímulo condicional para focar a resposta.
        
        * `"crie um README.md"`: Indica claramente a ação e o formato esperado para a saída, ajudando a padronizar a resposta.

3.  **ReAct (Reasoning + Action)**
        Embora não siga a estrutura rígida de "Thought, Action, Observation" descrita nos exemplos do material, o prompt se baseia no princípio fundamental do ReAct. Ele exige que o modelo combine o raciocínio com a execução de uma **ação externa** — neste caso, acessar o link para obter informações — antes de poder gerar a resposta final.