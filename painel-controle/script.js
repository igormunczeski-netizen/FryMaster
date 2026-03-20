let temp = 400;
let minutes = 15;
let running = false;
let countdown = null;
let tempInterval = null;
let currentDisplayTemp = 0;
let targetCookTemp = 180; // temperatura alvo atual

function switchTab(mode, event) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(mode).classList.add('active');
    event.currentTarget.classList.add('active');
}

function adjust(type, amount) {
    if (type === 'temp') {
        temp = Math.max(80, Math.min(450, temp + amount));
        const el = document.getElementById('temp-val');
        el.innerText = temp + '°';
        el.style.color = temp >= 400 ? '#e09a3c' : '#f0f0f0';
    } else {
        minutes = Math.max(1, Math.min(99, minutes + amount));
        document.getElementById('timer-val').innerText =
            (minutes < 10 ? '0' : '') + minutes + ':00';
    }
}

function toggleStart() {
    const btn = document.querySelector('.btn-start');
    const label = document.getElementById('start-label');

    if (!running) {
        running = true;
        btn.classList.add('running');
        label.innerText = '■ PARAR';
        currentDisplayTemp = 0;
        startCountdown();
        startTempRise();
    } else {
        running = false;
        btn.classList.remove('running');
        label.innerText = '▶ INICIAR';
        clearInterval(countdown);
        clearInterval(tempInterval);
    }
}

function startCountdown() {
    let totalSeconds = minutes * 60;

    countdown = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(countdown);
            clearInterval(tempInterval);
            running = false;
            document.querySelector('.btn-start').classList.remove('running');
            document.getElementById('start-label').innerText = '▶ INICIAR';
            document.getElementById('timer-val').innerText = '00:00';
            return;
        }
        totalSeconds--;
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        document.getElementById('timer-val').innerText =
            (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }, 1000);
}

function startTempRise() {
    const el = document.getElementById('temp-val');
    currentDisplayTemp = 0;

    tempInterval = setInterval(() => {
        if (currentDisplayTemp < targetCookTemp) {
            currentDisplayTemp++;
            el.innerText = currentDisplayTemp + '°';
            const ratio = currentDisplayTemp / targetCookTemp;
            const r = Math.round(100 + 155 * ratio);
            const g = Math.round(150 - 100 * ratio);
            const b = Math.round(200 - 200 * ratio);
            el.style.color = `rgb(${r}, ${g}, ${b})`;
        } else {
            el.style.color = '#e09a3c';
            clearInterval(tempInterval);
        }
    }, 80);
}

function selectMode(el, tempValue, minValue) {
    document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('selected'));
    el.classList.add('selected');

    if (tempValue > 0) {
        temp = tempValue;
        minutes = minValue;
        targetCookTemp = tempValue; // define a temperatura alvo do alimento
        switchTabManual();
    }
}

function switchTabManual() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById('manual').classList.add('active');
    document.querySelectorAll('.tab')[0].classList.add('active');
    document.getElementById('temp-val').innerText = temp + '°';
    document.getElementById('timer-val').innerText =
        (minutes < 10 ? '0' : '') + minutes + ':00';
}