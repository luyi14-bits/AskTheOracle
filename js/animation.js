/**
 * AskTheOracle — 动画控制
 *
 * Copyright (C) 2026 天问 (AskTheOracle)
 * Licensed under GNU AGPL v3.0
 */

const Animation = {
    drawGua(container, yao) {
        const el = document.createElement('div');
        el.className = 'yao';

        if (yao.type === 'yang') {
            el.classList.add('yao-yang');
            el.textContent = '━━━';
        } else {
            el.classList.add('yao-yin');
            el.textContent = '╌ ╌';
        }

        if (yao.changing) {
            el.classList.add('yao-changing');
            const mark = document.createElement('span');
            mark.className = 'yao-changing-mark';
            mark.textContent = yao.type === 'yang' ? '●' : '×';
            el.appendChild(mark);
        }

        const existingYaos = container.querySelectorAll('.yao, .coin-flip');
        if (existingYaos.length === 0) {
            container.appendChild(el);
        } else {
            container.insertBefore(el, existingYaos[0]);
        }

        requestAnimationFrame(() => {
            el.classList.add('yao-visible');
        });
    },

    animateCoinFlip(container, yao) {
        const el = document.createElement('div');
        el.className = 'yao coin-flip';
        if (yao.changing) el.classList.add('coin-changing');

        const icon = document.createElement('span');
        icon.className = 'coin-icon';
        icon.textContent = yao.type === 'yang' ? '🟡' : '⚪';
        el.appendChild(icon);

        const text = document.createElement('span');
        text.className = 'coin-text';
        text.textContent = yao.type === 'yang' ? '━━━' : '╌ ╌';
        el.appendChild(text);

        if (yao.changing) {
            el.classList.add('yao-changing');
            const mark = document.createElement('span');
            mark.className = 'yao-changing-mark';
            mark.textContent = yao.type === 'yang' ? '●' : '×';
            el.appendChild(mark);
        }

        const existingYaos = container.querySelectorAll('.yao, .coin-flip');
        if (existingYaos.length === 0) {
            container.appendChild(el);
        } else {
            container.insertBefore(el, existingYaos[0]);
        }
    },

    animateJiaobei(container, result) {
        const el = document.createElement('div');
        el.className = 'jiaobei-result';

        const cup1 = document.createElement('div');
        cup1.className = 'jiaobei-cup jiaobei-cup-1';
        const cup2 = document.createElement('div');
        cup2.className = 'jiaobei-cup jiaobei-cup-2';

        if (result.type === 'shengbei') {
            el.classList.add('jiaobei-shengbei');
            cup1.textContent = '◠';
            cup2.textContent = '◠';
        } else if (result.type === 'xiaobei') {
            el.classList.add('jiaobei-xiaobei');
            cup1.textContent = '◡';
            cup2.textContent = '◡';
        } else {
            el.classList.add('jiaobei-yinbei');
            cup1.textContent = '◠';
            cup2.textContent = '◡';
        }

        el.appendChild(cup1);
        el.appendChild(cup2);

        const label = document.createElement('div');
        label.className = 'jiaobei-label';
        label.textContent = result.label;
        el.appendChild(label);

        container.appendChild(el);

        requestAnimationFrame(() => {
            el.classList.add('jiaobei-visible');
        });
    }
};
