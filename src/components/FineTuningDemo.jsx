import { useState } from 'react';
import resultados from '../data/resultados_avaliacao.json';

const CAMPOS_ORDEM = [
  'marca', 'modelo', 'ano', 'km', 'cambio', 'estado_geral',
  'avarias', 'preco_anunciado', 'faixa_preco_justo', 'sinais_atencao',
];

const FIELD_LABELS = {
  marca: 'Marca',
  modelo: 'Modelo',
  ano: 'Ano',
  km: 'Km',
  cambio: 'Câmbio',
  estado_geral: 'Estado geral',
  avarias: 'Avarias',
  preco_anunciado: 'Preço anunciado',
  faixa_preco_justo: 'Faixa de preço',
  sinais_atencao: 'Sinais de atenção',
};

const COLORS = {
  goodBg: '#E1F5EE', goodBorder: '#5DCAA5', goodText: '#085041',
  badBg: '#FAECE7', badBorder: '#F0997B', badText: '#712B13',
  panelBg: '#f5f5f3', muted: '#666', mutedLight: '#888',
};

function formatarValor(valor) {
  if (valor === undefined || valor === null) return '—';
  if (Array.isArray(valor)) {
    if (valor.length === 0) return '(nenhum)';
    return valor.map((v) => (typeof v === 'object' ? JSON.stringify(v) : String(v))).join(', ');
  }
  return String(valor);
}

function CampoLinha({ campo, valor, acerto }) {
  const temAcerto = acerto !== undefined;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 8,
        padding: '6px 8px',
        borderRadius: 8,
        background: temAcerto ? (acerto ? COLORS.goodBg : COLORS.badBg) : 'transparent',
        border: temAcerto ? `1px solid ${temAcerto ? (acerto ? COLORS.goodBorder : COLORS.badBorder) : 'transparent'}` : '1px solid transparent',
      }}
    >
      <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 500, flexShrink: 0 }}>
        {FIELD_LABELS[campo]}
      </span>
      <span
        style={{
          fontSize: 12,
          textAlign: 'right',
          color: temAcerto ? (acerto ? COLORS.goodText : COLORS.badText) : '#333',
          fontWeight: temAcerto ? 600 : 400,
          wordBreak: 'break-word',
        }}
      >
        {temAcerto ? (acerto ? '✓ ' : '✗ ') : ''}
        {formatarValor(valor)}
      </span>
    </div>
  );
}

function ColunaModelo({ titulo, dados, acertos, accent }) {
  if (dados && dados.erro_parsing) {
    return (
      <div className="ftd-coluna" style={{ borderTop: `3px solid ${accent}` }}>
        <div className="ftd-coluna-titulo">{titulo}</div>
        <div style={{ fontSize: 12, color: COLORS.badText, background: COLORS.badBg, border: `1px solid ${COLORS.badBorder}`, borderRadius: 8, padding: 10 }}>
          Saída não é um JSON válido:
          <div style={{ marginTop: 6, fontFamily: 'monospace', fontSize: 11, whiteSpace: 'pre-wrap' }}>
            {dados.texto_bruto}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ftd-coluna" style={{ borderTop: `3px solid ${accent}` }}>
      <div className="ftd-coluna-titulo">{titulo}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {CAMPOS_ORDEM.map((campo) => (
          <CampoLinha
            key={campo}
            campo={campo}
            valor={dados ? dados[campo] : undefined}
            acerto={acertos ? acertos[campo] : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function BarraComparativa({ campo, valores }) {
  const pctBase = Math.round(valores.base * 100);
  const pctLora = Math.round(valores.lora * 100);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>
        <span style={{ fontWeight: 500 }}>{FIELD_LABELS[campo] || 'Acerto exato (todos os campos)'}</span>
        <span>
          <span style={{ color: COLORS.badText, fontWeight: 600 }}>{pctBase}%</span>
          {' vs. '}
          <span style={{ color: COLORS.goodText, fontWeight: 600 }}>{pctLora}%</span>
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ background: '#e8e8e5', borderRadius: 6, height: 10, overflow: 'hidden' }}>
          <div style={{ width: `${pctBase}%`, height: '100%', background: COLORS.badBorder, borderRadius: 6, transition: 'width 0.2s' }} />
        </div>
        <div style={{ background: '#e8e8e5', borderRadius: 6, height: 10, overflow: 'hidden' }}>
          <div style={{ width: `${pctLora}%`, height: '100%', background: COLORS.goodBorder, borderRadius: 6, transition: 'width 0.2s' }} />
        </div>
      </div>
    </div>
  );
}

export default function FineTuningDemo() {
  const { resumo_por_campo, exemplos } = resultados;
  const [indice, setIndice] = useState(0);
  const exemplo = exemplos[indice];
  const total = exemplos.length;

  return (
    <div style={{ padding: '1rem 0', fontFamily: 'inherit' }}>
      <style>{`
        .ftd-coluna { flex: 1; min-width: 0; background: ${COLORS.panelBg}; border-radius: 12px; padding: 14px; }
        .ftd-coluna-titulo { font-size: 13px; font-weight: 600; margin-bottom: 10px; color: #222; }
        .ftd-colunas { display: flex; gap: 14px; }
        .ftd-nav { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
        .ftd-nav button {
          background: #222; color: #fff; border: none; border-radius: 8px;
          padding: 6px 14px; font-size: 13px; cursor: pointer;
        }
        .ftd-nav button:disabled { background: #ccc; cursor: not-allowed; }
        .ftd-nav select { font-size: 13px; padding: 5px 8px; border-radius: 8px; border: 1px solid #ccc; }
        @media (max-width: 720px) {
          .ftd-colunas { flex-direction: column; }
        }
      `}</style>

      <p style={{ fontSize: 14, color: COLORS.muted, marginBottom: 16, lineHeight: 1.6 }}>
        Comparação real entre o modelo base (Qwen2.5-0.5B-Instruct, sem fine-tuning) e o mesmo
        modelo com um adapter LoRA treinado para extrair dados estruturados de anúncios de carros
        usados. Os {total} exemplos abaixo são held-out — não fizeram parte do treino — e as
        respostas foram pré-computadas (sem inferência ao vivo no navegador).
      </p>

      <div className="ftd-nav">
        <button onClick={() => setIndice((i) => Math.max(0, i - 1))} disabled={indice === 0}>
          ← Anterior
        </button>
        <select value={indice} onChange={(e) => setIndice(Number(e.target.value))}>
          {exemplos.map((ex, i) => (
            <option key={ex.id} value={i}>
              Exemplo {ex.id} de {total}
            </option>
          ))}
        </select>
        <button onClick={() => setIndice((i) => Math.min(total - 1, i + 1))} disabled={indice === total - 1}>
          Próximo →
        </button>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e0e0dc', borderRadius: 12, padding: 14, marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: COLORS.mutedLight, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Anúncio (input)
        </div>
        <div style={{ fontSize: 14, color: '#222', lineHeight: 1.5 }}>{exemplo.input}</div>
      </div>

      <div className="ftd-colunas" style={{ marginBottom: 24 }}>
        <ColunaModelo
          titulo="Modelo base"
          dados={exemplo.saida_base}
          acertos={exemplo.acertos_base}
          accent={COLORS.badBorder}
        />
        <ColunaModelo
          titulo="Com LoRA"
          dados={exemplo.saida_lora}
          acertos={exemplo.acertos_lora}
          accent={COLORS.goodBorder}
        />
        <ColunaModelo
          titulo="Esperado (ground truth)"
          dados={exemplo.esperado}
          accent="#999"
        />
      </div>

      <div style={{ background: COLORS.panelBg, borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#222' }}>
          Resumo agregado — 15 exemplos held-out
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 14 }}>
          % de acerto por campo — <span style={{ color: COLORS.badText, fontWeight: 600 }}>base</span> vs.{' '}
          <span style={{ color: COLORS.goodText, fontWeight: 600 }}>com LoRA</span>
        </div>
        {CAMPOS_ORDEM.map((campo) => (
          <BarraComparativa key={campo} campo={campo} valores={resumo_por_campo[campo]} />
        ))}
        <div style={{ borderTop: '1px solid #ddd', paddingTop: 12, marginTop: 4 }}>
          <BarraComparativa campo="exact_match" valores={resumo_por_campo.exact_match} />
        </div>
      </div>
    </div>
  );
}
