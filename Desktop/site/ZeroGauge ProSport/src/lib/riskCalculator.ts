export type Meting = {
    belastingRPE: number;   // 1-10
    pijn: number;           // 0-10
    slaapKwaliteit: number; // 1-5
    energie: number;        // 1-5
    stemming: number;       // 1-5
    hydratatie: number;     // 1-5
    voeding: number;        // 1-5
};

export type RiskResult = {
    score: number;                 // 0-100
    level: 'low' | 'medium' | 'high';
    color: 'green' | 'orange' | 'red';
    colorClass: string; // Tailwind class for easy usage
    bgClass: string;    // Tailwind bg class
};

export function calculateRisk(meting: Meting): RiskResult {
    let score = 0;

    // 1. Belasting: if RPE > 6: score += (RPE - 6) * 3
    if (meting.belastingRPE > 6) score += (meting.belastingRPE - 6) * 3;

    // 2. Pijn: if pijn > 2: score += (pijn - 2) * 2
    if (meting.pijn > 2) score += (meting.pijn - 2) * 2;

    // 3. Slaapkwaliteit: if slaap < 3: score += (3 - slaap) * 4
    if (meting.slaapKwaliteit < 3) score += (3 - meting.slaapKwaliteit) * 4;

    // 4. Energie: if energie < 3: score += (3 - energie) * 3
    if (meting.energie < 3) score += (3 - meting.energie) * 3;

    // 5. Stemming: if stemming < 3: score += (3 - stemming) * 2
    if (meting.stemming < 3) score += (3 - meting.stemming) * 2;

    // 6. Hydratatie: if hydratatie < 3: score += (3 - hydratatie) * 3
    if (meting.hydratatie < 3) score += (3 - meting.hydratatie) * 3;

    // 7. Voeding: if voeding < 3: score += (3 - voeding) * 3
    if (meting.voeding < 3) score += (3 - meting.voeding) * 3;

    // Afkappen op 100
    if (score > 100) score = 100;

    let level: RiskResult['level'];
    let color: RiskResult['color'];
    let colorClass: string;
    let bgClass: string;

    if (score < 30) {
        level = 'low';
        color = 'green';
        colorClass = 'text-emerald-500';
        bgClass = 'bg-emerald-500/10 border-emerald-500/20';
    } else if (score < 60) {
        level = 'medium';
        color = 'orange';
        colorClass = 'text-orange-500';
        bgClass = 'bg-orange-500/10 border-orange-500/20';
    } else {
        level = 'high';
        color = 'red';
        colorClass = 'text-red-500';
        bgClass = 'bg-red-500/10 border-red-500/20';
    }

    return { score, level, color, colorClass, bgClass };
}

export type StatusResult = {
    color: 'green' | 'orange' | 'red';
    label: string;
    bgClass: string;
    textClass: string;
};

export function evaluateCheckInStatus(meting: Meting & { urineColorMorning?: number, urineColorEvening?: number }): StatusResult {
    const { slaapKwaliteit, sleepHours, belastingRPE, urineColorMorning, urineColorEvening } = meting as any;
    // Types might need adjustment if using raw DB values, assuming meting structure passed in

    // Default values if missing
    const sleep = sleepHours || 7;
    const rpe = belastingRPE || 5;
    const urine = Math.max(urineColorMorning || 1, urineColorEvening || 1); // Worst case urine

    // RED Rules: sleep < 5 OR RPE >= 9 OR urine >= 4
    if (sleep < 5 || rpe >= 9 || urine >= 4) {
        return {
            color: 'red',
            label: 'Hoog Risico',
            bgClass: 'bg-red-500/10 border-red-500/20',
            textClass: 'text-red-500'
        };
    }

    // ORANGE Rules: sleep 5-7 OR RPE 7-8 OR urine == 3
    if ((sleep >= 5 && sleep < 7) || (rpe >= 7 && rpe <= 8) || urine === 3) {
        return {
            color: 'orange',
            label: 'Medium Risico',
            bgClass: 'bg-orange-500/10 border-orange-500/20',
            textClass: 'text-orange-500'
        };
    }

    // GREEN Rules (Everything else / better)
    return {
        color: 'green',
        label: 'Laag Risico',
        bgClass: 'bg-emerald-500/10 border-emerald-500/20',
        textClass: 'text-emerald-500'
    };
}
