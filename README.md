# Zeladoria do Bairro

Nosso grande projeto para a Citizen Tech, que conta com a comunicação comunitária e atividades de zeladoria do bairro.

A plataforma aproxima moradores e equipes de zeladoria urbana para facilitar e dar visibilidade para o cuidado com os espaços públicos do bairro. Isso é feito por meio do registro dos problemas, que recebe priorização colaborativa, e de funcionalidades como a divulgação de mutirões, eventos, notícias e entregas concluídas, alinhadas ao **ODS 11 (Cidades e Comunidades Sustentáveis)** da ONU.

Veja o Pitch do projeto [aqui](https://www.youtube.com/watch?v=BtRrcn15p_8).

---

## Principais Funcionalidades

- **Portal Institucional**:
  - Apresentação do problema urbano com dados reais do IBGE, funcionamento do MVP, alinhamento com as metas da Agenda 2030 e equipe do projeto.
- **Visão do Morador**
  - Registro de ocorrências em 4 etapas com sugestão automática de chamados parecidos para evitar duplicatas.
  - Acompanhamento da linha do tempo de atendimento e apoio a demandas de vizinhos.
  - Mural de iniciativas do bairro, blog comunitário para sugestões de melhoria, agenda de eventos com confirmação de presença e leitura em foco de comunicados com anexos.
- **Visão do Zelador**:
  - Painel com indicadores de atendimento e fila priorizada por urgência e número de apoios.
  - Quadro Kanban de demandas;
  - Publicação de notícias/comunicados oficiais e criação de eventos comunitários.

---

## Tecnologias e Estrutura

- **Front-end**: React, React Router e Styled Components (com HTML5 semântico e layout responsivo).
- **Modelagem e Dados**: Classes de domínio baseadas na modelagem UML do projeto, banco de dados simulado em memória (`db.js`) e camada de _Services_ que resolve e hidrata automaticamente os relacionamentos entre bairros, localizações, usuários, ocorrências, eventos, iniciativas, posts e comunicados.

### Uso de IA Generativa

Tivemos o apoio da IA Generativa para pesquisa, geração nas propostas de design da UI e código utilitário. Além disso, também tivemos o apoio da IA para geração de dados mockados e do uso deles. **Todo código minimamente proveniente de IA Generativa foi cuidadosamente revisado e compreendido**.

Toda a modelagem de classes, casos de uso e definição de requisitos foi feita **sem** o uso de IA.

---

## Como Executar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Além disso, caso queira alterar a porta do servidor, copie o `.env.sample` para `.env` e coloque a porta da sua escolha na variável `SERVER_PORT`.

---

## Equipe

- **Pedro Anuda** — Full Stack, Arquitetura & Modelagem
- **Brunna Saraiva** — Pesquisa & Requisitos
- **Ana Carolina** — Front-end & UX/UI
- **Lucas Peixoto** — Apresentação & Pitch
- **Thiago Neves** — Front-end & Revisão
