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
