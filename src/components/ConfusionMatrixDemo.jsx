import { useState, useMemo } from 'react';

// Distribuição simulada de scores do modelo (0-100) para fraude vs. legítima.
// Fraude concentrada em scores mais altos, legítima em scores mais baixos —
// mas com sobreposição, como acontece em um cenário real.
const TOTAL_FRAUD = 40;
const TOTAL_LEGIT = 460;

function sigmoid(x, midpoint, steepness) {
  // satura totalmente nos extremos (0 e 100) para refletir que, no limite,
  // threshold=0% marca tudo como fraude e threshold=100% não marca nada
  if (x <= 0) return 0;
  if (x >= 100) return 1;
  return 1 / (1 + Math.exp(-((x - midpoint) / steepness)));
}

export default function ConfusionMatrixDemo() {
  const [threshold, setThreshold] = useState(50);

  const { tp, fn, fp, tn, recall, precision, recallText, precisionText } = useMemo(() => {
    // fraude concentrada em scores ALTOS (midpoint 70), legítima em scores BAIXOS (midpoint 30) —
    // é assim que um modelo que "aprendeu" a distinguir os dois deveria se comportar
    const fraudBelowThreshold = sigmoid(threshold, 70, 12); // fração de fraudes que ficam abaixo do threshold (escapam)
    const legitBelowThreshold = sigmoid(threshold, 30, 12); // fração de legítimas que ficam abaixo do threshold (corretamente liberadas)

    const _tp = Math.round(TOTAL_FRAUD * (1 - fraudBelowThreshold));
    const _fn = TOTAL_FRAUD - _tp;
    const _fp = Math.round(TOTAL_LEGIT * (1 - legitBelowThreshold));
    const _tn = TOTAL_LEGIT - _fp;

    const _recall = _tp / TOTAL_FRAUD;
    const totalFlagged = _tp + _fp;
    const hasPositivePrediction = totalFlagged > 0;
    const _precision = hasPositivePrediction ? _tp / totalFlagged : null; // null = indefinida, não zero

    const recallText = `${Math.round(_recall * 100)}% de recall mostra que, das ${TOTAL_FRAUD} transações fraudulentas, ${_tp} foram identificadas e ${_fn} (${Math.round((_fn / TOTAL_FRAUD) * 100)}%) passaram despercebidas.`;

    const precisionText = hasPositivePrediction
      ? `${Math.round(_precision * 100)}% de precision quer dizer que, das ${totalFlagged} transações marcadas como fraude, ${_tp} (${Math.round(_precision * 100)}%) eram fraude de fato e ${_fp} (${Math.round((_fp / totalFlagged) * 100)}%) eram falsos positivos.`
      : `Nenhuma transação foi marcada como fraude neste threshold — não há como calcular a taxa de acerto dos alertas, porque não existe alerta.`;

    return { tp: _tp, fn: _fn, fp: _fp, tn: _tn, recall: _recall, precision: _precision, recallText, precisionText };
  }, [threshold]);

  const cellStyle = (kind) => ({
    flex: 1,
    borderRadius: 12,
    padding: '20px 16px',
    textAlign: 'center',
    background: kind === 'good' ? '#E1F5EE' : '#FAECE7',
    border: `1px solid ${kind === 'good' ? '#5DCAA5' : '#F0997B'}`,
    color: kind === 'good' ? '#085041' : '#712B13',
  });

  return (
    <div style={{ padding: '1rem 0', fontFamily: 'inherit' }}>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
        Base simulada: {TOTAL_FRAUD} transações fraudulentas e {TOTAL_LEGIT} legítimas (taxa de fraude real ≈ {Math.round((TOTAL_FRAUD / (TOTAL_FRAUD + TOTAL_LEGIT)) * 100)}%).
        Ajuste o threshold de decisão do modelo (score acima do qual uma transação é marcada como fraude)
        e veja como a matriz de confusão e as métricas reagem.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={{ fontSize: 13, color: '#666', minWidth: 70 }}>Threshold</span>
        <input
          type="range"
          min={0}
          max={100}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <span style={{ fontSize: 13, fontWeight: 500, minWidth: 40, textAlign: 'right' }}>
          {threshold}%
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div style={cellStyle('good')}>
          <div style={{ fontSize: 24, fontWeight: 600 }}>{tp}</div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Verdadeiro positivo</div>
          <div style={{ fontSize: 11 }}>fraude, marcada como fraude</div>
        </div>
        <div style={cellStyle('bad')}>
          <div style={{ fontSize: 24, fontWeight: 600 }}>{fn}</div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Falso negativo</div>
          <div style={{ fontSize: 11 }}>fraude, passou despercebida</div>
        </div>
        <div style={cellStyle('bad')}>
          <div style={{ fontSize: 24, fontWeight: 600 }}>{fp}</div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Falso positivo</div>
          <div style={{ fontSize: 11 }}>legítima, marcada como fraude</div>
        </div>
        <div style={cellStyle('good')}>
          <div style={{ fontSize: 24, fontWeight: 600 }}>{tn}</div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Verdadeiro negativo</div>
          <div style={{ fontSize: 11 }}>legítima, liberada</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, background: '#f5f5f3', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, color: '#666' }}>Recall</div>
          <div style={{ fontSize: 26, fontWeight: 600 }}>{Math.round(recall * 100)}%</div>
          <div style={{ fontSize: 12, color: '#888' }}>fraudes reais capturadas</div>
        </div>
        <div style={{ flex: 1, background: '#f5f5f3', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, color: '#666' }}>Precision</div>
          <div style={{ fontSize: 26, fontWeight: 600 }}>
            {precision === null ? '—' : `${Math.round(precision * 100)}%`}
          </div>
          <div style={{ fontSize: 12, color: '#888' }}>
            {precision === null ? 'nenhum alerta emitido' : 'alertas que eram fraude de fato'}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, margin: 0 }}>{recallText}</p>
        <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, margin: 0 }}>{precisionText}</p>
      </div>
    </div>
  );
}
