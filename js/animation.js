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
    },

    animateLiuren(container, liurenResult) {
        // 清除旧内容
        container.querySelectorAll('.yao, .coin-flip, .meihua-trigram, .liuren-palm').forEach(function (el) { el.remove(); });
        var placeholder = container.querySelector('.placeholder');
        if (placeholder) placeholder.style.display = 'none';
        container.classList.remove('meihua-mode');

        var palm = document.createElement('div');
        palm.className = 'liuren-palm';

        // 六掌诀位置
        var positions = [
            { name: '大安', top: '10%', left: '50%' },
            { name: '留连', top: '28%', left: '72%' },
            { name: '速喜', top: '52%', left: '72%' },
            { name: '赤口', top: '75%', left: '50%' },
            { name: '小吉', top: '52%', left: '28%' },
            { name: '空亡', top: '28%', left: '28%' }
        ];

        positions.forEach(function (pos, i) {
             var dot = document.createElement('div');
             dot.className = 'liuren-dot';
             dot.style.top = pos.top;
             dot.style.left = pos.left;
             dot.style.marginLeft = '-6px';
             dot.style.marginTop = '-6px';

            // 亮起步骤中的位置
            var isInSteps = false;
            liurenResult.steps.forEach(function (s) {
                if (s.idx === i) isInSteps = true;
            });
            if (isInSteps) {
                dot.classList.add('liuren-dot-active');
                dot.style.backgroundColor = liurenResult.result.color;
                dot.style.animationDelay = '0s';
            }
            if (i === liurenResult.position) {
                dot.classList.add('liuren-dot-final');
                dot.style.backgroundColor = liurenResult.result.color;
            }

            var label = document.createElement('div');
            label.className = 'liuren-dot-label';
            label.textContent = pos.name;
            if (i === liurenResult.position) {
                label.classList.add('liuren-dot-label-final');
                label.style.color = liurenResult.result.color;
            }
            dot.appendChild(label);

            palm.appendChild(dot);
        });

        container.appendChild(palm);
    }
};
