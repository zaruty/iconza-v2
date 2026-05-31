# ICONZA — Arquitetura Autogerenciável
## Documento de Visão Estratégica ("A Bíblia do Projeto")
**Data:** 30 de Maio de 2026  
**Versão:** 1.0  
**Autora:** Lívia Zaruty  

---

## FINALIDADE

Desacoplar o **Design (Visual)** do **Código (Estrutura)**.

Permitir que Lívia gerencie a identidade visual e o conteúdo via **Painel ADM** sem necessidade de intervenção directa no código.

> "Lívia edita. O Cursor executa. O site actualiza."

---

## AS 4 FASES

### FASE 1 — Mapeamento (Auditoria)
Identificar todas as variáveis que hoje estão "hardcoded" no código:
- Tamanhos de ícones e fontes
- Cores e paletas
- Textos e títulos
- Fotos e imagens
- Dados dos stats
- Conteúdo da agenda

**Regra:** Não alterar nada. Apenas listar.

---

### FASE 2 — Abstração (O "Cérebro")
Criar a base de dados que guarda todas as preferências visuais e de conteúdo.

**Onde guardar:**
- **Supabase** — textos, títulos, cores, configurações visuais
- **Supabase Storage** — fotos e imagens
- **AWS** — dados transaccionais (stats, actividade)

**Exemplo do que o Cérebro guarda:**
```
design_settings:
  - font_size_title: "28px"
  - color_accent: "#7A5CCF"
  - color_background: "#EDEDF2"
  
content_settings:
  - greeting_text: "Sua jornada, Liza ✦"
  - stat_1_label: "Dias de Foco"
  - stat_1_value: "7"
  
media_settings:
  - hero_image_url: "..."
  - event_1_photo_url: "..."
```

---

### FASE 3 — Conexão
Substituir os valores fixos no código por "chamadas" ao Cérebro.

**Antes (hardcoded):**
```tsx
<h1 style={{ fontSize: "28px", color: "#7A5CCF" }}>
  Sua jornada, Liza ✦
</h1>
```

**Depois (dinâmico):**
```tsx
<h1 style={{ fontSize: settings.font_size_title, color: settings.color_accent }}>
  {content.greeting_text}
</h1>
```

---

### FASE 4 — Interface ADM
Construir os controlos no Painel ADM para Lívia editar sem tocar no código.

**O que Lívia consegue editar:**
- ✏️ Textos e títulos de qualquer secção
- 🖼️ Fotos (eventos, produtos, perfil)
- 🎨 Cores e tamanhos de fonte
- 📊 Stats e métricas
- 📅 Agenda e eventos
- 🛍️ Produtos afiliados

---

## FLUXO DE TRABALHO SEGURO

```
1. AUDITORIA
   Cursor lista todos os hardcodes
   → Nada é alterado

2. PROPOSTA
   Cursor apresenta como transformar
   cada valor fixo em dinâmico
   → Lívia avalia

3. APROVAÇÃO
   Lívia aprova ou ajusta a proposta
   → Só então o Cursor implementa

4. IMPLEMENTAÇÃO ISOLADA
   Cursor altera apenas aquele trecho
   → Nada mais é tocado

5. VALIDAÇÃO
   Testamos apenas essa funcionalidade
   → Só depois passamos para a próxima
```

---

## PRÓXIMO PASSO IMEDIATO

Enviar este prompt ao Cursor Agent:

```
Cursor, quero criar um mapa estratégico de trabalho.
Faz uma auditoria do código actual do dashboard
(app/(app)/dashboard/page.tsx) e lista:

1. Quais são as variáveis de design que hoje estão 
   fixas no código? (tamanhos de ícones, cores, 
   fontes, textos, imagens)

2. Qual é a estrutura da página ADM actual?
   (O que está lá e o que ainda não tem função)

Não alteres nada. Apenas lista para que possamos 
montar um documento de visão antes de qualquer 
implementação.
```

---

---

## 🧬 ARQUITECTURA MULTI-AGENTE (ICONZA)

**A ICONZAZA é o Orquestrador:** A base do sistema é a ICONZAZA, que se adapta visual e comportamentalmente a cada um dos 5 universos (ICONLOVE, ICONMIND, ICONETNIA, ICONFOOD, ICONART).

**Agentes Especializados:** Cada universo é um agente de IA independente com personalidade, linguagem e missão próprias.

**Gestão Dinâmica:** O Painel ADM deve permitir a configuração individual de cada agente (avatar, cores, directrizes de comportamento) sem alterar o core do sistema.

**Regra de Design:** Qualquer nova tabela ou página criada deve conter um campo `agent_id` ou `universe_id` para garantir que o conteúdo seja servido pelo agente correspondente.

---

## ESTRUTURA ADM PLANEADA

### Secções do Painel ADM

| Secção | O que edita |
|---|---|
| 🎨 **Identidade Visual** | Cores, fontes, border-radius |
| ✏️ **Conteúdo** | Textos, títulos, subtítulos |
| 🖼️ **Media** | Fotos, imagens, thumbnails |
| 📊 **Métricas** | Stats do topo (valores e labels) |
| 📅 **Agenda** | Eventos, mentorias, datas |
| 🛍️ **Produtos** | Afiliados Mercado Livre |
| 🎬 **CheckList** | Vídeos tutoriais |
| 🪐 **Universos** | Progresso, descrições |

---

## REGRAS DO PROJECTO

1. **Lívia não usa comandos** — o Cursor Agent faz tudo
2. **Auditoria antes da implementação** — nunca mudar sem mapear
3. **Uma coisa de cada vez** — implementação isolada
4. **Validar antes de avançar** — testar cada funcionalidade
5. **Backup sempre** — antes de qualquer alteração
6. **TypeScript limpo** — sem JSX em objectos de dados
7. **Dados separados do JSX** — padrão `dashboardmetrics.tsx`

---

## ESTADO ACTUAL

| Item | Estado |
|---|---|
| Dashboard live | ✅ |
| Stats minimalistas | ✅ Live |
| Protótipo completo | ✅ Claude |
| Sidebar colapsável | ✅ Protótipo |
| CheckList vídeos | ✅ Protótipo |
| Agenda inteligente | ✅ Protótipo |
| CMS / ADM | 🔴 Por fazer |
| TypeScript limpo | 🟡 Parcial |
| Dados reais Supabase | 🔴 Por fazer |

---

*Documento gerado por Claude + Lívia Zaruty — 30 Mai 2026*  
*Usar como referência para o Cursor Agent em todas as sessões futuras*

---

## 9. CREDENCIAIS E ROLES DO PROJECTO

| Função | E-mail | Role |
|---|---|---|
| Conta Supabase (painel técnico) | afroiazaruty@gmail.com | — |
| ADM do site (tabela profiles) | apoiozaruty@gmail.com | `admin` |
| Fundadora | lizarutyon@gmail.com | `founder` |

### Função is_cms_editor()
Aceita roles: `admin`, `editor`, `founder`

### Infraestrutura
- **Supabase:** `rwnedxbhlnvmqjsdzwyo`
- **Repositório:** `zaruty/iconza-v2`
- **Site:** `iconza-v2.vercel.app`

### SQL para configurar roles (executar no Supabase SQL Editor)
```sql
-- Função de verificação de permissões
CREATE OR REPLACE FUNCTION is_cms_editor()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'editor', 'founder')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Role admin para ADM do site
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'apoiozaruty@gmail.com';

-- Role founder para Lívia
UPDATE profiles 
SET role = 'founder' 
WHERE email = 'lizarutyon@gmail.com';

-- Bucket de media
INSERT INTO storage.buckets (id, name, public)
VALUES ('media-library', 'media-library', true)
ON CONFLICT (id) DO NOTHING;
```

---
*Actualizado em 31 Mai 2026*

---

## 10. ICONZAZA — O Agente Central da Plataforma

### Conceito
A ICONZAZA é o mascote único da plataforma ICONZA.
Para o utilizador parece um avatar animado simpático.
Na realidade é um **agente de IA** — inspirado no Duolingo (Olingo transformado em 5 universos).

```
Utilizador vê:    Avatar animado da ICONZAZA
Na realidade:     Agente IA com missão específica por universo
```

### Um nome, 5 transformações
- O utilizador memoriza sempre o nome **ICONZAZA**
- Ela transforma-se visualmente em cada universo (cor, roupa, planeta, energia)
- Mantém sempre a mesma essência: sábia, observadora, acolhedora, firme, transformadora
- Aparece nas aulas como tutora/mentora (estilo Duolingo)
- É o anfitrião do painel principal (universo escolhido no onboarding)

### Missão oculta de todos os agentes
Todos os agentes são condicionados a entender:
> "O utilizador não tem consciência de que precisa de TODOS os universos para ser uma pessoa completa."

O trabalho de cada agente é guiar suavemente o utilizador a descobrir os outros universos.

---

## 11. OS 5 UNIVERSOS — Agentes Especializados

Cada universo é um agente IA com:
- Personalidade própria
- Linguagem própria
- Função específica
- Missão de conectar ao resto

### O Conselho dos Universos
Quando o utilizador faz uma pergunta complexa, todos os agentes respondem em conjunto e a plataforma sintetiza uma resposta unificada.

**Exemplo:** "Quero abrir um restaurante africano"
```
ICONFOOD   → gastronomia ancestral
ICONART    → identidade visual da marca  
ICONMIND   → gestão e mentalidade
ICONLOVE   → atendimento humano
ICONETNIA  → identidade cultural
           ↓
    Resposta conjunta sintetizada
```

### Stack técnica dos agentes
- **Gemini** multi-agente (compatível com arquitectura actual)
- Cada universo = agente com personalidade e missão própria
- Todos partilham contexto do utilizador
- Orquestrador distribui e sintetiza respostas

---

## 12. FICHAS DOS UNIVERSOS

### ❤️ ICONLOVE — Mentora da Consciência Afetiva
**Posicionamento:** Não é o planeta do amor. É o planeta da consciência emocional.
**Missão:** Transformar vínculos emocionais em relações conscientes.
**Cor:** #D4688A | **BG:** #3D0A20
**O que ensina:**
- Parar de idealizar pessoas
- Reconhecer manipulação emocional
- Criar limites saudáveis
- Desenvolver autoestima
- Compreender vínculos familiares
- Melhorar amizades
- Construir relacionamentos maduros
- Sair da dependência emocional

**Essência:** Sábia · Observadora · Acolhedora · Inteligente · Firme · Transformadora

---

### 🧠 ICONMIND — *[ficha a completar com Lívia]*
**Cor:** #6B8FC7 | **BG:** #1A2E5C

### 🌍 ICONETNIA — *[ficha a completar com Lívia]*
**Cor:** #52B87A | **BG:** #0A2A14

### 🍽️ ICONFOOD — *[ficha a completar com Lívia]*
**Cor:** #FF7A2E | **BG:** #421800

### 🎨 ICONART — *[ficha a completar com Lívia]*
**Cor:** #7A5CCF | **BG:** #2A0F5C

---

## 13. PÁGINA UNIVERSOS — "O Conselho dos Universos"

### Estrutura da página
```
Título: O Conselho dos Universos
Subtítulo: Cinco especialistas. Uma jornada completa.

[ICONZAZA MIND] [ICONZAZA ETNIA] [ICONZAZA FOOD] 
[ICONZAZA LOVE] [ICONZAZA ART]

→ Utilizador clica num conselheiro
→ Entra na página dedicada do universo
→ Vê a ICONZAZA transformada
→ Aprende intuitivamente a conexão entre universos
```

### Estrutura de cada página de universo
Segue o padrão da ficha ICONLOVE:
1. Avatar da ICONZAZA transformada
2. Posicionamento (o que NÃO é + o que É)
3. Missão
4. O que ensina
5. Essência (tags)
6. Pilares (5 ícones)
7. Conexão com outros universos

---

*Actualizado em 31 Mai 2026*

---

---

## 18. ARQUITECTURA INTELIGENTE — Cada tecnologia no lugar certo

> "Performance, segurança e escalabilidade para crescer com você."

| Funcionalidade | Tecnologia | Porquê |
|---|---|---|
| **Login / Cadastro** | Supabase Auth | Segurança pronta e fácil de gerir |
| **Cursos / Blog / CMS** | Supabase (PostgreSQL) | Dados estruturados e consultados pelo ADM |
| **Chat em tempo real** | AWS DynamoDB | Alta velocidade, volume massivo, baixo custo |
| **Redes Sociais / Notificações** | AWS RDS + DynamoDB | Dados que crescem rápido e exigem escalabilidade |

### A ponte entre os dois mundos
```
Supabase (Source of Truth)     AWS (Transaccional)
├── Auth / Sessões             ├── Chat tempo real
├── Profiles / Roles           ├── Notificações push
├── Cursos / Aulas             ├── Logs de actividade
├── Blog / CMS                 ├── Gamificação
├── Universos / Agentes        └── Redes sociais
└── Media Library
         ↕
    services/api.ts
    (bridge — a criar)
```

### Regra de decisão — onde vai cada nova tabela?

**→ Supabase** se:
- Conteúdo editável pelo ADM
- Dados consultados por SEO
- Estrutura relacional fixa
- Autenticação / perfis

**→ AWS** se:
- Volume massivo de writes (chat, likes, notif.)
- Dados em tempo real
- Logs e actividade do utilizador
- Escalabilidade horizontal necessária

---

## 14. ARQUITECTURA DE AGENTES

Cada Universo (ICONMIND, ICONLOVE, ICONETNIA, ICONFOOD, ICONART) funciona como um **agente independente**.

O Painel ADM deve permitir:
- Gestão de conteúdo por agente
- Tom de voz específico por agente
- Configuração individual por universo

Centralizando a administração mas mantendo a **autonomia do conteúdo**.

---

## 15. REGRA DE OURO DA BASE DE DADOS

> **"Toda nova estrutura de base de dados deve ser desenhada prevendo a segregação por `agent_id` para suportar a arquitectura multi-universo."**

### O que isso significa na prática
Qualquer nova tabela criada deve incluir:

```sql
agent_id text REFERENCES agents(id)
-- Valores: 'iconmind' | 'iconlove' | 'iconetnia' | 'iconfood' | 'iconart'
```

### Tabelas que precisam de agent_id no futuro
| Tabela | Motivo |
|---|---|
| `home_sections` | Cada agente tem o seu próprio conteúdo |
| `aulas` | Aulas pertencem a um universo/agente |
| `checklist_videos` | Vídeos por universo |
| `agenda` | Eventos por universo |
| `notificacoes` | Notificações contextuais por agente |
| `posts` | Publicações do mural por universo |

---

## 16. ORDEM DE CONSTRUÇÃO — PORQUÊ AGORA

### A metáfora da casa
```
ADM Login Híbrido     = Alicerces
Organização ADM       = Paredes
Agentes IA            = Habitantes
Conselho dos Universos = A vida dentro da casa
```

### Porquê fazer o Login Híbrido ANTES dos agentes

1. Os agentes precisam de **autenticação segura** para funcionar
2. O login mock (actual) não suporta sessões reais de agentes
3. Sem auth real → agentes não conseguem identificar o utilizador
4. Sem identificar o utilizador → não há jornada personalizada

### Fluxo correcto
```
Passo 1: Login híbrido real (Supabase)     ← ESTAMOS AQUI
Passo 2: Organização ADM funcional
Passo 3: Estrutura de dados com agent_id
Passo 4: Agentes IA por universo
Passo 5: Conselho dos Universos (multi-agente)
```

---

## 17. REGRA DE ACTUALIZAÇÃO DO DOCUMENTO

> **"Actualizar o documento ANTES de cada pedido ao Cursor, garantindo que ele saiba que, no futuro, os dados serão geridos por agentes."**

### Como aplicar
Antes de pedir ao Cursor para criar qualquer tabela ou componente, verificar:
- [ ] A tabela tem `agent_id`?
- [ ] O componente sabe que o conteúdo virá de um agente?
- [ ] A rota ADM está preparada para gerir por universo?

---

*Actualizado em 31 Mai 2026*
