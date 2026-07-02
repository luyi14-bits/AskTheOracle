const YAO_LABELS = ["初", "二", "三", "四", "五", "上"];

function castOnce() {
    const coins = [Math.random(), Math.random(), Math.random()];
    const heads = coins.filter(c => c >= 0.5).length;
    const type = (heads === 2 || heads === 0) ? 'yang' : 'yin';
    const changing = (heads === 3 || heads === 0);
    return { type, changing, value: (type === 'yang' ? 1 : 0) };
}

function findGua(yaoLines) {
    const binary = yaoLines.map(y => y.value).join('');
    return GUA_BY_BINARY[binary] || null;
}

function getBianGua(benGua, yaoLines) {
    const changingIndices = [];
    const newBinary = yaoLines.map((y, i) => {
        if (y.changing) { changingIndices.push(i); return 1 - y.value; }
        return y.value;
    }).join('');
    if (changingIndices.length === 0) return { gua: null, indices: [] };
    return { gua: GUA_BY_BINARY[newBinary], indices: changingIndices };
}

function getInterpretationFocus(benGua, bianGua, changingIndices) {
    const count = changingIndices.length;
    const result = { type: '', primary: '', secondary: '' };

    if (count === 0) {
        result.type = 'ben-gua-judgement';
        result.primary = benGua.judgement;
    } else if (count === 1) {
        const idx = changingIndices[0];
        result.type = 'changing-yao';
        result.primary = benGua.lines[idx];
    } else if (count === 2) {
        const maxIdx = Math.max(...changingIndices);
        const minIdx = Math.min(...changingIndices);
        result.type = 'two-changing-yao';
        result.primary = benGua.lines[maxIdx];
        result.secondary = benGua.lines[minIdx];
    } else if (count === 3) {
        result.type = 'three-changing-yao';
        result.primary = benGua.judgement;
        if (bianGua) result.secondary = bianGua.judgement;
    } else if (count === 4) {
        const unchanged = [0, 1, 2, 3, 4, 5].filter(i => !changingIndices.includes(i));
        const unchangedMin = Math.min(...unchanged);
        const unchangedMax = Math.max(...unchanged);
        result.type = 'four-changing-yao';
        if (bianGua) {
            result.primary = bianGua.lines[unchangedMin];
            result.secondary = bianGua.lines[unchangedMax];
        }
    } else if (count === 5) {
        const unchangedIdx = [0, 1, 2, 3, 4, 5].find(i => !changingIndices.includes(i));
        result.type = 'five-changing-yao';
        if (bianGua && unchangedIdx !== undefined) {
            result.primary = bianGua.lines[unchangedIdx];
        }
    } else if (count === 6) {
        result.type = 'six-changing-yao';
        if (benGua.id === 1 && benGua.yong) {
            result.primary = benGua.yong;
        } else if (benGua.id === 2 && benGua.yong) {
            result.primary = benGua.yong;
        } else {
            if (bianGua) result.primary = bianGua.judgement;
            if (!result.primary) result.primary = benGua.judgement || '';
        }
    }

    return result;
}

function getYaoLabel(index, type) {
    if (index < 0 || index > 5) {
        console.warn(`[getYaoLabel] invalid index: ${index}`);
        return '';
    }
    const pos = YAO_LABELS[index];
    if (index === 5) {
        return type === 'yang' ? '上九' : '上六';
    }
    if (index === 0) {
        return type === 'yang' ? '初九' : '初六';
    }
    return type === 'yang' ? '九' + pos : '六' + pos;
}

function appendTextWithLabel(parent, label, text) {
    const strong = document.createElement('strong');
    strong.textContent = label;
    parent.appendChild(strong);
    parent.appendChild(document.createTextNode(text));
}

function renderResult(result) {
    const nameEl = document.getElementById('gua-name');
    const symbolEl = document.getElementById('gua-symbol');
    const interpEl = document.getElementById('gua-interpretation');

    const { benGua, bianGua, changingIndices, focus, yaoLines } = result;

    nameEl.textContent = `${benGua.name} ${benGua.symbol}`;
    symbolEl.textContent = benGua.symbol;

    interpEl.textContent = '';
    const fragment = document.createDocumentFragment();

    const judgement = document.createElement('div');
    judgement.className = 'gua-judgement';
    appendTextWithLabel(judgement, '卦辞：', benGua.judgement);
    fragment.appendChild(judgement);

    const yaoList = document.createElement('div');
    yaoList.className = 'yao-lines-list';
    for (let i = 5; i >= 0; i--) {
        const line = benGua.lines[i];
        const isChanging = yaoLines[i].changing;
        const item = document.createElement('div');
        item.className = isChanging ? 'yao-line-item changing' : 'yao-line-item';
        item.textContent = line;
        yaoList.appendChild(item);
    }
    fragment.appendChild(yaoList);

    if (bianGua) {
        const card = document.createElement('div');
        card.className = 'bian-gua-card';

        const header = document.createElement('div');
        header.className = 'bian-gua-header';
        header.textContent = `→ 变卦：${bianGua.name} ${bianGua.symbol}`;
        card.appendChild(header);

        const bgJudgement = document.createElement('div');
        bgJudgement.className = 'bian-gua-judgement';
        appendTextWithLabel(bgJudgement, '卦辞：', bianGua.judgement);
        card.appendChild(bgJudgement);

        fragment.appendChild(card);
    }

    const focusDiv = document.createElement('div');
    focusDiv.className = 'gua-focus';

    const focusHeader = document.createElement('div');
    focusHeader.className = 'gua-focus-header';
    focusHeader.textContent = '⚡ 解读焦点';
    focusDiv.appendChild(focusHeader);

    const primary = document.createElement('div');
    primary.className = 'gua-focus-primary';
    appendTextWithLabel(primary, '主看：', focus.primary);
    focusDiv.appendChild(primary);

    if (focus.secondary) {
        const secondary = document.createElement('div');
        secondary.className = 'gua-focus-secondary';
        appendTextWithLabel(secondary, '次看：', focus.secondary);
        focusDiv.appendChild(secondary);
    }

    fragment.appendChild(focusDiv);
    interpEl.appendChild(fragment);
}

document.addEventListener("DOMContentLoaded", () => {
    const btnCast = document.getElementById("btn-cast");
    const resultDiv = document.getElementById("result");
    const guaDisplay = document.getElementById("gua-display");
    let isCasting = false;

    btnCast.addEventListener("click", async () => {
        if (isCasting) return;
        isCasting = true;
        btnCast.disabled = true;
        btnCast.textContent = "起卦中…";

        document.querySelectorAll('#gua-display .yao').forEach(el => el.remove());
        const placeholder = guaDisplay.querySelector('.placeholder');
        if (placeholder) placeholder.style.display = 'none';

        resultDiv.classList.add('hidden');

        const yaoLines = [];
        for (let i = 0; i < 6; i++) {
            const yao = castOnce();
            yaoLines.push(yao);
            Animation.drawGua(guaDisplay, yao);
            await new Promise(r => setTimeout(r, 500));
        }

        const benGua = findGua(yaoLines);
        const bianGuaResult = getBianGua(benGua, yaoLines);
        const focus = getInterpretationFocus(benGua, bianGuaResult.gua, bianGuaResult.indices);

        const result = {
            benGua,
            bianGua: bianGuaResult.gua,
            changingIndices: bianGuaResult.indices,
            focus,
            yaoLines
        };

        renderResult(result);
        resultDiv.classList.remove('hidden');

        btnCast.disabled = false;
        btnCast.textContent = "再掷一卦";
        isCasting = false;
    });
});
