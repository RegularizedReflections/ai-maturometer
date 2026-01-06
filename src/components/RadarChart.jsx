import React from 'react';
import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

/**
 * Mapping des domaines vers leurs emojis et labels complets
 */
const DOMAIN_LABELS = {
  legal: { emoji: '⚖️', label: 'Réglementation' },
  ethics: { emoji: '🛡️', label: 'Éthique & Trust' },
  risks: { emoji: '⚠️', label: 'Risques Opérationnels' },
  finops: { emoji: '💰', label: 'FinOps & Coûts' },
  governance: { emoji: '👥', label: 'Gouvernance' }
};

/**
 * Graphique Radar amélioré pour visualiser les scores par domaine
 * @param {Object} domainScores - Scores par domaine
 * @param {Array} domains - Définitions des domaines
 */
export default function RadarChart({ domainScores, domains }) {
  // Transformation des données pour Recharts avec emojis
  const data = domains.map(domain => {
    const score = domainScores[domain.id] || 0;
    // Normalisation sur 100 : maxScore par domaine = 30 (3 questions × 10 pts max)
    const maxScorePerDomain = 30;
    const normalizedScore = Math.max(0, Math.min(100, (score / maxScorePerDomain) * 100));

    const domainLabel = DOMAIN_LABELS[domain.id] || { emoji: '📊', label: domain.name };

    return {
      domain: domain.id,
      domainName: domain.name,
      domainLabel: `${domainLabel.emoji} ${domainLabel.label}`,
      score: Math.round(normalizedScore),
      rawScore: score,
      emoji: domainLabel.emoji
    };
  });

  // Calcul des statistiques par domaine (à partir du contexte parent)
  // Note: Dans une implémentation complète, ces données viendraient des props
  const getDomainStats = (domainId) => {
    const percentage = data.find(d => d.domain === domainId)?.score || 0;

    return {
      percentage,
      status: percentage >= 70 ? 'Maîtrisé' : percentage >= 40 ? 'À renforcer' : 'Critique',
      statusColor: percentage >= 70 ? 'text-success' : percentage >= 40 ? 'text-warning' : 'text-danger',
      statusBg: percentage >= 70 ? 'bg-green-50' : percentage >= 40 ? 'bg-yellow-50' : 'bg-red-50',
      statusBorder: percentage >= 70 ? 'border-success' : percentage >= 40 ? 'border-warning' : 'border-danger',
      icon: percentage >= 70 ? CheckCircle : percentage >= 40 ? AlertTriangle : XCircle
    };
  };

  // Custom Tooltip enrichi
  const CustomTooltip = ({ payload }) => {
    if (!payload || !payload[0]) return null;
    const data = payload[0].payload;
    const stats = getDomainStats(data.domain);

    return (
      <div className="bg-white border-2 border-primary rounded-lg shadow-xl p-4 min-w-[220px]">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
          <span className="text-2xl">{data.emoji}</span>
          <p className="font-bold text-neutral-dark">{data.domainName}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-light">Score normalisé :</span>
            <span className="font-semibold text-lg text-primary">{data.score}%</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-light">Score brut :</span>
            <span className="font-medium text-neutral-dark">{data.rawScore} pts</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
            <span className="text-sm text-neutral-light">Statut :</span>
            <span className={`font-semibold text-sm ${stats.statusColor}`}>
              {stats.status}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      {/* Titre de section avec emoji */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-neutral-dark mb-2">
          📊 Performance par domaine
        </h3>
        <p className="text-sm text-neutral-light">
          Visualisation radar de votre maîtrise sur les 5 piliers de la gouvernance IA
        </p>
      </div>

      {/* Graphique Radar responsive */}
      <div className="w-full flex justify-center">
        <ResponsiveContainer
          width="100%"
          height={280}
          className="sm:hidden"
        >
          <RechartsRadar data={data}>
            <PolarGrid stroke="#cbd5e1" strokeWidth={1} />
            <PolarAngleAxis
              dataKey="domainLabel"
              tick={{ fill: '#334155', fontSize: 10, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#94a3b8', fontSize: 9 }}
              tickCount={5}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.6}
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
          </RechartsRadar>
        </ResponsiveContainer>

        <ResponsiveContainer
          width="100%"
          height={320}
          className="hidden sm:block md:hidden"
        >
          <RechartsRadar data={data}>
            <PolarGrid stroke="#cbd5e1" strokeWidth={1} />
            <PolarAngleAxis
              dataKey="domainLabel"
              tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickCount={5}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.6}
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
          </RechartsRadar>
        </ResponsiveContainer>

        <ResponsiveContainer
          width="100%"
          height={400}
          className="hidden md:block"
        >
          <RechartsRadar data={data}>
            <PolarGrid stroke="#cbd5e1" strokeWidth={1.5} />
            <PolarAngleAxis
              dataKey="domainLabel"
              tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickCount={6}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.6}
              strokeWidth={2.5}
            />
            <Tooltip content={<CustomTooltip />} />
          </RechartsRadar>
        </ResponsiveContainer>
      </div>

      {/* Légende enrichie avec statuts de performance */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-neutral-dark mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          Détail par domaine
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {domains.map(domain => {
            const domainData = data.find(d => d.domain === domain.id);
            const stats = getDomainStats(domain.id);
            const StatusIcon = stats.icon;

            return (
              <div
                key={domain.id}
                className={`border-2 ${stats.statusBorder} ${stats.statusBg} rounded-lg p-3 hover:shadow-md transition-all`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xl flex-shrink-0">{domainData?.emoji}</span>
                    <span className="font-semibold text-sm text-neutral-dark truncate">
                      {domain.name}
                    </span>
                  </div>
                  <StatusIcon
                    className={`${stats.statusColor} flex-shrink-0`}
                    size={18}
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-neutral-light">Score :</span>
                    <span className="font-bold text-primary">
                      {domainData?.score}%
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-neutral-light">Points :</span>
                    <span className="font-medium text-neutral-dark text-sm">
                      {domainData?.rawScore}
                    </span>
                  </div>

                  <div className="pt-1.5 border-t border-slate-200/50">
                    <span className={`text-xs font-semibold ${stats.statusColor}`}>
                      {stats.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Légende des couleurs */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-light">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="text-success" size={14} />
            <span><span className="font-semibold text-success">Maîtrisé</span> : ≥70%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="text-warning" size={14} />
            <span><span className="font-semibold text-warning">À renforcer</span> : 40-69%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <XCircle className="text-danger" size={14} />
            <span><span className="font-semibold text-danger">Critique</span> : &lt;40%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
